from flask import request, jsonify, g, session, make_response, Blueprint
from flask_socketio import emit
from init.init_params import socketio
import os
import time

@socketio.on('message', namespace="/websocket/test_push")
def test_push(message):
    print('ddd-hello')
    socketio.emit('server_response', {
        'test': 123
    }, namespace="/websocket/test_push")

@socketio.on('connect', namespace="/websocket/test_push")
def connect():
    print("connect..")
    socketio.emit('server_response', {
        'test': 123
    }, namespace="/websocket/test_push")

@socketio.on('disconnect', namespace="/websocket/test_push")
def connect():
    print("disconnect...")