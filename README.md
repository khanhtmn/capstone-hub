# Project overview

## Project demo

[Please view it here](https://www.loom.com/share/11b70a15b67a4d5a9e2184f9f84a9aa8)

## Database schema

![Database schema](https://i.ibb.co/gtqY4Wz/Capstone-Hub-Database-Schema.png)

## Project design

A preliminary design of the user interface can be found [here](https://figma.com/file/i8Vd8CZGjY9Iv3fJXmIvrK/Capstone-Hub-Project)

Credit of the design goes to Chau Le (M22)

## Notes

Most up-to-date notes about the project can be found on [Trello](https://trello.com/b/s9hSzbxj/capstone-hub) or [Notion](https://www.notion.so/khanhtmn/Capstone-Hub-notes-72410d9f142c4aaab240a3f33393e869)

## Requirements, Usage and Installation

### Backend - Flask
#### Installation
                    
#### 1 .Clone the git repo and create an environment 
          
Depending on your operating system, make a virtual environment to avoid messing with your machine's primary dependencies
          
**Windows**
          
```bash
git clone https://github.com/khanhtmn/capstone-hub.git
cd capstone-hub/backend
py -3 -m venv venv
```
          
**macOS/Linux**
          
```bash
git clone --branch auth https://github.com/khanhtmn/capstone-hub.git
cd capstone-hub/backend
python3 -m venv venv
```

#### 2 .Activate the environment
          
**Windows** 

```venv\Scripts\activate```
          
**macOS/Linux**

```. venv/bin/activate```
or
```source venv/bin/activate```

#### 3 .Install the requirements

Applies for windows/macOS/Linux

```pip install -r requirements.txt```

#### 4 .Add config and environment file

Create the following files in the `backend` directory: `.env`, `.flaskenv`, `config.py`

`.env`
```
SQLALCHEMY_DATABASE_URI=sqlite:///database.db
SQLALCHEMY_TRACK_MODIFICATIONS=False
SECRET_KEY=Th1s1ss3cr3t
```

`.flaskenv`
```
FLASK_APP=routes.py
FLASK_DEBUG=1
FLASK_ENV=development
```

`config.py`
```
"""Flask configuration."""

SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = "Th1s1ss3cr3t"
```

#### 5 .Migrate/Create a database - Optional during initial set up

Applies for windows/macOS/Linux

```python manage.py```

#### 6 .Insert the fake data - Optional for development purpose

Applies for windows/macOS/Linux

```python insert.py```

#### 7. Run the application 

**For linux and macOS**
Start the application by running:

```flask run```

**On windows**
```
set FLASK_APP=main
flask run
```
OR 
`python routes.py`

#### 8. Test the application

Auto tests are not set up yet, but you can test the APIs with Postman and the JSON files in `backend/test_json.json`

### Frontend - React

```
cd capstone-hub/frontend
npm install
npm start
```

Disclaimer: This README was written mainly from this [repo](https://github.com/Dev-Elie/Connecting-React-Frontend-to-a-Flask-Backend), from which has a tutorial about connecting React to Flask that I use for this project.
