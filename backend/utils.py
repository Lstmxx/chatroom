from flask import request, jsonify, g, session, make_response
from functools import wraps
from models import User
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from init.init_params import app
from toJosn import JSONHelper

token_generator = Serializer(app.config['SECRET_KEY'], expires_in=3600 * 24)

def verify_token(func):
    @wraps(func)
    def wrap_func(*args, **kwargs):
        response = {
            'data': '',
            'message': '',
            'status': 200
        }
        # print(request.headers)
        # print(f"token is: {request.headers.get('Lstmxx-Token')}")
        token = request.headers.get('chat-Token')
        if token:
            try:
                data = token_generator.loads(token)
            except:
                response = {
                    'data': '',
                    'status': 403,
                    'message': '重新登陆啦靓仔'
                }
                return jsonify(response)
            if data['tokenType']:
                return func(*args, **kwargs, tokenData = data)
            else:
                response = {
                    'data': '',
                    'status': 401,
                    'message': '假token要不得'
                }
                return jsonify(response)
        else:
            response = {
                'data': '',
                'status': 401,
                'message': '没有权限访问接口'
            }
            return jsonify(response)
    return wrap_func

# def verify_super(func):
#     @wraps(func)
#     def wrap_func(*args, **kwargs):
#         response = {
#             'data': '',
#             'message': '',
#             'status': 200
#         }
#         # print(request.headers)
#         # print(f"token is: {request.headers.get('Lstmxx-Token')}")
#         token = request.headers.get('chat-Token')
#         if token:
#             try:
#                 data = token_generator.loads(token)
#             except:
#                 response = {
#                     'data': '',
#                     'status': 403,
#                     'message': '重新登陆啦靓仔'
#                 }
#                 return jsonify(response)
#             a = Authorization.query.get(data['root_id'])
#             if a.root == 998:
#                 return func(*args, **kwargs, tokenData = data)
#             else:
#                 response = {
#                     'data': '',
#                     'status': 401,
#                     'message': '没有权限搞这个'
#                 }
#                 return jsonify(response)
#         else:
#             response = {
#                 'data': '',
#                 'status': 401,
#                 'message': '没有权限访问接口'
#             }
#             return jsonify(response)
#     return wrap_func