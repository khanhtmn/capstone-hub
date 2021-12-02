'''
Module with all APIs and to run the app
'''


# Import all the necessary modules and packages
# from flask import abort
import jwt
import uuid
from flask import current_app, json, request, jsonify, make_response, abort
from app import create_app, db
from models import Login, User, Project
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
# import werkzeug

# Create an application instance
app = create_app()


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            data = {'message': 'Valid token is missing'}
            response = make_response(jsonify(data=data, status=400))
            return response

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            # return jsonify({'token': jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])})
            current_user = Login.query.filter_by(public_id=data['public_id']).first()
            return f(current_user, *args, **kwargs)
        except:
            data = {'message': 'Invalid token'}
            response = make_response(jsonify(data=data, status=400))
            return response
    return decorator


# API to register new user
@app.route("/register", methods=["POST"], strict_slashes=False)
def register_user():
    email = request.json.get("email") # Test if this is the right way to get info
    password = request.json.get("password")
    
    if not email or not password:
        abort(400, description="Empty email or password")
    
    if Login.query.filter_by(email = email).first() != None:
        abort(400, description="Existing user")
    
    if not '@minerva.kgi.edu' in email and not 'minerva.edu' in email:
        data = {'message': 'Need to register with Minerva email address'}
        response = make_response(jsonify(data=data, status=400))
        return response

    hashed_password = generate_password_hash(password, method='sha256')

    new_user = Login(public_id=str(uuid.uuid4()), email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    data = {'message': 'Registered successfully'}
    response = make_response(jsonify(data=data, status=201))
    return response

# API to authenticate
@app.route("/login", methods=["GET", "POST"], strict_slashes=False)
def login_user():

    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        data = {'message': 'Could not verify yes', 'WWW.Authentication': 'Basic realm: "login required"'}
        response = make_response(jsonify(data=data, status=401))
        return response

    try:
        user = Login.query.filter_by(email=auth.username).first()

        if check_password_hash(user.password, auth.password):
            token = jwt.encode({'public_id': user.public_id}, app.config['SECRET_KEY'], algorithm="HS256")
            print(type(token), "TYPE")
            return jsonify({'token': token})
            # https://stackoverflow.com/questions/48570320/how-to-send-and-receive-jwt-token
            # return jsonify({'token': jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])})
        else:
            data = {'message': 'Could not verify 2', 'WWW.Authentication': 'Basic realm: "login required"'}
            response = make_response(jsonify(data=data, status=401))
            return response
    except:    
        data = {'message': 'Could not verify 3', 'WWW.Authentication': 'Basic realm: "login required"'}
        response = make_response(jsonify(data=data, status=401))
        return response


# Define a route to fetch data

# Placeholder route for main page
@app.route("/", methods=["GET"], strict_slashes=False)
@token_required
def hello(current_user):
    return "Hello"


# API to view all projects with student information
@app.route("/projects", methods=["GET"], strict_slashes=False)
@token_required
def projects(current_user):
    if request.method == 'GET':
        try:
            data = []
            all_projects = Project.query\
                .join(User, Project.user_id==User.id)\
                .add_columns(User.id, User.firstname, User.lastname,User.primary_major,\
                    User.secondary_major, User.minor, User.primary_concentration,\
                        Project.title, Project.abstract, Project.feature)\
                .filter(Project.user_id==User.id)\
                .all()
            for project in all_projects:
                data.append(
                    {
                        "id": project.id,
                        "firstname": project.firstname,
                        "lastname": project.lastname,
                        "primary_major": project.primary_major,
                        "secondary_major": project.secondary_major,
                        "minor": project.minor,
                        "title": project.title,
                        "abstract": project.abstract,
                        "feature": project.feature,
                    }
                )
            response = make_response(jsonify(data=data, status=200))

            return response

        except Exception as e:
            return(str(e))

if __name__ == "__main__":
    app.run(debug=True)
