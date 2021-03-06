from init.init_params import db
from datetime import datetime

class Room(db.Model):
    __tablename__ = 'room'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index = True)
    owner = db.Column(db.Integer, db.ForeignKey('user.id'), index = True)
    user_set = db.Column(db.Text(length=(2**31)-1))
    description = db.Column(db.Text(length=(2**31)-1))
    create_time = db.Column(db.DateTime, default=datetime.utcnow, index = True)
    update_time = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, index = True)
    avatar_image = db.Column(db.String(64), index = True)
    room_hash_id = db.Column(db.String(32), index = True)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index = True)
    password = db.Column(db.String(64))
    create_time = db.Column(db.DateTime, default=datetime.utcnow)
    avatar_image = db.Column(db.String(64))
    room_id_set = db.Column(db.Text(length=(2**31)-1))

class RoomRecord(db.Model):
    __tablename__ = 'room_record'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(length=(2**31)-1))
    create_time = db.Column(db.DateTime, default=datetime.utcnow, index = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), index = True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), index = True)

class UserNotReadRecord(db.Model):
    __tablename__ = 'user_not_read_record'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(length=(2**31)-1))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), index = True)
    create_time = db.Column(db.DateTime, default=datetime.utcnow, index = True)

class Friend(db.Model):
    __tablename__ = 'friend'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255))
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'), index = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), index = True)
    create_time = db.Column(db.DateTime, default=datetime.utcnow, index = True)
    update_time = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, index = True)
