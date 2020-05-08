from flask import request, jsonify, g, session, make_response, Blueprint
from models import User
from utils import verify_token, token_generator
from toJosn import JSONHelper
from init.init_params import db
import time

user_bp = Blueprint('user', __name__)

@user_bp.route('/api/login', methods=['POST'])
def login():
    response = {
        'data': '',
        'message': '',
        'status': 0
    }
    values = request.get_json()
    required = ['password', 'username']
    if not all(k in values for k in required):
        print(request.headers)
    else:
        user = User.query.filter_by(username=values['username']).first()
        if user:
            if user.password == values['password']:
                response['message'] = 'login success'
                response['status'] = 200
                token = token_generator.dumps({
                    'tokenType': 'user',
                    "userId": user.id,
                    'iat': time.time()
                }).decode('utf-8')
                response['data'] = {
                    'token': token,
                    'userName': user.username
                }
            else:
                response['message'] = 'password incorrect'
                response['status'] = 401
        else:
            response['message'] = f"{values['username']} is no exist"
            response['status'] = 401
    print(response)
    return jsonify(response)

@user_bp.route('/api/register', methods=['POST'])
def register():
    response = {
        'data': '',
        'message': '',
        'status': 0
    }
    values = request.get_json()
    required = ['password', 'username']
    if not all(k in values for k in required):
        response['message'] = 'register fail'
        response['status'] = 401
    else:
        has_user = User.query.filter_by(username=values['username']).count()
        if has_user == 0:
            user = User(username=values['username'], password=values['password'])
            db.session.add(user)
            db.session.commit()
            response['message'] = 'register success'
            response['status'] = 200
        else:
            response['message'] = f"{values['username']} is exist"
            response['status'] = 401
    return jsonify(response), 200

@user_bp.route('/api/user-info', methods=['POST'])
@verify_token
def get_user_info(tokenData):
    response = {
        'data': {
            'userInfo': ''
        },
        'status': 200,
        'message': 'success'
    }
    if tokenData['tokenType'] == 'user':
        userId = tokenData['userId']
        user = User.query.get(userId)
        if user:
            response['data']['userInfo'] = {
                'name': user.username,
                'userId': user.id
            }
    return jsonify(response)

@user_bp.route('/api/get-token', methods=['POST'])
def get_token():
    response = {
        'data': {
            'token': ''
        },
        'status': 200,
        'message': 'GET TOKEN SUCCESS'
    }
    print(request.headers)
    token = None
    if request.headers.get('chat-Token'):
        try:
            data = token_generator.loads(request.headers.get('chat-Token'))
            print(data)
        except:
            token = token_generator.dumps({
                'tokenType': 'visitor'
            }).decode('utf-8')
    else:
        token = token_generator.dumps({
            'tokenType': 'visitor'
        }).decode('utf-8')
    response['data']['token'] = token
    return jsonify(response)

@user_bp.route('/api/logout', methods=['GET'])
def logout():
    response = {
        'data': {
            'token': ''
        },
        'status': 200,
        'message': 'LOGOUT SUCCESS'
    }
    return jsonify(response)