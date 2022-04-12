# Storefront Backend Project

## Used Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## getting started

### database setup

to create database use these queries o psql command line:

```
CREATE DATABASE udacity_store_dev;
```

```
CREATE DATABASE udacity_store_test;
```

### Environment Variables setup

1- first create a .env file and set up the the following Environment variables :-

#### environment

NODE_ENV=dev

#### server config

PORT=3000

#### database config

POSTGRES_HOST=localhost
POSTGRES_PORT=5432 (this is default postgres settings)
POSTGRES_DB=udacity_store_dev
POSTGRES_DB_TEST=udacity_store_test
POSTGRES_USER=postgres (this is default postgres settings)
POSTGRES_PASSWORD=postgres (this is default postgres settings)

- you can change default settings to your customized settings

#### bcrypt config

SALT_ROUNDS=10
BCRYPT_PASSWORD= (whatever password you choose)

#### jsonwebtoken

TOKEN_SECRET= (whatever secret you choose) )

2- to start server use

```
yarn dev
```

2- to run unit tests use

```
yarn test
```
