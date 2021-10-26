from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

CORS(app) #comment this on deployment
app.config.from_object('config.DevelopmentConfig')

api = Api(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import Book

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/flask/hello')

if __name__ == "__main__":
    app.run()
