FROM node:14-alpine

#Directory
WORKDIR /var/www

#COPY ALL
COPY . .
COPY package*.json ./

#Build
RUN yarn install
RUN rm -rf yarn.lock
RUN rm -rf node_modules
RUN yarn global add serve
RUN npm ls webpack

#RESIZE PACKAGE NODEJS
RUN yarn build

#PORT
EXPOSE 3001

#Start
CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:3001"]