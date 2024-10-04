## To run project

```bash
$ npm install
$ docker-compose up -d
```

Api is available at port 3000
Postgres DB is available at port 5000

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## .Env for testing

```bash
DATABASE_URL = "postgresql://postgres:postgres@localhost:5000/korint?schema=public"
PARTNER_KEY = partner_key_test
```
