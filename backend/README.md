# API Design

* Admin API
    * [Login](#login-admin)
    * [Manage users](#manage-users)
        * [Get all users' information](#get-all-users'-information)
        * [Update a specific user's setting](#update-a-specific-user's-setting)
        * [Delete a user](#delete-a-user)
        
* User API
    * [Register](#register)
    * [Login](#login-user)
    * [Setting](#get-setting)
        * [Get Setting(get user's information)](#get-setting)
        * [Update Setting(change password, name, etc..)](#update-setting)
    * [Transactions](#transactions)
        * [Get all the transactions](#get-all-the-transactions)
        * [Make a transaction](#make-a-transaction)
    * [Portfolio](#portfolio)
        * [Get a user's portfolio](#get-a-user's-portfolio)

## Admin API

### Login <a name="login-admin"></a>

**Request:	`POST admin/login`**

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
email        | String        | Required            | email 
password     | String        | Required            | password 
    

Example:

*Request body:*

    {
        "email": "peter@gmail.com",
        "password": "123456Ab"
    }

*Response(Success):*

    {
        "admin": {
            "adminId": "1",
            "username": "admin",
            "email": "peter@gmail.com",
            "password": "123456Ab",
            "firstName": "peter",
            "lastName": "sun",
            "createAt": "some date",
            "updateAt": "some date"
        },
        "token": "xxxx",
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }
    
------

## Manage users

### 1. Get all users' information <a name="get-all-users'-information"></a>

**Request:	`GET admin/users`**

Example: admin/users

    header: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    {
        "users": [
            {
                "userId": "1",
                "username": "peter",
                "email": "peter@gmail.com",
                "password": "123456Ab",
                "firstName": "peter",
                "lastName": "sun",
                "createAt": "some date",
                "updateAt": "some date",
                "token": "xxxx"
            },
            {
                "userId": "2",
                "username": "peter2",
                "email": "peter2@gamil.com",
                "password": "123456Ab",
                "firstName": "peter2",
                "lastName": "sun2",
                "createAt": "some date",
                "updateAt": "some date",
                "token": "xxxx"
            },
            {
                "userId": "3",
                "username": "peter3",
                "email": "peter3@gamil.com",
                "password": "123456Ab",
                "firstName": "peter3",
                "lastName": "sun3",
                "createAt": "some date",
                "updateAt": "some date",
                "token": "xxxx"
            }
        ],
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }

### 2. Update a specific user's setting <a name="update-a-specific-user's-setting"></a>

**Request:	`PUT admin/users/{userId}`**

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
username     | String        | Required            | username
email        | String        | Required            | email
password     | String        | Required            | password
firstName    | String        | Required            | first name
lastName     | String        | Required            | last name

Example:

    header: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body:*

    {
        "username": "peter",
        "email": "peter@gmail.com",
        "password": "123456Abbb",
        "firstName": "peter1",
        "lastName": "sun1"
    }

*Response(Success):*

    {
        "user": {
            "userId": "1",
            "username": "peter",
            "email": "peter@gmail.com",
            "password": "123456Abbb",
            "firstName": "peter1",
            "lastName": "sun1",
            "createAt": "some date",
            "updateAt": "some date"
        },
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }

### 3. Delete a user <a name="delete-a-user"></a>

**Request:	`DELETE admin/users/{userId}`**

Example: admin/users/1

    header: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    {
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }



------

## User API

Authentication(User)

### 1. Register <a name="register"></a>

**Request:	`POST user/register`**

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
username     | String        | Required            | length 6-30, no space, should be unique
email        | String        | Required            | email
password     | String        | Required            | length 8-20, must have upper, lowercase and digits, no space
firstName    | String        | Required            | first name
lastName     | String        | Required            | last name

// would check if meets the requirement

Example:

*Request body:*

    {
        "username": "peter",
        "email": "peter@gmail.com",
        "password": "123456Ab",
        "firstName": "peter",
        "lastName": "sun"
    }

*Response(Success):*

    {
        "user": {
            "userId": "1",
            "username": "peter",
            "email": "peter@gmail.com",
            "password": "123456Ab",
            "firstName": "peter",
            "lastName": "sun",
            "createAt": "some date",
            "updateAt": "some date"
        },
        "token": "xxxx",
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }

### 2. Login <a name="login-user"></a>

**Request:	`POST user/login`**

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
email        | String        | Required            | email 
password     | String        | Required            | password 

Example:

*Request body:*

    {
        "email": "peter@gmail.com",
        "password": "123456Ab"
    }

*Response(Success):*

    {
        "user": {
            "userId": "1",
            "username": "peter",
            "email": "peter@gmail.com",
            "password": "123456Ab",
            "firstName": "peter",
            "lastName": "sun",
            "createAt": "some date",
            "updateAt": "some date"
        },
        "token": "xxxx",
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }

### 3. Get Setting(get user's information) <a name="get-setting"></a>

**Request:	`GET user/{userId}`**

Example: user/1

    header: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    {
        "user": {
            "userId": "1",
            "username": "peter",
            "email": "peter@gmail.com",
            "password": "123456Ab",
            "firstName": "peter",
            "lastName": "sun",
            "createAt": "some date",
            "updateAt": "some date"
        },
        "status": "success",
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }

### 4. Update Setting(change password, name, etc..) <a name="update-setting"></a>

**Request:	`PUT user/{userId}`**


Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
username     | String        | Required            | username
email        | String        | Required            | email
password     | String        | Required            | password
firstName    | String        | Required            | first name
lastName     | String        | Required            | last name

Example:

    header: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body:*

    {
        "username": "peter",
        "email": "peter@gmail.com",
        "password": "123456Abbb",
        "firstName": "peter1",
        "lastName": "sun1"
    }

*Response(Success):*

    {
        "user": {
            "userId": "1",
            "username": "peter",
            "email": "peter@gmail.com",
            "password": "123456Abbb",
            "firstName": "peter1",
            "lastName": "sun1",
            "createAt": "some date",
            "updateAt": "some date"
        },
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }
    
------

## Transactions

### 1. Get all the transactions <a name="get-all-the-transactions"></a>

**Request:	`GET user/{userId}/transactions`**

Example: user/1/transactions

    header: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    {
        "transactions": [
            {
                "userId": "1",
                "transactionId": "1",
                "stock_symbol": "AAPL",
                "stock_name": "Apple Inc",
                "buy_or_sell": "buy",
                "buy_price": 321.55,
                "buy_amount": 100,
                "currency": "USD",
                "createAt": "some date"
            },
            {
                "userId": "1",
                "transactionId": "2",
                "stock_symbol": "BA",
                "stock_name": "Boeing Co",
                "buy_or_sell": "buy",
                "buy_price": 344.67,
                "buy_amount": 100,
                "currency": "USD",
                "createAt": "some date"
            },
            {
                "userId": "1",
                "transactionId": "3",
                "stock_symbol": "AAPL",
                "stock_name": "Apple Inc",
                "buy_or_sell": "sell",
                "sell_price": 326.55,
                "sell_amount": 50,
                "currency": "USD",
                "createAt": "some date"
            }
        ],
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }

### 2. Make a transaction <a name="make-a-transaction"></a>

**Request:	`POST user/{userId}/transactions`**

*buy a stock*

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
stock_symbol | String        | Required            | stock_symbol
stock_name   | String        | Required            | stock_name
buy_or_sell  | String        | Required            | buy or sell
buy_price    | Double        | Required            | buy_price
buy_amount   | Double        | Required            | buy_amount
currency     | String        | Required            | currency

*sell a stock*

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
stock_symbol | String        | Required            | stock_symbol
stock_name   | String        | Required            | stock_name
buy_or_sell  | String        | Required            | buy or sell
sell_price   | Double        | Required            | sell_price
sell_amount  | Double        | Required            | sell_amount
currency     | String        | Required            | currency

Example: user/1/transactions

    header: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body(buy):*

    {
        "stock_symbol": "AAPL",
        "stock_name": "Apple Inc",
        "buy_or_sell": "buy",
        "buy_price": 321.55,
        "buy_amount": 100,
        "currency": "USD"
    }

*Response(Success):*

    {
        "transaction": {
            "userId": "1",
            "transactionId": "1",
            "stock_symbol": "AAPL",
            "stock_name": "Apple Inc",
            "buy_or_sell": "buy",
            "buy_price": 321.55,
            "buy_amount": 100,
            "currency": "USD",
            "createAt": "some date"
        },
        "status": "success"
    }

*Request body(sell):*

    {
        "stock_symbol": "AAPL",
        "stock_name": "Apple Inc",
        "buy_or_sell": "sell",
        "sell_price": 326.55,
        "sell_amount": 50,
        "currency": "USD"
    }

*Response(Success):*

    {
        "transaction": {
            "userId": "1",
            "transactionId": "3",
            "stock_symbol": "AAPL",
            "stock_name": "Apple Inc",
            "buy_or_sell": "sell",
            "sell_price": 326.55,
            "sell_amount": 50,
            "currency": "USD",
            "createAt": "some date"
        },
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }

------

## Portfolio

### 1. Get a user's portfolio <a name="get-a-user's-portfolio"></a>

**Request:	`GET user/{userId}/portfolio`**

Example: user/1/portfolio

    header: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    {
        "user": {
            "userId": "1",
            "username": "peter",
            "email": "peter@gmail.com",
            "password": "123456Ab",
            "firstName": "peter",
            "lastName": "sun",
            "createAt": "some date",
            "updateAt": "some date"
        },
        "portfolio": [
            {
                "stock_symbol": "AAPL",
                "stock_name": "Apple Inc",
                "amount": 100
            },
            {
                "stock_symbol": "BA",
                "stock_name": "Boeing Co",
                "amount": 100
            }
        ],
        "status": "success"
    }

*Response(Fail):*

    {
        "error": "error message",
        "status": "fail"
    }
