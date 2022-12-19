# Twitter Microservices Example

## Quickstart

```bash
# Build imagenes Docker de los servicios consumer y producer
docker build --pull --rm -f "services/consumer/Dockerfile" -t twittermicroservicesexampleconsumer:latest "services/consumer"
docker build --pull --rm -f "services/producer/Dockerfile" -t twittermicroservicesexampleproducer:latest "services/producer"

# Ejecuta docker-compose para ejecutar todos los servicios
docker compose -f "docker-compose.yml" up -d --build
```

## Stack

- nodejs
- kafka
- twitter
- mongodb
- docker

## Services

- zookeper
- kafka
- database (mongodb)
- producer (twitter->kafka)
- consumer (kafka->mongodb)
