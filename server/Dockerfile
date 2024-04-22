FROM node:20
# COMMENT TESTING

WORKDIR /app/server
COPY ./package*.json /app
COPY ./package-lock.json /app

RUN npm install
COPY . /app


# RUN npm run build
EXPOSE 8000

CMD ["npm", "run", "dev"]