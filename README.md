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

## Manual test

### Create customer:
```bash
curl --location 'localhost:3000/customers' \
--header 'Content-Type: application/json' \
--header 'x-api-key: partner_key_test' \
--data-raw '{
    "input": {
        "email": "alex@gmail.com",
        "name": "Alexis Sanchez"
    }
}'
```

### Get customer
```bash
curl --location 'localhost:3000/customers/c5e23f40-37a2-41d7-91ed-5211a9d6135f' \
--header 'x-api-key: partner_key_test'
```

### Batch create claims (change customerId to appropriate value in your DB):
```bash
curl --location 'localhost:3000/claims' \
--header 'Content-Type: application/json' \
--data '{
    "input": [
        {
            "title": "claim1",
            "description": "Broken baggage",
            "customerId": "c5e23f40-37a2-41d7-91ed-5211a9d6135f",
            "pointValue": 4
        },
        {
            "title": "claim2",
            "description": "Delayed flight",
            "customerId": "c5e23f40-37a2-41d7-91ed-5211a9d6135f",
            "pointValue": 14
        },
        {
            "title": "claim3",
            "description": "Stolen car",
            "customerId": "c5e23f40-37a2-41d7-91ed-5211a9d6135f",
            "pointValue": 64
        }
    ]
}'
```
