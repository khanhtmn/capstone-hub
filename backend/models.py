import enum
from datetime import datetime
from sqlalchemy.orm import relationship
from app import db, ma


class ClassEnum(str, enum.Enum):
    """
    class defining enums for class year
    used in tables
    """

    M19 = "Class of 2019"
    M20 = "Class of 2020"
    M21 = "Class of 2021"
    M22 = "Class of 2022"
    M23 = "Class of 2023"
    M24 = "Class of 2024"
    M25 = "Class of 2025"
    M26 = "Class of 2026"


class CollegeEnum(str, enum.Enum):
    """
    class defining enums for majors and minors
    used in tables
    """

    CS = "Computer Science"
    BS = "Business"
    NS = "Natural Science"
    AH = "Arts and Humanities"
    SS = "Social Science"


class ConcentrationEnum(str, enum.Enum):
    """
    class defining enums for concentrations
    used in tables
    """

    APS = "Applied Problem Solving"
    AL = "Arts and Literature"
    BM = "Brand Management"
    CO = "Cells and Organisms"
    CBB = "Cognition, Brain, and Behavior"
    CTA = "Computational Theory and Analysis"
    CSAI = "Computer Science and Artificial Intelligence"
    CKD = "Contemporary Knowledge Discovery"
    DSS = "Data Science and Statistics"
    DS = "Designing Societies"
    ES = "Earth's Systems"
    ECS = "Economics and Society"
    EASS = "Empirical Approaches to the Social Sciences"
    EM = "Enterprise Management"
    HFC = "Historical Forces"
    HAN = "Humanities Analyses"
    HAP = "Humanities Applications"
    HFD = "Humanities Foundations"
    MOC = "Managing Operational Complexity"
    MATH = "Mathematics"
    MA = "Molecules and Atoms"
    NBV = "New Business Ventures"
    PEL = "Philosophy, Ethics, and the Law"
    PGS = "Politics, Government, and Society"
    PSCS = "Problem Solving in Complex Systems"
    RANS = "Research Analyses in Natural Science"
    SG = "Scalable Growth"
    SF = "Strategic Finance"
    TFNS = "Theoretical Foundations of Natural Science"
    TASS = "Theory and Analysis in the Social Sciences"
    CSC = "Custom / Special concentration"


class RoleEnum(str, enum.Enum):
    """
    class defining enums for professor and student role
    used in tables
    """

    advisor = "Advisor"
    student = "Student"

    # Consider having admin role


class FeatureEnum(str, enum.Enum):
    """
    class defining enums for project features
    used in tables
    """

    creative = "Creative (e.g., writing, art)"
    primary_research = "Primary research (e.g., with a research group)"
    secondary_research = "Secondary research (e.g., literature review with analysis/synthesis and proposal for future work)"
    replication = "Replication"
    interview_survey = "Interview/survey"
    data_analysis = "Data analysis"
    journalism = "Journalism"
    philosophical = "Philosophical analysis"
    policy = "Policy analysis/proposal"
    education = "Educational curriculum/materials"
    business = "Business plan"
    podcast = "Podcast"
    app = "App"
    other = "Other"


class HSREnum(str, enum.Enum):
    """
    class defining enums for HSR review status
    used in tables
    """

    not_yet = "Have not submitted a description yet"
    awaiting = "Submitted a brief description, awaiting reply"
    revising = "Revising based on HSR committee feedback"
    not_reviewed = "Reviewed by HSR committee: *NOT* HSR"
    reviewed = "Reviewed by HSR committee: Is HSR, possibly exempt"
    submitted = "Application for exemption submitted to IRB (no later than April 1, 2021)"
    confirmed = "Confirmed exempt by IRB (no later than Sept 1, 2021)"
    not_granted = "Exempt status not granted (must pursue other project)"
    na = "N/A (project does NOT involve interacting with any people and/or their information)"
    other = "Other"


class Login(db.Model):
    __tablename__ = 'logins'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<Login user {}>'.format(self.email)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    login_id = db.Column(db.Integer, db.ForeignKey("logins.id"))
    firstname = db.Column(db.String(128))
    lastname = db.Column(db.String(128))
    role = db.Column(db.Enum(RoleEnum))
    primary_major = db.Column(db.Enum(CollegeEnum))
    secondary_major = db.Column(db.Enum(CollegeEnum))
    primary_concentration = db.Column(db.Enum(ConcentrationEnum))
    secondary_concentration = db.Column(db.Enum(ConcentrationEnum))
    special_concentration = db.Column(db.String())
    minor = db.Column(db.Enum(CollegeEnum))
    minor_concentration = db.Column(db.Enum(ConcentrationEnum))
    
    logins = relationship(Login)

    # Index major and concentration or not?

    def __repr__(self):
        return '<User info {}{}>'.format(self.firstname, self.lastname)

# Generate marshmallow Schemas from your models
class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","login_id", "firstname", "lastname", "role", "primary_major",
                "secondary_major", "primary_concentration", "secondary_concentration",
                "special_concentration", "minor", "minor_concentration")

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # advisor_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String())
    abstract = db.Column(db.String())
    keywords = db.Column(db.String())
    feature = db.Column(db.Enum(FeatureEnum))
    # feature = db.Column(db.ArrayOfEnum(db.Enum(FeatureEnum)))
    los = db.Column(db.String())
    custom_los = db.Column(db.String())
    hsr_review = db.Column(db.Enum(HSREnum))
    last_updated = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    users = relationship(User)

    def __repr__(self):
        return '<Capstone info {}>'.format(self.title)

# Generate marshmallow Schemas from your models
class ProjectSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","user_id", "title", "abstract", "keywords", "feature",
                "los", "custom_los", "hsr_review", "last_updated")

project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)
