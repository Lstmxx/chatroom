FROM node:alpine as builder

ENV PROJECT_ENV production
# ENV NODE_ENV production

# http-server 不变动也可以利用缓存
WORKDIR /code

ADD package.json /code
RUN npm install

ADD . /code
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:latest
COPY --from=builder /code/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/chatroom.conf