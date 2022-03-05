"""empty message

Revision ID: afd0d25af529
Revises: 2e5679e3d02f
Create Date: 2022-03-03 16:26:14.257061

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'afd0d25af529'
down_revision = '2e5679e3d02f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'role')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('role', postgresql.ENUM('advisor', 'student', name='roleenum'), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
