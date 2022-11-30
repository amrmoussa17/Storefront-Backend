
# Image Processing API 

> This project is part of Udacity Advanced web development Nano-degree

## Technologies

NodeJS, Express, Typescript, Jasmine, express-validator, Sharp. 
## Author

👤 **Amr Mamdouh**

- GitHub: [@amrmoussa17](https://github.com/amrmoussa17)
- LinkedIn: [amr-mamdouh-988123125](https://www.linkedin.com/in/amr-mamdouh-988123125)
## Summary
This app is built using an Express server. The URL query strings is used as inputs specifying image filename, width and height for the api. Then the api using Sharp module processes and resizes the image and serves it as a response.

## Usage and Installation

You can get the project up and running in simple steps.

```
npm install
```

Then you can use the following endpoint to process your images.

```
http://localhost:3000/img?filename=[$filename]&width=[$number]&height=[$number]
```
In the filename field type one of the following file names : fjord, encenadaport, icelandwaterfall, palmtunnel, santamonica

to use prettier + eslint

```
npm run lint
```

to test using jasmine

```
npm run test
```
## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!
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
