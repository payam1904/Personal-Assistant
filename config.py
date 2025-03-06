import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_default_secret_key')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'instance', 'app.database')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def print_config():
        print(f'SECRET_KEY: {Config.SECRET_KEY}')
        print(f'SQLALCHEMY_DATABASE_URI: {Config.SQLALCHEMY_DATABASE_URI}')
        print(f'SQLALCHEMY_TRACK_MODIFICATIONS: {Config.SQLALCHEMY_TRACK_MODIFICATIONS}')