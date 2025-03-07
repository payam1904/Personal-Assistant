from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from config import Config
from flask_wtf.csrf import CSRFProtect

database = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')
    app.config.from_object(Config)
    csrf = CSRFProtect(app)

    database.init_app(app)
    Migrate(app, database)
    
    login_manager.init_app(app)
    login_manager.login_view = 'core.index'
    
    from app.routes import core
    app.register_blueprint(core)
    
    return app