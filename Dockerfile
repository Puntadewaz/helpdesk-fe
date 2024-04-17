FROM node:14-alpine

#Directory
WORKDIR /var/www

#COPY ALL
COPY . .
COPY package*.json ./

#DELETE YARN.LOCK
RUN rm -rf .env
RUN rm -rf yarn.lock

#Build
RUN yarn install
RUN yarn global add serve

#RESIZE PACKAGE NODEJS
RUN yarn build --max_old_space_size=3072

#PORT
EXPOSE 3001

#Start
CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:3001"]