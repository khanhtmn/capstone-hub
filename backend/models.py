'''
Define models for database schema
'''


from datetime import datetime
from sqlalchemy.orm import relationship
from app import db


class Login(db.Model):
    """
    Class defining model for user to log in
    """

    __tablename__ = 'logins'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.Integer) 
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128)) # hashed_password

    def __repr__(self):
        return '<Login user {}>'.format(self.email)


class User(db.Model):
    """
    Class defining model for user
    """

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    login_id = db.Column(db.Integer, db.ForeignKey("logins.id"))
    name = db.Column(db.String(128))
    # role = db.Column(db.Enum(RoleEnum))
    class_year = db.Column(db.Integer)
    primary_major = db.Column(db.String(128))
    secondary_major = db.Column(db.String(128))
    primary_concentration = db.Column(db.String(256))
    secondary_concentration = db.Column(db.String(256))
    special_concentration = db.Column(db.String())
    minor = db.Column(db.String(128))
    minor_concentration = db.Column(db.String(256))
    
    logins = relationship(Login)

    # Index major and concentration or not?

    def __repr__(self):
        return '<User info {}{}>'.format(self.firstname, self.lastname)


class Project(db.Model):
    """
    Class defining model for Capstone project
    """

    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String())
    abstract = db.Column(db.String())
    keywords = db.Column(db.String())
    feature = db.Column(db.String())
    hsr_review = db.Column(db.String())
    skills = db.Column(db.String())
    los = db.Column(db.String())
    custom_los = db.Column(db.String())
    advisor = db.Column(db.String())
    skills_offering = db.Column(db.String())
    skills_requesting = db.Column(db.String())
    location = db.Column(db.String())
    last_updated = db.Column(db.DateTime, index=True, default=datetime.utcnow().strftime('%m/%d/%Y %H:%M:%S'))

    users = relationship(User)

    def __repr__(self):
        return '<Capstone info {}>'.format(self.title)
