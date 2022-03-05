'''
Define models for database schema
'''

from sqlalchemy.sql import func
    
from sqlalchemy import func, Index, text
from sqlalchemy.sql.operators import op
from sqlalchemy.orm import relationship

from datetime import datetime

from app import db

CONFIG = 'english'

def to_tsvector_ix(*columns):
    s = " || ' ' || ".join(columns)
    return func.to_tsvector(CONFIG, text(s))

def create_tsvector(*args):
    field, weight = args[0]
    exp = func.setweight(func.to_tsvector(CONFIG, field), weight)
    for field, weight in args[1:]:
        exp = op(exp, '||', func.setweight(func.to_tsvector(CONFIG, field), weight))
    return exp

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

    __ts_vector__ = to_tsvector_ix(
        'name', 'primary_major', 'secondary_major', 'primary_concentration', 'secondary_concentration', 'special_concentration', 'minor', 'minor_concentration'
    )

    __table_args__ = (
        Index('user_index', __ts_vector__, postgresql_using='gin'),
    )

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

    __ts_vector__ = to_tsvector_ix(
        'title', 'abstract', 'keywords', 'feature', 'hsr_review', 'skills', 'los', 'custom_los', 'advisor', 'skills_offering', 'skills_requesting', 'location', 'last_updated'
    )

    __table_args__ = (
        Index('project_index', __ts_vector__, postgresql_using='gin'),
    )

    def __repr__(self):
        return '<Capstone info {}>'.format(self.title)
