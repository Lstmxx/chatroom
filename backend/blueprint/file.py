from flask import request, jsonify, g, session, make_response, Blueprint
from utils import verify_token, token_generator
import os
import time

file_bp = Blueprint('file', __name__)

@file_bp.route('/api/up-load/image', methods=['post'])
@verify_token
def save_up_load_file(tokenData):
    upLoadFile = request.files['image']
    print(upLoadFile.filename)
    print(type(upLoadFile))
    filename = upLoadFile.filename
    
    if os.path.exists(f'media/{filename}'):
        filenames = filename.split('.')
        filename = filenames[0] + f'_{ int(round(time.time() * 1000)) }.' + filenames[1]
    with open(f'media/{filename}', 'wb') as f:
        f.write(upLoadFile.stream.read())
    response = {
        'data': {
            'imageName': filename
        },
        'message': '保存成功',
        'status': 200
    }
    return jsonify(response)
