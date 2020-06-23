#-- coding:UTF-8 --

from flask import request, jsonify, g, session, make_response
import click
from blueprint.file import file_bp
from blueprint.user import user_bp
from blueprint.room import room_bp
from blueprint.room_record import room_record_bp
from blueprint.socketio import app, socketio, db

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
    # click.echo('初始化数据库成功')

def register_blueprint():
    app.register_blueprint(file_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(room_bp)
    app.register_blueprint(room_record_bp)

if __name__ == "__main__":
    register_blueprint()
    # app.run(debug=True)
    socketio.run(app, host="0.0.0.0", port=4999, debug=True)