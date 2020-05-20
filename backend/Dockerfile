# FROM tiangolo/uwsgi-nginx-flask:python3.8
FROM python:3.7

ADD . /app

RUN pip install -r /app/requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

RUN pip install cryptography

RUN pip install pymysql