from flask import request, jsonify, g, session, make_response
import click
from init.init_params import app, db
from blueprint.file import file_bp
from blueprint.user import user_bp
from blueprint.room import room_bp
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect
import time
import os

@app.cli.command()
@click.option('--drop', is_flag=True, help='create after drop')
def initdb(drop):
    if drop:
        click.confirm('真的要清除数据库吗', abort=True)
        db.drop_all()
        click.echo('Drop success')
    # db.create_all()
    click.echo('初始化数据库成功')

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
    app.register_blueprint(file_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(room_bp)

if __name__ == "__main__":
    register_blueprint()
    # app.run(debug=True)
    socketio.run(app, debug=True, host="127.0.0.1", port=4999)