FROM node:16

WORKDIR /backend

COPY . . 

RUN npm install 

RUN apt-get update

RUN npm install nodemon -g

ENTRYPOINT npm run dev 

EXPOSE 3001