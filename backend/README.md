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
        
* Troubleshooting/Issue

## Admin API

### Login <a name="login-admin"></a>

**Request:	`POST /mobile-app-ws/users/login`** <br>
different roles have different Authorities but will use the same endpoint

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
email        | String        | Required            | email 
password     | String        | Required            | password 
    

Example:

*Request body:*

    {
        "email": "admin@admin.com",
        "password": "123456Ab"
    }

*Response(Success):*

    // response in Postman
    headers: {
        "Authorization" : "Bearer <jwt token>",
        "UserId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ"
    }
    
    // response in browser
    headers": {
        "authorization": "Bearer <jwt token>",
        "userid": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ"
    }

*Response(Fail):*

    will get 403 Forbidden status
    
------

## Manage users

### 1. Get all users' information <a name="get-all-users'-information"></a>
**Request:	`GET /mobile-app-ws/users`**
will response all the users in the database in one response

**Request:	`GET /mobile-app-ws/users?page={int}&limit={int}`**
will response a number of users in the database in one response
    
    value = "page", defaultValue = "0"
    value = "limit", defaultValue = "25"

Example:    /mobile-app-ws/users?page=0&limit=3

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    [
        {
            "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
            "username": "peter",
            "email": "peter@gmail.com",
            "firstName": "Peter",
            "lastName": "Sun",
            "createAt": "some date",
            "updateAt": "some date"
        },
        {
            "userId": "wMmlY8M52TAfr2xWpnkSLrwj19MoSi",
            "username": "peter2",
            "email": "peter2@gamil.com",
            "firstName": "Peter2",
            "lastName": "Sun2",
            "createAt": "some date",
            "updateAt": "some date"
        },
        {
            "userId": "OHcFr1TMJp9jKLegwV6NZxgVp6xHjR",
            "username": "peter3",
            "email": "peter3@gamil.com",
            "firstName": "Peter3",
            "lastName": "Sun3",
            "createAt": "some date",
            "updateAt": "some date"
        }
    ]

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }

### 2. Update a specific user's setting <a name="update-a-specific-user's-setting"></a>

**Request:	`PUT /mobile-app-ws/users/{userId}`**

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
username     | String        | Required            | username
email        | String        | Required            | email
password     | String        | Required            | password
firstName    | String        | Required            | first name
lastName     | String        | Required            | last name

Example:    /mobile-app-ws/users/P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body:*

    {
        "username": "peter",
        "email": "peter@gmail.com",
        "password": "123456Abbb",
        "firstName": "Peter1",
        "lastName": "Sun1"
    }

*Response(Success):*

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "username": "peter",
        "email": "peter@gmail.com",
        "firstName": "Peter1",
        "lastName": "Sun1",
        "createAt": "some date",
        "updateAt": "some date"
    }

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }

### 3. Delete a user <a name="delete-a-user"></a>

**Request:  `DELETE /mobile-app-ws/users/{userId}`**

Example:    /mobile-app-ws/users/P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    {
        "operationResult": "SUCCESS",
        "operationName": "DELETE"
    }

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }



------

## User API

Authentication(User)

### 1. Register <a name="register"></a>

**Request:	`POST /mobile-app-ws/users`**

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
        "firstName": "Peter",
        "lastName": "Sun"
    }

*Response(Success):*

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "username": "peter",
        "email": "peter@gmail.com",
        "firstName": "Peter",
        "lastName": "Sun",
        "createAt": "some date",
        "updateAt": "some date"
    }

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }

### 2. Login <a name="login-user"></a>

**Request:	`POST /mobile-app-ws/users/login`**

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

    // response in Postman
    headers: {
        "Authorization" : "Bearer <jwt token>",
        "UserId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ"
    }
    
    // response in browser
    headers": {
        "authorization": "Bearer <jwt token>",
        "userid": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ"
    }

*Response(Fail):*

    will get 403 Forbidden status

### 3. Get Setting(get user's information) <a name="get-setting"></a>

**Request:	`GET /mobile-app-ws/users/{userId}`**

Example:    /mobile-app-ws/user/P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "username": "peter",
        "email": "peter@gmail.com",
        "firstName": "Peter",
        "lastName": "Sun",
        "createAt": "some date",
        "updateAt": "some date"
    }

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }

### 4. Update Setting(change password, name, etc..) <a name="update-setting"></a>

**Request:	`PUT /mobile-app-ws/users/{userId}`**


Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
username     | String        | Required            | username
email        | String        | Required            | email
password     | String        | Required            | password
firstName    | String        | Required            | first name
lastName     | String        | Required            | last name

Example:    /mobile-app-ws/users/P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body:*

    {
        "username": "peter",
        "email": "peter@gmail.com",
        "password": "123456Abbb",
        "firstName": "Peter1",
        "lastName": "Sun1"
    }

*Response(Success):*

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "username": "peter",
        "email": "peter@gmail.com",
        "firstName": "Peter1",
        "lastName": "Sun1",
        "createAt": "some date",
        "updateAt": "some date"
    }

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }
    
------

## Transactions

### 1. Get all the transactions <a name="get-all-the-transactions"></a>

**Request:	`GET /mobile-app-ws/users/{userId}/transactions`**

Example:    /mobile-app-ws/users/P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ/transactions

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

    [
        {
            "transactionId": "iDwK7FPn9pCaS5FVLkHnCvujzZuwptAUj3bYrfNT",
            "stockSymbol": "AAPL",
            "stockName": "Apple Inc",
            "buyOrSell": "buy",
            "price": 321.55,
            "amount": 100,
            "currency": "USD",
            "createAt": "some date"
        },
        {
            "transactionId": "EpWsrbfPVS0kaaE2N1c2yfyHjEiBMb1qkguOwhiP",
            "stockSymbol": "BA",
            "stockName": "Boeing Co",
            "buyOrSell": "buy",
            "price": 344.67,
            "amount": 100,
            "currency": "USD",
            "createAt": "some date"
        },
        {
            "transactionId": "OfklBwqnggtMF0q4at7ph0dTyDeN1CpYsa1B4L8f",
            "stockSymbol": "AAPL",
            "stockName": "Apple Inc",
            "buyOrSell": "sell",
            "price": 326.55,
            "amount": 50,
            "currency": "USD",
            "createAt": "some date"
        }
    ]

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }

### 2. Make a transaction <a name="make-a-transaction"></a>

**Request:	`POST /mobile-app-ws/users/transactions`**

*buy a stock*

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
userId       | String        | Required            | userId
stockSymbol  | String        | Required            | stock symbol
stockName    | String        | Required            | stock name
buyOrSell    | String        | Required            | buy or sell
price        | double        | Required            | buy price
amount       | double        | Required            | buy amount
currency     | String        | Required            | currency

*sell a stock*

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
userId       | String        | Required            | userId
stockSymbol  | String        | Required            | stock symbol
stockName    | String        | Required            | stock name
buyOrSell    | String        | Required            | buy or sell
price        | double        | Required            | sell price
amount       | double        | Required            | sell amount
currency     | String        | Required            | currency

Example:    /mobile-app-ws/users/transactions

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body(buy):*

    {
        "userId": "tpThhQkkXC9mSv5VmPPKdtdqRCA9qc",
        "stockSymbol": "AAPL",
        "stockName": "Apple Inc",
        "buyOrSell": "buy",
        "price": 321.55,
        "amount": 100,
        "currency": "USD"
    }

*Response(Success):*

    {
        "transactionId": "nYY6THQesYHvtHSRkPVz5yEne6mJyvVhjlwn9JIo",
        "stockSymbol": "AAPL",
        "stockName": "Apple Inc",
        "buyOrSell": "buy",
        "price": 321.55,
        "amount": 100,
        "currency": "USD",
        "createAt": "some date"
    }

*Request body(sell):*

    {
        "userId": "tpThhQkkXC9mSv5VmPPKdtdqRCA9qc",
        "stockSymbol": "AAPL",
        "stockName": "Apple Inc",
        "buyOrSell": "sell",
        "price": 421.55,
        "amount": 50,
        "currency": "USD"
    }

*Response(Success):*

    {
        "transactionId": "sR4rhzRkJTzPRzzLxnGOHXg9DKQXYfoAm0Izd8QF",
        "stockSymbol": "AAPL",
        "stockName": "Apple Inc",
        "buyOrSell": "sell",
        "price": 421.55,
        "amount": 50,
        "currency": "USD",
        "createAt": "some date"
    }

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }

------

## Portfolio

### 1. Get a user's portfolio <a name="get-a-user's-portfolio"></a>

**Request:	`GET /user/{userId}/portfolio`**

Example: /user/1/portfolio

    headers: {
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
        "timestamp": "xxxxx",
        "error": "error message"
    }
    
    
## Troubleshooting/Issue

1. If you are using H2 In-Memory Database for development, try to use `<version>1.4.19X</version>`.
Otherwise may meet some errors like:<br />
*`"A file path that is implicitly relative to the current working directory is not allowed in the database 
URL "jdbc:h2:test". Use an absolute path, ~/name, ./name, or the baseDir setting instead. [90011-182] 90011/90011".`*<br />
Or *`Database not found, and IFEXISTS=true, so we cant auto-create it`*

2. On the server side, set the response header attribute as capital words.<br />
However, when using Postman to test, you will get the response as the same **capital** attribute, while via browser to send request,
you will get response as the **lower case** attribute.

        res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
        res.addHeader("UserId", userDto.getUserId());

        // response in Postman
        headers: {
            "Authorization" : "Bearer <jwt token>",
            "UserId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ"
        }
        
        // response in browser
        headers": {
            "authorization": "Bearer <jwt token>",
            "userid": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ"
        }
        
