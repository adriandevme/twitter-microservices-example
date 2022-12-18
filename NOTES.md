https://github.com/anthonyhastings/kafka-nodejs-example
https://github.com/PLhery/node-twitter-api-v2
https://github.com/conduktor/kafka-stack-docker-compose

https://github.com/SOHU-Co/kafka-node
https://github.com/tulios/

https://github.com/bschlenk/node-typescript-jest-boilerplate

https://dev.to/talr98/singleton-design-pattern-use-case-with-node-js-typescript-express-js-5ebb

## TODO

- Test basicos
- Dockerize
- Readme

\*\* TODO v2
-- webapp-server
-- api-server

## Docker commands

docker-compose -f zk-single-kafka-single.yml up
docker run --rm --network twitter-microservices-example_default --env-file=./services/producer/.dockerfile.env -p 3001:3001/tcp twittermicroservicesexampleproducer:latest
docker run --rm --network twitter-microservices-example_default --env-file=./services/consumer/.dockerfile.env -p 3001:3001/tcp twittermicroservicesexampleconsumer:latest
