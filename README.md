# Storefront Backend Project

## Used Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## getting started

1- first create a .env file and set up the following configurations:-

#### environment

NODE_ENV

#### server config

PORT

#### database config

POSTGRES_HOST
POSTGRES_PORT
POSTGRES_DB
POSTGRES_DB_TEST
POSTGRES_USER
POSTGRES_PASSWORD

#### bcrypt config

SALT_ROUNDS
BCRYPT_PASSWORD

#### jsonwebtoken

TOKEN_SECRET

2- to start server use

```
yarn dev
```

2- to run unit tests use

```
yarn test
```
