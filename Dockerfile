FROM node:16.20.2

WORKDIR /opt/app

ADD *.json .

RUN npm ci

ADD . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
# TODO - change the location of static files. For docker work