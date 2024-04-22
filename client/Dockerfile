FROM node:20

WORKDIR /app
# COMMENT TESTING

COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
COPY . /app

ARG REACT_APP_HOST_IP_ADDRESS
ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS

# RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]