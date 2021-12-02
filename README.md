# Requirements, Usage and Installation
## Backend - Flask
### Installation
                    
### 1 .Clone the git repo and create an environment 
          
Depending on your operating system, make a virtual environment to avoid messing with your machine's primary dependencies

Note: We are cloning into the **`api` branch** because this is the most up-to-date branch
          
**Windows**
          
```bash
git clone --branch auth https://github.com/khanhtmn/capstone-hub.git
cd capstone-hub/backend
py -3 -m venv venv
```
          
**macOS/Linux**
          
```bash
git clone --branch auth https://github.com/khanhtmn/capstone-hub.git
cd capstone-hub/backend
python3 -m venv venv
```

### 2 .Activate the environment
          
**Windows** 

```venv\Scripts\activate```
          
**macOS/Linux**

```. venv/bin/activate```
or
```source venv/bin/activate```

### 3 .Install the requirements

Applies for windows/macOS/Linux

```pip install -r requirements.txt```

### 4 .Migrate/Create a database - Optional during initial set up

Applies for windows/macOS/Linux

```python manage.py```

### 5 .Insert the fake data - Optional for development purpose

Applies for windows/macOS/Linux

```python insert.py```

### 6. Run the application 

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

## Frontend - React
### Installation

This section involves creating of a new react app,then moving the `node_modules` directory into the `frontend` directory

> You can manoeuvre around this in any way you find suitable provided you have `node_modules` directory inside the `frontend` dir.

```
cd capstone-hub/frontend
npx create-react-app capstone-database
cd capstone-database
```
Copy the `node_modules` dir into the `frontend` dir

`npm start`

Disclaimer: This README was written mainly from this [repo](https://github.com/Dev-Elie/Connecting-React-Frontend-to-a-Flask-Backend), from which has a tutorial about connecting React to Flask that I use for this project.
