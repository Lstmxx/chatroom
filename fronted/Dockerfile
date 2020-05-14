FROM node:alpine

ENV PROJECT_ENV production
WORKDIR /code
ADD . /code
RUN npm install && npm run build && npm install -g http-server
EXPOSE 80

CMD http-server ./pubilc -p 80