FROM node:11

# Setup files
WORKDIR /home/node/app
COPY . /home/node/app

# Install, bundle & launch
EXPOSE 80
CMD npm install && npm run server
