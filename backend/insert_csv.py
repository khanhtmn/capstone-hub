"""
This module is used to insert csv file to the database
"""

import pandas as pd
from datetime import datetime
from models import * 


#### MAIN ####
# Import csv file for students' data
df = pd.read_csv(r'/home/khanh/Documents/capstone-hub/backend/M22_Capstone_descriptions.csv')


# Function to create lists of data to inject to Models
"""
Take data and put to dictionary
"""
def create_list_of_data(data, data_cols, model_cols, default_cols=None, default_vals=None):
    """
    Input:
    dataframe data: Source of data
    list[str] data_cols: Column names from the df data
    list[str] model_cols: Column names from the db model
    list[str] default_cols: Default columns
    list[str] default_vals: Default values for the default columns

    Output:
    list[dict] table_to_insert: Table to insert to database
    """
    n = len(data_cols)
    table_to_insert = []

    for index, row in data.iterrows():
        row_data = dict()
        for i in range(n):
            model_col = model_cols[i]
            data_col = data_cols[i]
            row_value = row[data_col]
            if data_col == "timestamp":
                datetime_object = datetime.strptime(row_value, '%m/%d/%Y %H:%M:%S')
                row_data[model_col] = datetime_object
            else:
                # Do normal stuffs
                row_data[model_col] = row_value
        if default_cols:
            for i in range(len(default_cols)):
                row_data[default_cols[i]] = default_vals[i]
        table_to_insert.append(row_data)

    return table_to_insert


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

# Users model
users_cols = ["id", "login_id", "name",\
            "primary_major", "secondary_major",\
            "primary_concentration", "secondary_concentration",\
            "special_concentration", "minor", "minor_concentration"]
users_data_cols = ["id", "id", "name",\
                "primary_major", "second_major",\
                "primary_concentration", "second_concentration",\
                "special_concentration", "minor", "minor_concentration"]
users_default_cols = ["class_year"]
users_default_vals = [2022]
users_to_add = create_list_of_data(\
    data=df,\
    data_cols=users_data_cols,\
    model_cols=users_cols,\
    default_cols=users_default_cols,\
    default_vals=users_default_vals\
    )

print(users_to_add[:1])
print(len(users_to_add))


# Projects model
projects_cols = ["id", "user_id", "title", "abstract",\
                "keywords", "feature", "hsr_review", "skills",\
                "los", "custom_los", "advisor", "skills_offering",\
                "skills_requesting", "location", "last_updated"]
projects_data_cols = ["id", "id", "title", "abstract",\
                "keywords", "features", "hsr_status", "skills",\
                "los", "custom_los", "advisor", "skills_offering",\
                "skills_requesting", "location", "timestamp"]
projects_to_add = create_list_of_data(\
    data=df,\
    data_cols=projects_data_cols,\
    model_cols=projects_cols,\
    )


def insert_data():
    """To insert data"""
    # import sqlite3

    # db = sqlite3.connect("database.db")
    # cur = db.cursor()


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
            except Exception as e:
                db.session.rollback()
                print(e)
                continue
            finally:
                db.session.close()

insert_data()