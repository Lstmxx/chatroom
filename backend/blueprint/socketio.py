from flask import request, jsonify, g, session, make_response
from flask_cors import CORS
from models import RoomRecord, UserNotReadRecord, Room, User
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect
from init.init_params import app, db

def background_chat(msg, sid):
    for _ in range(3):
        socketio.emit('chatMessage', {'content': msg + "?" + str(_)},
                      namespace='/chatroom',
                      room=sid)
       	socketio.sleep(3)

# CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('join_all', namespace='/chatroom')
def join_chat(roomList):
    """加入多个聊天室
    """
    print(roomList)
    for room in roomList:
        join_room(room)
    # thread = socketio.start_background_task(background_chat, message, request.sid)
    emit('log', {'msg': 'join一join'}, namespace='/chatroom')

@socketio.on('join_one', namespace='/chatroom')
def join_chat(join):
    """加入聊天室
    """
    room = Room.query.filter_by(room_hash_id=join['roomHashId']).first()
    user = User.query.filter_by(id=join['userId']).first()
    userRoomList = user.room_id_set.split(',') if user.room_id_set else []
    if room and not str(join['roomId']) in userRoomList:
        join_room(room.id)
        user.room_id_set = f'{user.room_id_set},{room.id}' if user.room_id_set else room.id
        db.session.commit()
        emit('join_one_recv', {'msg': 'success'}, namespace='/chatroom')
    else:
        emit('join_one_recv', {'msg': 'error'}, namespace='/chatroom')
    # thread = socketio.start_background_task(background_chat, message, request.sid)

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
    print(message)
    socketio.emit('received', message,
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
