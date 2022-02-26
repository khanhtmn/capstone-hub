"""
This is the script to create virtual tables for full-text search
and insert the data to virtual tables
"""
import sqlite3
import pandas as pd

# Data to work with
df = pd.read_csv (r'/home/khanh/Documents/capstone-hub/backend/M22_Capstone_descriptions.csv')

# create sqlite database into local memory (RAM)
db = sqlite3.connect(':memory:')
cur = db.cursor()

# cur.execute('create virtual table vt_logins using fts5(id, public_id, email, tokenize="porter unicode61");')

cur.execute('CREATE VIRTUAL TABLE posts USING FTS5(title, body);')
cur.execute('''INSERT INTO posts(title,body) VALUES 
('Learn SQlite FTS5','This tutorial teaches you how to perform full-text search in SQLite using FTS5'),
('Advanced SQlite Full-text Search','Show you some advanced techniques in SQLite full-text searching'),
('SQLite Tutorial','Help you learn SQLite quickly and effectively');''')

# bulk index records
# cur.execute('insert into vt_logins (id, public_id, email) values (1,1,khanh);')
db.commit()

# match any tokens which begins with this prefix
# Wild match with this prefix
q = 'FTS*'

# Everything starts with this word
# q = '^ The'

# match all title where there are maximum 3 tokens between "the" and "a".
# good way to match phrases
# res = cur.execute(f"""select *, rank
#                       from imdb
#                       where title MATCH 'NEAR(the a, 3)'
#                       ORDER BY rank
#                       limit 5""").fetchall()

# Boolean operators: AND, OR, NOT
# q = 'The OR GodFather'
# res = cur.execute(f"""select *, rank
#                       from imdb
#                       where title MATCH "{q}"
#                       ORDER BY rank
#                       limit 5""").fetchall()



res = cur.execute(f"""SELECT * FROM posts WHERE posts MATCH '{q}';""").fetchall()


# res = cur.execute(f"""select *, rank
                    #   from vt_logins
                    #   where email MATCH "{q}"
                    #   ORDER BY rank
                    #   limit 10""").fetchall()
# print(res)

q2 = 'search*'

res2 = cur.execute(f"""SELECT * FROM posts WHERE posts MATCH '{q2}';""").fetchall()

# print(res2)

q3 = 'learn NOT text'

res3 = cur.execute(f"""SELECT * FROM posts WHERE posts MATCH '{q3}';""").fetchall()

# print(res3)

q4 = 'sqlite AND text'

res4 = cur.execute(f"""SELECT * FROM posts WHERE posts MATCH '{q4}';""").fetchall()

# print(res4)

res5 = cur.execute(f"""
SELECT highlight(posts,0, '<b>', '</b>') title, 
       highlight(posts,1, '<b>', '</b>') body
FROM posts 
WHERE posts MATCH 'SQLite'
ORDER BY rank;
""").fetchall()

print(res5)