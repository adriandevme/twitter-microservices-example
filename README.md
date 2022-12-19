# Twitter Microservices Example

Ejemplo de solución a través de microservicios utilizando la [API stream de Twitter](https://developer.twitter.com/en/docs/tutorials/stream-tweets-in-real-time). Esta aplicacion utiliza Kafka como sistema de mensajeria para almacenar todos los 'twits' recibidos a través de un stream en tiempo real (producer) y los almacena en una base de datos (consumer). Ambos servicios están implementados en NodeJS con Typescript.

## Quickstart

```bash
# Copia el fichero .env y editar las variables necesarias (Twiter API Token, user/pass de MongoDB, etc.)
mv ./.env.sample ./.env

# Build imagenes Docker de los servicios consumer y producer
docker build --pull --rm -f "services/consumer/Dockerfile" -t twitter-microservices-example-consumer:latest "services/consumer"
docker build --pull --rm -f "services/producer/Dockerfile" -t twitter-microservices-example-producer:latest "services/producer"

# Ejecuta docker-compose para ejecutar todos los servicios
docker compose -f "docker-compose.yml" up -d --build
```

## About

La solución hace uso de diferentes imagenes Docker por cada microservicio:

- **zoo**: Servicio Zookeper para la gestión de Kafka.
- **kafka**: Servicio de Kafka.
- **kafka-init**: Servicio que actua como "init container" para inicializar el topic de Kafka.
- **mongo**: Servicio de la base de datos de MongoDB.
- **producer**: Servicio que actua como "producer", iniciando un stream de la API Twitter y enviando a Kafka los mensajes.
- **consumer**: Servicio que actua como "consumer", leyendo todos los mensajes y almacenandolos en la base de datos de MongoDB.
