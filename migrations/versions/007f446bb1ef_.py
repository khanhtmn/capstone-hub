"""empty message

Revision ID: 007f446bb1ef
Revises: 847eb6a9e6ea
Create Date: 2021-10-26 09:51:18.619315

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '007f446bb1ef'
down_revision = '847eb6a9e6ea'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('books', sa.Column('time', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('books', 'time')
    # ### end Alembic commands ###