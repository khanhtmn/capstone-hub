"""empty message

Revision ID: a5c3990cc94b
Revises: 2ff3e2b21f9c
Create Date: 2021-10-26 10:06:09.490257

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a5c3990cc94b'
down_revision = '2ff3e2b21f9c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('books', sa.Column('yes', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('books', 'yes')
    # ### end Alembic commands ###