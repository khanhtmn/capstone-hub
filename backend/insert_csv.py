# Packages for data processing
import pandas as pd


# Import all models from `models.py`
from models import * 


#### MAIN ####
# Import csv file for students' data
df = pd.read_csv (r'/home/khanh/Documents/capstone-hub/backend/M22_Capstone_descriptions.csv')


# Function to create lists of data to inject to Models
def create_list_of_data(data, data_cols, model_cols, default_cols=None, default_vals=None):
    n = len(data_cols)
    lst = []

    for index, row in data.iterrows():
        row_data = {model_cols[i]: row[data_cols[i]] for i in range(n)}
        if default_cols:
            for i in range(len(default_cols)):
                row_data[default_cols[i]] = default_vals[i]
        lst.append(row_data)

    return lst


# Logins model
logins_cols = ["id", "public_id", "email"]
logins_data_cols = ["id", "id","email"]
logins_default_cols = ["password"]
logins_default_vals = ["Minerva22"]
logins_to_add = create_list_of_data(\
    data=df,\
    data_cols=logins_data_cols,\
    model_cols=logins_cols,\
    default_cols=logins_default_cols,\
    default_vals=logins_default_vals\
    )

# print(logins_to_add[:3])
# print(len(logins_to_add))


# Users model
users_cols = ["id", "login_id", "firstname",\
            "primary_major", "secondary_major",\
            "primary_concentration", "secondary_concentration",\
            "special_concentration", "minor", "minor_concentration"]
users_data_cols = ["id", "id", "name",\
                "primary_major", "second_major",\
                "primary_concentration", "second_concentration",\
                "special_concentration", "minor", "minor_concentration"]
users_default_cols = ["lastname", "role"]
users_default_vals = ["", RoleEnum.student]
users_to_add = create_list_of_data(\
    data=df,\
    data_cols=users_data_cols,\
    model_cols=users_cols,\
    default_cols=users_default_cols,\
    default_vals=users_default_vals\
    )

# print(users_to_add[:3])
# print(len(users_to_add))


# Projects model
projects_cols = ["id", "user_id", "title", "abstract",\
                "keywords", "features", "los", "custom_los",\
                "hsr_review"]
projects_data_cols = ["id", "id", "title", "abstract",\
                "keywords", "features", "los", "custom_los",\
                "hsr_status"]
projects_to_add = create_list_of_data(\
    data=df,\
    data_cols=projects_data_cols,\
    model_cols=projects_cols,\
    )

# print(projects_to_add[:3])
# print(len(projects_to_add))


def insert_data():
    """To insert data"""

    # Create application context to add data to the database
    from app import create_app
    my_app = create_app()
    my_app.app_context().push()

    # List of keys with (list_of_data, model) to iterate
    keys = [(logins_to_add, Login), (users_to_add, User), (projects_to_add, Project)]

    # Insert data
    for dict_to_add, table in keys:
        for dict_row in dict_to_add:
            try:
                stmt = table(**dict_row)
                db.session.add(stmt)
                db.session.commit()
            except:
                db.session.rollback()
                raise
            finally:
                db.session.close()

insert_data()
