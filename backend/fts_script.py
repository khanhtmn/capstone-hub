import sqlite3
from sqlite3 import Connection
from typing import List


def enable_fts(db: Connection, table: str, columns: List[str]):
    column_list = ','.join(f'[{c}]' for c in columns)
    db.executescript('''
        CREATE VIRTUAL TABLE [{table}_fts] USING fts5
        (
            {column_list},
            content=[{table}_fts]
        )'''.format(
        table=table,
        column_list=column_list
    ))

    db.executescript('''
        CREATE TRIGGER [{table}_fts_insert] AFTER INSERT ON posts
        BEGIN
            INSERT INTO [{table}_fts] (rowid, {column_list}) VALUES (new.rowid, {new_columns});
        END;
        CREATE TRIGGER [{table}_fts_delete] AFTER DELETE ON posts
        BEGIN
            INSERT INTO [{table}_fts] ([{table}_fts], rowid, {column_list}) VALUES ('delete', old.rowid, {old_columns});
        END;
        CREATE TRIGGER [{table}_fts_update] AFTER UPDATE ON posts
        BEGIN
            INSERT INTO [{table}_fts] ([{table}_fts], rowid, {column_list}) VALUES ('delete', old.rowid, {old_columns});
            INSERT INTO [{table}_fts] (rowid, {column_list}) VALUES (new.rowid, {new_columns});
        END;
    '''.format(
        table=table,
        column_list=column_list,
        new_columns=','.join(f'new.[{c}]' for c in columns),
        old_columns=','.join(f'old.[{c}]' for c in columns),
    ))


def query(db: Connection, table: str, term: str) -> List[sqlite3.Row]:
    cur = db.execute('''
        SELECT * FROM [{table}]
        WHERE ROWID IN (SELECT ROWID FROM [{table}_fts] WHERE [{table}_fts] MATCH ? ORDER BY rank)
    '''.format(table=table), [term])
    return list(cur.fetchall())