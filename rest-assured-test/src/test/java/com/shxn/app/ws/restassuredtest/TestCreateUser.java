package com.shxn.app.ws.restassuredtest;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TestCreateUser {

    private final String CONTEXT_PATH="/mobile-app-ws";

    @BeforeEach
    void setUp() throws Exception {
        RestAssured.baseURI="http://localhost";
        RestAssured.port=8080;
    }

    @Test
    final void testCreateUser() {
        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("username", "peter");
        userDetails.put("email", "restAssured@gmail.com");
        userDetails.put("password", "123456Ab");
        userDetails.put("firstName", "Peter");
        userDetails.put("lastName", "Sun");

        Response response = given().
                contentType("application/json").
                accept("application/json").
                body(userDetails).
                when().
                post(CONTEXT_PATH + "/users").
                then().
                statusCode(200).
                contentType("application/json").
                extract().
                response();

        String userId = response.jsonPath().getString("userId");
        assertNotNull(userId);
        assertTrue(userId.length() == 30);
    }
}