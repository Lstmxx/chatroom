from flask import request, jsonify, g, session, make_response, Blueprint
from models import Room, User, RoomRecord
from utils import verify_token, token_generator
from toJosn import JSONHelper
from init.init_params import db
import hashlib
import time
import base64

room_record_bp = Blueprint('room_record', __name__)

@room_record_bp.route('/api/room-record/page', methods=['POST'])
@verify_token
def room_record_page(tokenData):
    values = request.get_json()
    recordResList = RoomRecord.query.filter_by(room_id=values["room_id"]).order_by(RoomRecord.create_time.desc()).limit(values['pageSize']).offset((values['page'] - 1) * values['pageSize'])
    userIdSet = set()
    recordList = []
    userList = []
    for res in recordResList:
        data = {
          'createTime': res.create_time,
          'content': res.content,
          'roomId': res.room_id,
          'userId': res.user_id
        }
        userIdSet.add(res.user_id)
        recordList.append(data)
    usrResList = User.query.filter(User.id.in_(userIdSet)).all()
    for usr in usrResList:
        data = {
          'name': usr.username,
          'avatarImage': usr.avatar_image,
          'id': usr.id
        }
        userList.append(data)
    return jsonify({
        'data': {
          'userList': userList,
          'recordList': recordList
        },
        'message': '成功',
        'status': 200
    })