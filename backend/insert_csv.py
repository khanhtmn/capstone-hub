"""
This module is used to insert csv file to the database
"""

import pandas as pd
from datetime import datetime
from models import * 
from mapping_enums import class_mapping, college_mapping, concentration_mapping, role_mapping, hsr_mapping


#### MAIN ####
# Import csv file for students' data
df = pd.read_csv(r'/home/khanh/Documents/capstone-hub/backend/M22_Capstone_descriptions.csv')

#### Process NA values ####
# NA_VALUE = "NONE"

# print("BEFORE PROCESSING NAs")
# print(f"Number of NA values: {df.isnull().sum()}")

# df = df.fillna(NA_VALUE)

# print("AFTER PROCESSING NAs")
# print(f"Number of NA values: {df.isnull().sum()}")

enum_cols = {
    "role": role_mapping,
    "primary_major": college_mapping,
    "secondary_major": college_mapping,
    "primary_concentration": concentration_mapping,
    "secondary_concentration": concentration_mapping,
    "minor": college_mapping,
    "minor_concentration": concentration_mapping,
    "hsr_review": hsr_mapping
    }


# Function to create lists of data to inject to Models
"""
Take data and put to dictionary
If column is enum:
    Get equivalent enum data -> Put to tables

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
            if model_col in enum_cols:
                # Map values from data_col to enum_mapping
                # Then put values from enum_mapping to the row data
                mapper = enum_cols[model_col] # Name of the mapper
                key = row_value # Value of the row aka key of the mapper
                if key in mapper:
                    value = mapper[key] # Value to insert aka value of the mapper
                # elif key == NA_VALUE:
                #     value = ""
                else:
                    value = key
                row_data[model_col] = value
            elif data_col == "timestamp":
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
users_default_cols = ["role", "class_year"]
users_default_vals = [RoleEnum.student, ClassEnum.M22]
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

# print(projects_to_add[:3])
# print(len(projects_to_add))


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
            except:
                db.session.rollback()
                print("""There's some error!""")
                continue
            finally:
                db.session.close()

insert_data()