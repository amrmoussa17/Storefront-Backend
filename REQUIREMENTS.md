# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

| Endpoint | Request | Parameters | Requires Token | Usage          |
| -------- | ------- | ---------- | -------------- | -------------- |
| **/**    | **GET** | **N/A**    | **False** \*   | **Root Route** |

#### Users:

| Endpoint                   | verb     | Parameters                                   | Requires Token | Usage               |
| -------------------------- | -------- | -------------------------------------------- | -------------- | ------------------- |
| **api/users**              | **GET**  | **N/A**                                      | **True** \*    | **show all Users**  |
| **api/users**              | **POST** | **first_name,last_name,email,user_password** | **False**      | **Create User**     |
| **api/users/:id**          | **GET**  | **id**                                       | **True** \*    | **show user by Id** |
| **api/users/authenticate** | **POST** | **email, password**                          | **False**      | **user login**      |

#### Products:

| Endpoint             | verb     | Parameters              | Requires Token | Usage                  |
| -------------------- | -------- | ----------------------- | -------------- | ---------------------- |
| **api/products**     | **POST** | **product_name, price** | **True** \*    | **Create product**     |
| **api/products**     | **GET**  | **N/A**                 | **False**      | **show all products**  |
| **api/products/:id** | **GET**  | **id**                  | **False**      | **show product by Id** |

#### Orders:

| Endpoint               | Request  | Parameters                         | Requires Token | Usage                         |
| ---------------------- | -------- | ---------------------------------- | -------------- | ----------------------------- |
| **api/orders**         | **POST** | **user_id, order_status**          | **True** \*    | **Create order**              |
| **api/orders/add/**    | **POST** | **order_id, product_id, quantity** | **True** \*    | **Add product to order**      |
| **api/orders/user/id** | **GET**  | **user_id**                        | **True** \*    | **list user's current order** |

- jwt token validation takes place upon user login successfully

## Database Schema

#### User

| Field             | Type             | Special Attributes |
| ----------------- | ---------------- | ------------------ |
| **id**            | **Serial**       | **Primay Key**     |
| **username**      | **Varchar(100)** | **N/A**            |
| **first_name**    | **Varchar(100)** | **N/A**            |
| **last_name**     | **Varchar(100)** | **N/A**            |
| **email**         | **Varchar(100)** | **N/A**            |
| **user_password** | **Varchar(100)** | **N/A**            |

#### Product

| Field            | Type             | Special Attributes |
| ---------------- | ---------------- | ------------------ |
| **id**           | **Serial**       | **Primary Key**    |
| **product_name** | **Varchar(100)** | **N/A**            |
| **price**        | **Integer**      | **N/A**            |

#### Orders

| Field            | Type             | Special Attributes |
| ---------------- | ---------------- | ------------------ |
| **id**           | **Serial**       | **Primary Key**    |
| **user_id**      | **integer**      | **Foreign Key**    |
| **order_status** | **Varchar(100)** | **N/A**            |

#### Orders_Products

| Field          | Type        | Special Attributes |
| -------------- | ----------- | ------------------ |
| **id**         | **Serial**  | **Primary Key**    |
| **order_id**   | **integer** | **Foreign Key**    |
| **product_id** | **integer** | **Foreign Key**    |
| **quantity**   | **Integer** | **N/A**            |
