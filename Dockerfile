FROM node:12.13.0
RUN mkdir -p /usr/src/app
# Create app directory
WORKDIR /

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /

RUN npm install

# Bundle app source
COPY . /

RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]