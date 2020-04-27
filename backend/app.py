from flask import request, jsonify, g, session, make_response
import click
from init import app
# from toJosn import JSONHelper
# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from blueprint.article import article_bp
from blueprint.file import file_bp
from blueprint.user import user_bp
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect
# from blueprint.push import socketio
import time
import os

# @socketio.on('message', namespace="/test_push")
# def test_push():
#     socketio.emit('server_response', {
#         'test': 123
#     }, namespace="/test_push")

def background_chat(msg, sid):
    for _ in range(3):
        socketio.emit('chatMessage', {'content': msg + "?" + str(_)},
                      namespace='/chatroom',
                      room=sid)
       	socketio.sleep(3)

# CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")
@socketio.on('join', namespace='/chatroom')
def join_chat(message):
    """创建聊天室
    """
    join_room(request.sid)
    print(message)
    print(request.sid)
    thread = socketio.start_background_task(background_chat, message, request.sid)
    # emit('response', {'msg': '创建聊天室成功'}, namespace='/chatroom')

@socketio.on('leave', namespace='/chatroom')
def leave_chat(message):
    """离开聊天室，仅删除当前用户
    """

@socketio.on('close', namespace='/chatroom')
def close_chat(message):
    """关闭聊天室，将所有用户移出
    """

@socketio.on('user_input', namespace='/chatroom')
def user_input(message):
    """获取用户输入
    """
    sid = request.sid
    print(message)
    emit('response', { 'message': 'hello' })
	# TODO

@socketio.on('connect', namespace='/chatroom')
def connect():
    """创建socket链接
    用户进入浏览器页面，自动加入
    """
    print('connect', request.sid)
    emit('connect', '')


@socketio.on('disconnect', namespace='/chatroom')
def disconnect():
    """关闭socket链接
    用户关闭浏览器页面，自动退出
    """
    print('Client disconnected', request.sid)

def register_blueprint():
    app.register_blueprint(article_bp)
    app.register_blueprint(file_bp)
    app.register_blueprint(user_bp)

if __name__ == "__main__":
    register_blueprint()
    # app.run(debug=True)
    socketio.run(app, debug=True, host="127.0.0.1", port=5000)