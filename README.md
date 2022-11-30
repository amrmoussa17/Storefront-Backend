# Storefront Backend Project
> This project is part of Udacity Advanced web development Nano-degree

## Used Technologies

- Node/Express for the application logic.
- Postgres SQL for database.
- dotenv for managing environment variables.
- db-migrate for database migrations.
- bcrypt & jwt for authentication and authorization.
- jasmine for testing.

## Author

👤 **Amr Mamdouh**

- GitHub: [@amrmoussa17](https://github.com/amrmoussa17)
- LinkedIn: [amr-mamdouh-988123125](https://www.linkedin.com/in/amr-mamdouh-988123125)

## Usage & Installation
You can get the project up and running in simple steps.

### 1. App dependencies
```
npm install
```

### 2. Database setup


To create database write these queries using psql command line:

```
CREATE DATABASE udacity_store_dev;
```

```
CREATE DATABASE udacity_store_test;
```

### 3. Environment Variables setup

create a .env file and set up the the following Environment variables :

- #### Environment

NODE_ENV=dev

- #### server config

PORT=3000

- #### database config

POSTGRES_HOST = localhost  
POSTGRES_PORT=5432 (this is default postgres settings)
POSTGRES_DB=udacity_store_dev
POSTGRES_DB_TEST=udacity_store_test
POSTGRES_USER=postgres (this is default postgres settings)
POSTGRES_PASSWORD=postgres (this is default postgres settings)

 > you can change default settings to your customized settings

- #### bcrypt config

SALT_ROUNDS=10
BCRYPT_PASSWORD= (whatever password you choose)

- #### jsonwebtoken

TOKEN_SECRET= (whatever secret you choose) 

### 4. Run server

```
yarn dev
```

### 5. Run unit tests 

```
yarn test
```
### 6. Api Endpoints 
read requirements.md file for further instructions on how to use the api Endpoints.
## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!
