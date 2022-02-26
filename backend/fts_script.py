import sqlite3
from sqlite3 import Connection
from typing import List

#     print(column_list)

# columns = ['1st', '2nd', '3rd']
# print(enable_fts(columns))
# def enable_fts(columns: List[str]):

# def enable_fts(table: str, columns: List[str]):
    # column_list = ','.join(f'[{c}]' for c in columns)
    # db.executescript('''
    #     CREATE VIRTUAL TABLE [{table}_fts] USING fts5
    #     (
    #         {column_list},
    #         content=[{table}_fts]
    #     )'''.format(
    #     table=table,
    #     column_list=column_list
    # ))

if __name__ == "__main__":
    from app import create_app
    my_app = create_app()
    my_app.app_context().push()

    columns = ['firstname', 'lastname', 'role', 'primary_major', 'secondary_major', 'primary_concentration', 'secondary_concentration', 'special_concentration', 'minor', 'minor_concentration']

    table = 'users'
    db = sqlite3.connect("database.db")

# conn = sqlite3.connect("C:\\users\\guest\\desktop\\example.db")
# on ubuntu, the backslashes also helped: create_engine("sqlite:///data\db_folder\example.db")
# /home/khanh/Documents/capstone-hub/backend

    cur = db.cursor()

    # OKAY NOW I KNOW THIS ONE WORKS!!!!!!
    column_list = ','.join(f'[{c}]' for c in columns)
    # new_columns=','.join(f'new.[{c}]' for c in columns)
    # old_columns=','.join(f'old.[{c}]' for c in columns)
    # cur.execute('''
    #     CREATE VIRTUAL TABLE [{table}_fts] USING fts5
    #     (
    #         {column_list},
    #         content=[{table}_fts]
    #     )'''.format(
    #     table=table,
    #     column_list=column_list
    # ))

    cur.execute('''
        CREATE TRIGGER [{table}_fts_insert] AFTER INSERT ON {table}
        BEGIN
            INSERT INTO [{table}_fts] (rowid, {column_list}) VALUES (new.rowid, {new_columns});
        END;
    '''.format(
        table=table,
        column_list=column_list,
        new_columns=','.join(f'new.[{c}]' for c in columns),
    ))

    cur.execute('''
        CREATE TRIGGER [{table}_fts_delete] AFTER DELETE ON {table}
        BEGIN
            INSERT INTO [{table}_fts] ([{table}_fts], rowid, {column_list}) VALUES ('delete', old.rowid, {old_columns});
        END;
    '''.format(
        table=table,
        column_list=column_list,
        old_columns=','.join(f'old.[{c}]' for c in columns),
    ))

    cur.execute('''
        CREATE TRIGGER [{table}_fts_update] AFTER UPDATE ON {table}
        BEGIN
            INSERT INTO [{table}_fts] ([{table}_fts], rowid, {column_list}) VALUES ('delete', old.rowid, {old_columns});
            INSERT INTO [{table}_fts] (rowid, {column_list}) VALUES (new.rowid, {new_columns});
        END;
    '''.format(
        table=table,
        column_list=column_list,
        old_columns=','.join(f'old.[{c}]' for c in columns),
        new_columns=','.join(f'new.[{c}]' for c in columns),
    ))

# def query(db: Connection, table: str, term: str) -> List[sqlite3.Row]:
#     cur = db.execute('''
#         SELECT * FROM [{table}]
#         WHERE ROWID IN (SELECT ROWID FROM [{table}_fts] WHERE [{table}_fts] MATCH ? ORDER BY rank)
#     '''.format(table=table), [term])
#     return list(cur.fetchall())