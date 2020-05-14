from flask import request, jsonify, g, session, make_response
from flask_cors import CORS
from models import RoomRecord, UserNotReadRecord, Room, User
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect
from init.init_params import app, db
from toJosn import JSONHelper
from datetime import datetime
from json import dumps
from time import sleep

socketio = SocketIO(app, cors_allowed_origins="*")

def thread_join_chats(user, roomList):
    for roomId in roomList:
        join_room(roomId)
        emit('received', { 'roomId': roomId, 'userName': user.username, 'type': 'join' }, namespace='/chatroom', room=roomId)

# CORS(app, supports_credentials=True)

@socketio.on('join_all', namespace='/chatroom')
def join_chats(message):
    """加入多个聊天室
    """
    print(message)
    user = User.query.filter_by(id=message['userId']).first()
    if user and len(message['roomList']) > 0:
        for roomId in message['roomList']:
            join_room(roomId)
            emit('received', {
                'user': {
                    'id': user.id,
                    'name': user.username,
                    'avatarImage': user.avatar_image,
                },
                'roomId': roomId,
                'type': 'join'
            }, namespace='/chatroom', room=roomId)
        # thread = socketio.start_background_task(thread_join_chats, user, message['roomList'])

@socketio.on('join_one_chat', namespace='/chatroom')
def join_one_chat(join):
    """加入聊天室
    """
    room = Room.query.filter_by(id=join['roomId']).first()
    user = User.query.filter_by(id=join['userId']).first()
    print(join)
    if room and user:
        join_room(room.id)
        emit('received', {
            'user': {
                'id': user.id,
                'name': user.username,
                'avatarImage': user.avatar_image,
            },
            'roomId': room.id,
            'type': 'join'
        }, namespace='/chatroom', room=room)

@socketio.on('leave', namespace='/chatroom')
def leave_chat(message):
    """离开聊天室，仅删除当前用户
    """

@socketio.on('close', namespace='/chatroom')
def close_chat(message):
    """关闭聊天室，将所有用户移出
    """
    print('hwlo')

@socketio.on('user_send_message', namespace='/chatroom')
def user_input(message):
    """获取用户输入
    """
    userId = message['userId']
    user = User.query.filter_by(id=message['userId']).first()
    if user:
        response = {
            'user': {
                'id': user.id,
                'name': user.username,
                'avatarImage': user.avatar_image,
            },
            'message': message['message'],
            'roomId': message['roomId'],
            'id': message['id'],
            'type': message['type'],
            'time': datetime.utcnow().isoformat(),
        }
        socketio.emit('received', response,
                        namespace='/chatroom',
                        room=message['roomId'])

@socketio.on('connect', namespace='/chatroom')
def connect():
    """创建socket链接
    用户进入浏览器页面，自动加入
    """
    print('connect', request.sid)
    # emit('recive', 'dfdsf')


@socketio.on('disconnect', namespace='/chatroom')
def disconnect():
    """关闭socket链接
    用户关闭浏览器页面，自动退出
    """
    print('Client disconnected', request.sid)
