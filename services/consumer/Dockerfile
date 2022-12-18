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
ENV KAFKA_HOST_URL=${KAFKA_HOST_URL}
ENV KAFKA_TOPIC_NAME=${KAFKA_TOPIC_NAME}
ENV MONGODB_CONNECTION_URI=${MONGODB_CONNECTION_URI}
ENV MONGODB_DATABASE_NAME=${MONGODB_DATABASE_NAME}

EXPOSE 3001
CMD [ "npm", "start" ]