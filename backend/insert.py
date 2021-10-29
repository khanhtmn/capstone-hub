from models import *


Logins_to_add = [{
    'id': 1,
    'title': 'Harry Potter 1',
    'body': 'This is the body of HP 1',
}, {
    'id': 2,
    'title': 'dragoncy@uni.minerva.edu',
    'body': 'Hello Dragon',
}, {
    'id': 3,
    'title': 'elisha@uni.minerva.edu',
    'body': 'Hello Elisha',
}, {
    'id': 4,
    'title': 'theemskerk@uni.minerva.edu',
    'body': 'Hello Tessa',
}, {
    'id': 5,
    'title': 'abigail.gust@uni.minerva.edu',
    'body': 'Hello Abigail',
}, {
    'id': 6,
    'title': 'alya@uni.minerva.edu',
    'body': 'Hello Alya',
}]

from app import create_app
my_app = create_app()
my_app.app_context().push()

keys = [(Logins_to_add, Articles)]

# insert data
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