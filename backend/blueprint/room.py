from flask import request, jsonify, g, session, make_response, Blueprint
from models import Room, User
from utils import verify_token, token_generator
from toJosn import JSONHelper
from init.init_params import db
import time

room_bp = Blueprint('room', __name__)

@room_bp.route('/api/room/create', methods=['POST'])
@verify_token
def room_create(tokenData):
    user = User.query.filter_by(id=tokenData['userId']).first()
    if user:
        room = Room(name='test', description='hello', user_set=str(tokenData['userId']), owner=user.id, avatar_image='老干妈 - 副本.jpg')
        db.session.add(room)
        db.session.flush()
        if user.room_id_set:
            user.room_id_set = f'{user.room_id_set}, {room.id}'
        else:
            user.room_id_set = room.id
        db.session.commit()
        return jsonify({
            'data': '',
            'message': '成功',
            'status': 200
        })
    return jsonify({
        'data': '',
        'message': '失败失败',
        'status': 500
    })

@room_bp.route('/api/room/list', methods=['GET'])
@verify_token
def room_list(tokenData):
    user = User.query.filter_by(id=tokenData['userId']).first()
    if user:
        roomlist = Room.query.filter(Room.id.in_(user.room_id_set.split(','))).all()
        print(roomlist)
        return jsonify({
            'data': {
                'roomList': JSONHelper.to_json_list(roomlist)
            },
            'message': '成功',
            'status': 200
        })
    return jsonify({
        'data': '',
        'message': '失败失败',
        'status': 500
    })