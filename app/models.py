from app import database, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(database.Model, UserMixin):
    __tablename__ = 'users'
    id = database.Column(database.Integer, primary_key=True)
    first_name = database.Column(database.String(150), nullable=False)
    last_name = database.Column(database.String(150), nullable=False)
    date_of_birth = database.Column(database.Date, nullable=False)
    phone_number = database.Column(database.String(15), nullable=False)
    email = database.Column(database.String(150), unique=True, nullable=False)
    password = database.Column(database.String(150), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    
