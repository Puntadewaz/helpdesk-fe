FROM node:14-alpine

#Directory
RUN mkdir -p /usr/src/app
# WORKDIR /var/www
WORKDIR /usr/src/app

#COPY ALL
COPY . .

#Build
RUN yarn global add serve
RUN yarn install
RUN rm -rf yarn.lock

#RESIZE PACKAGE NODEJS
RUN yarn build

#PORT
EXPOSE 3000

#Start
CMD ["serve", "-s", "-l", "3000", "./build"]