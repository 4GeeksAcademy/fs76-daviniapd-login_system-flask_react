"""empty message

Revision ID: 390e3a2cdf50
Revises: 9713bbe0d6eb
Create Date: 2024-09-18 11:44:49.439801

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '390e3a2cdf50'
down_revision = '9713bbe0d6eb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('soles', sa.String(length=80), nullable=True))
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_column('soles')

    # ### end Alembic commands ###
