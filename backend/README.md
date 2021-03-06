# API Design

* Admin API
    * [Login](#login-admin)
    * [Manage users](#manage-users)
        * [Get all users' information](#get-all-users'-information)
        * [Update a specific user's setting](#update-a-specific-user's-setting)
        * [Update a specific user's password](#update-a-specific-user's-password)
        * [Delete a user](#delete-a-user)
        
* User API
    * [Register](#register)
    * [Login](#login-user)
    * [Setting](#get-setting)
        * [Get Setting(get user's information)](#get-setting)
        * [Update Setting(change password, name, etc..)](#update-setting)
        * [Update Password(change/update the password)](#update-password)
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
            "encryptedPassword": "$2a$10$wI2C7sJjPGmkUAwUT9kuaOZ7qCztTM47lYKT5G1sM9avbdvyaR6Ly",
            "firstName": "Peter",
            "lastName": "Sun",
            "createAt": "some date",
            "updateAt": "some date"
        },
        {
            "userId": "wMmlY8M52TAfr2xWpnkSLrwj19MoSi",
            "username": "peter2",
            "email": "peter2@gamil.com",
            "encryptedPassword": "$2a$10$IZ.HssE.LX9AdNoCQD0b.eAxivRb8sqjhbfG.HR8kAVP1kRF4g7XS",
            "firstName": "Peter2",
            "lastName": "Sun2",
            "createAt": "some date",
            "updateAt": "some date"
        },
        {
            "userId": "OHcFr1TMJp9jKLegwV6NZxgVp6xHjR",
            "username": "peter3",
            "email": "peter3@gamil.com",
            "encryptedPassword": "$2a$10$1f8p/U95LfYvwe9vPYFH1uwt2gz5eSRF6RF3blS3oBnVyGU/.NQgW",
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
        "firstName": "Peter1",
        "lastName": "Sun1"
    }

*Response(Success):*

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "username": "peter",
        "email": "peter@gmail.com",
        "encryptedPassword": "$2a$10$wI2C7sJjPGmkUAwUT9kuaOZ7qCztTM47lYKT5G1sM9avbdvyaR6Ly",
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
    
### 3. Update a specific user's password(update/reset the password) <a name="update-a-specific-user's-password"></a>

**Request:	`PUT /mobile-app-ws/users/{userId}/password-update`**

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
email        | String        | Required            | email
password     | String        | Required            | password 

Example:    /mobile-app-ws/users/P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ/password-update

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body:*

    {
        "email": "peter@gmail.com",
        "password": "123456",
    }

*Response(Success):*

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "username": "peter",
        "email": "peter@gmail.com",
        "encryptedPassword": "$2a$10$63Gt/RrFBRGkiUO3g3O9MerP2Dl.ZdRy6Vx42gNlWxIZclbWruqHq",
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
    
### 4. Delete a user <a name="delete-a-user"></a>

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
        "encryptedPassword": "$2a$10$wI2C7sJjPGmkUAwUT9kuaOZ7qCztTM47lYKT5G1sM9avbdvyaR6Ly",
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
        "encryptedPassword": "$2a$10$wI2C7sJjPGmkUAwUT9kuaOZ7qCztTM47lYKT5G1sM9avbdvyaR6Ly",
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

### 4. Update Setting(username, name, etc..) <a name="update-setting"></a>

**Request:	`PUT /mobile-app-ws/users/{userId}`**

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
username     | String        | Required            | username
email        | String        | Required            | email
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
        "firstName": "Peter1",
        "lastName": "Sun1"
    }

*Response(Success):*

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "username": "peter",
        "email": "peter@gmail.com",
        "encryptedPassword": "$2a$10$wI2C7sJjPGmkUAwUT9kuaOZ7qCztTM47lYKT5G1sM9avbdvyaR6Ly",
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
    
### 5. Update Password(change/update the password) <a name="update-password"></a>

**Request:	`PUT /mobile-app-ws/users/{userId}/password-update`**

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
email        | String        | Required            | email
password     | String        | Required            | password 

Example:    /mobile-app-ws/users/P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ/password-update

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body:*

    {
        "email": "peter@gmail.com",
        "password": "123456",
    }

*Response(Success):*

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "username": "peter",
        "email": "peter@gmail.com",
        "encryptedPassword": "$2a$10$63Gt/RrFBRGkiUO3g3O9MerP2Dl.ZdRy6Vx42gNlWxIZclbWruqHq",
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
            "buyOrSell": "Buy",
            "price": 321.55,
            "amount": 100,
            "currency": "USD",
            "createAt": "some date"
        },
        {
            "transactionId": "EpWsrbfPVS0kaaE2N1c2yfyHjEiBMb1qkguOwhiP",
            "stockSymbol": "BA",
            "stockName": "Boeing Co",
            "buyOrSell": "Buy",
            "price": 344.67,
            "amount": 100,
            "currency": "USD",
            "createAt": "some date"
        },
        {
            "transactionId": "OfklBwqnggtMF0q4at7ph0dTyDeN1CpYsa1B4L8f",
            "stockSymbol": "AAPL",
            "stockName": "Apple Inc",
            "buyOrSell": "Sell",
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

*Buy a stock*

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
userId       | String        | Required            | userId
stockSymbol  | String        | Required            | stock symbol
stockName    | String        | Required            | stock name
buyOrSell    | String        | Required            | Buy or Sell(should be capital B or S)
price        | double        | Required            | buy price
amount       | double        | Required            | buy amount
currency     | String        | Required            | currency

*Sell a stock*

Parameters   | Data Type     | Required / Optional | Description / Requirement
------------ | ------------- | ------------------- | -------------------------
userId       | String        | Required            | userId
stockSymbol  | String        | Required            | stock symbol
stockName    | String        | Required            | stock name
buyOrSell    | String        | Required            | Buy or Sell(should be capital B or S)
price        | double        | Required            | sell price
amount       | double        | Required            | sell amount
currency     | String        | Required            | currency

Example:    /mobile-app-ws/users/transactions

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Request body(Buy):*

    {
        "userId": "tpThhQkkXC9mSv5VmPPKdtdqRCA9qc",
        "stockSymbol": "AAPL",
        "stockName": "Apple Inc",
        "buyOrSell": "Buy",
        "price": 321.55,
        "amount": 100,
        "currency": "USD"
    }

*Response(Success):*

    {
        "transactionId": "nYY6THQesYHvtHSRkPVz5yEne6mJyvVhjlwn9JIo",
        "stockSymbol": "AAPL",
        "stockName": "Apple Inc",
        "buyOrSell": "Buy",
        "price": 321.55,
        "amount": 100,
        "currency": "USD",
        "createAt": "some date"
    }

*Request body(Sell):*

    {
        "userId": "tpThhQkkXC9mSv5VmPPKdtdqRCA9qc",
        "stockSymbol": "AAPL",
        "stockName": "Apple Inc",
        "buyOrSell": "Sell",
        "price": 421.55,
        "amount": 50,
        "currency": "USD"
    }

*Response(Success):*

    {
        "transactionId": "sR4rhzRkJTzPRzzLxnGOHXg9DKQXYfoAm0Izd8QF",
        "stockSymbol": "AAPL",
        "stockName": "Apple Inc",
        "buyOrSell": "Sell",
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

**Request:	`GET /mobile-app-ws/users/{userId}/portfolio`**

Example:    /mobile-app-ws/users/P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ/portfolio

    headers: {
        "Authorization" : "Bearer <jwt token>"
    }

*Response(Success):*

totalTransactionsValue = ∑stock((amount * sellPrice) - (amount * buyPrice))

    {
        "userId": "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ",
        "stockInfoList": [
            {
                "symbol": "AAPL",
                "amount": 100
            },
            {
                "symbol": "BA",
                "amount": 100
            }
        ],
        "totalTransactionsValue": -11077.5
    }

*Response(Fail):*

    {
        "timestamp": "xxxxx",
        "error": "error message"
    }
    
    
## Troubleshooting/Issue

1. If you are using H2 In-Memory Database for development, try to use `<version>1.4.19X</version>`. 
And for JDBC URL, try to use: jdbc:h2:mem:testdb <br />
Otherwise may meet some errors like:<br />
*`"A file path that is implicitly relative to the current working directory is not allowed in the database 
URL "jdbc:h2:test". Use an absolute path, ~/name, ./name, or the baseDir setting instead. [90011-182] 90011/90011".`*<br />
Or *`Database not found, and IFEXISTS=true, so we cant auto-create it`*


2. If you are using H2 In-Memory Database for development, add the following code in WebSecurity file:


    in configure(HttpSecurity http) method add:
    http.headers().frameOptions().disable();

also add the following code in application.properties file:

    spring.h2.console.enabled=true

3. On the server side, set the response header attribute as capital words.<br />
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
        
