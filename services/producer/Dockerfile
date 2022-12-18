FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Define .env files
ENV HTTP_SERVER_PORT=${HTTP_SERVER_PORT}
ENV TWITTER_API_BEARER_TOKEN=${TWITTER_API_BEARER_TOKEN}
ENV KAFKA_HOST_URL=${KAFKA_HOST_URL}
ENV KAFKA_TOPIC_NAME=${KAFKA_HOST_URL}

EXPOSE 3000
CMD [ "npm", "start" ]