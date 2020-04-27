from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import db_config

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Drmhze6EPcv0fN_81Bj-nALstmxxxxx'
app.config['SQLALCHEMY_DATABASE_URI'] = db_config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
