from flask import request, jsonify, g, session, make_response, Blueprint
from models import Room, User
from utils import verify_token, token_generator
from toJosn import JSONHelper
from init.init_params import db
import hashlib
import time
import base64

room_bp = Blueprint('room', __name__)

@room_bp.route('/api/room/create', methods=['POST'])
@verify_token
def room_create(tokenData):
    values = request.get_json()
    user = User.query.filter_by(id=tokenData['userId']).first()
    if user:
        room = Room(name=values['name'],
                    description=values['description'],
                    user_set=str(tokenData['userId']),
                    owner=user.id,
                    avatar_image='')
        db.session.add(room)
        db.session.flush()
        room.room_hash_id = hashlib.md5(f'{room.id}{time.time()}'.encode('utf-8')).hexdigest()
        if values['avatarImage']:
            avatartImageList = values['avatarImage'].split(',')
            suffix = avatartImageList[0].split('/')[1].split(';')[0]
            filename = f'room_avatar/{room.room_hash_id}.{suffix}'
            print(filename)
            with open(f'media/{filename}', 'wb') as f:
                f.write(base64.b64decode(avatartImageList[1]))
            room.avatar_image = filename
        user.room_id_set = f'{user.room_id_set},{room.id}' if user.room_id_set else room.id
        db.session.commit()
        return jsonify({
            'data': {
                'room': JSONHelper.model_to_json(room)
            },
            'message': '成功',
            'status': 200
        })
    return jsonify({
        'data': '',
        'message': '失败失败',
        'status': 500
    })

@room_bp.route('/api/room/join', methods=['POST'])
@verify_token
def room_join(tokenData):
    values = request.get_json()
    user = User.query.filter_by(id=tokenData['userId']).first()
    room = Room.query.filter_by(room_hash_id=values['roomIdHash']).first()
    if user and room:
        user.room_id_set = f'{user.room_id_set},{room.id}' if user.room_id_set else room.id
        db.session.commit()
        return jsonify({
            'data': {
                'room': JSONHelper.model_to_json(room)
            },
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
        roomlist = Room.query.filter(Room.id.in_(user.room_id_set.split(','))).all() if user.room_id_set else []
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
