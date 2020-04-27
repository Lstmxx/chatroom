from init import db
from datetime import datetime

class Room(db.Model):
    __tablename__ = 'room'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index = True)
    owner = db.db.Column(db.Integer, db.ForeignKey('user.id'), index = True)
    user_set = db.Column(db.Text(length=(2**31)-1))
    description = db.Column(db.Text(length=(2**31)-1))
    create_time = db.Column(db.DateTime, default=datetime.utcnow, index = True)
    update_time = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, index = True)
    avatar_image = db.Column(db.String(64), index = True)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index = True)
    password = db.Column(db.String(64))
    create_time = db.Column(db.DateTime, default=datetime.utcnow)
    articles = db.relationship('Article')
    avatar_image = db.Column(db.String(64))
    root_id = db.Column(db.Integer, db.ForeignKey('authorization.id'), index = True)
    
class Authorization(db.Model):
    __tablename__ = 'authorization'
    id = db.Column(db.Integer, primary_key=True)
    create_time = db.Column(db.DateTime, default=datetime.utcnow, index = True)
    update_time = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, index = True)
    name = db.Column(db.String(64))
    root = db.Column(db.Integer)

class RoomRecord(db.Model):
    __tablename__ = 'room_record'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(length=(2**31)-1))
    create_time = db.Column(db.DateTime, default=datetime.utcnow, index = True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), index = True)

class UserNotReadRecord(db.Model):
    __tablename__ = 'user_not_read_record'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(length=(2**31)-1))
    tag_name = db.Column(db.String(64))
    tag_color = db.Column(db.String(64))

class Friend(db.Model):
    __tablename__ = 'friend'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255))
    article_id = db.Column(db.Integer, db.ForeignKey('article.id'), index = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), index = True)
    create_time = db.Column(db.DateTime, default=datetime.utcnow, index = True)
    update_time = db.Column(db.DateTime, default=datetime.utcnow,onupdate=datetime.utcnow, index = True)
