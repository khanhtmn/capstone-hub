from flask import current_app, request, jsonify, make_response
from app import create_app, db
from models import Login, User, Project


# Create an application instance
app = create_app()


# Define a route to fetch data

@app.route("/", methods=["GET"], strict_slashes=False)
def hello():
    return "Hello"


@app.route("/projects", methods=["GET"], strict_slashes=False)
def projects():
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
