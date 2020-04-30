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
    has_user = User.query.filter_by(id=tokenData['userId']).count()
    if has_user:
        room = Room(name='test', description='hello', user_set=str(tokenData['userId']))
        db.session.add(room)
        db.session.flush()
        print(room.id)
        # db.session.commit()
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

# @room_bp.route('/api/room/list', methods=['GET'])
# @verify_token
# def room_list(tokenData):
#     has_user = User.query.filter_by(id=tokenData['userId']).count()
#     if has_user:
#         roomList = Room.query.filter_by(User)
#         return jsonify({
#             'data': '',
#             'message': '成功',
#             'status': 200
#         })
#     return jsonify({
#         'data': '',
#         'message': '失败失败',
#         'status': 500
#     })