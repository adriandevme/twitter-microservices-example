https://github.com/anthonyhastings/kafka-nodejs-example
https://github.com/PLhery/node-twitter-api-v2
https://github.com/conduktor/kafka-stack-docker-compose

https://github.com/SOHU-Co/kafka-node
https://github.com/tulios/

https://dev.to/talr98/singleton-design-pattern-use-case-with-node-js-typescript-express-js-5ebb

\*\* TODO v2
-- webapp-server
-- api-server

docker-compose -f zk-single-kafka-single.yml up

    "scripts": {
        "test": "npm run build:ts && tsc -p test/tsconfig.json && tap --ts --no-coverage \"test/**/*.test.ts\"",
        "start": "npm run build:ts && node dist/app.js",
        "build:ts": "tsc",
        "watch:ts": "tsc -w",
        "dev": "concurrently -k -p \"[{name}]\" -n \"TypeScript,App\" -c \"yellow.bold,cyan.bold\" \"npm:watch:ts\" \"npm:dev:start\"",
        "dev:start": "nodemon --inspect dist/app.js"
    },
