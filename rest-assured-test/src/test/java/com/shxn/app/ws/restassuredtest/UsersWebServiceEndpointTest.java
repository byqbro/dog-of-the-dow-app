package com.shxn.app.ws.restassuredtest;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.*;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class) // run test in some order
class UsersWebServiceEndpointTest {

    private final String CONTEXT_PATH = "/mobile-app-ws";
    private final String EMAIL_ADDRESS = "restAssured@gmail.com";
    private final String JSON = "application/json";
    private static String authorizationHeader;
    private static String userId;

    @BeforeEach
    void setUp() throws Exception {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 8080;
    }

    @Test
    @Order(1)
    final void testUserLogin() {
        Map<String, String> loginDetails = new HashMap<>();
        loginDetails.put("email", EMAIL_ADDRESS);
        loginDetails.put("password", "123456Ab");

        Response response = given().
                contentType(JSON).
                accept(JSON).
                body(loginDetails).
                when().
                post(CONTEXT_PATH + "/users/login").
                then().
                statusCode(200).extract().response();

        authorizationHeader = response.header("Authorization");
        userId = response.header("UserId");

        assertNotNull(authorizationHeader);
        assertNotNull(userId);
    }

    @Test
    @Order(2)
    final void testGetUserDetails() {
        Response response = given()
                .pathParam("id", userId)
                .header("Authorization", authorizationHeader)
                .accept(JSON)
                .when()
                .get(CONTEXT_PATH + "/users/{id}")
                .then()
                .statusCode(200)
                .contentType(JSON)
                .extract()
                .response();

        String userPublicId = response.jsonPath().getString("userId");
        String userEmail = response.jsonPath().getString("email");
        String encryptedPassword = response.jsonPath().getString("encryptedPassword");
        String firstName = response.jsonPath().getString("firstName");
        String lastName = response.jsonPath().getString("lastName");
        String createAt = response.jsonPath().getString("createAt");
        String updateAt = response.jsonPath().getString("updateAt");

        assertNotNull(userPublicId);
        assertNotNull(userEmail);
        assertNotNull(encryptedPassword);
        assertNotNull(firstName);
        assertNotNull(lastName);
        assertNotNull(createAt);
        assertNotNull(updateAt);
        assertEquals(EMAIL_ADDRESS, userEmail);
    }

    @Test
    @Order(3)
    final void testUpdateUser() {
        Map<String, Object> userDetails = new HashMap<>();

        userDetails.put("username", "peter");
        userDetails.put("email", "restAssured@gmail.com");
        userDetails.put("firstName", "Peter1");
        userDetails.put("lastName", "Sun1");

        Response response = given()
                .contentType(JSON)
                .accept(JSON)
                .header("Authorization", authorizationHeader)
                .pathParam("id", userId)
                .body(userDetails)
                .when()
                .put(CONTEXT_PATH + "/users/{id}")
                .then()
                .statusCode(200)
                .contentType(JSON)
                .extract()
                .response();

        String firstName = response.jsonPath().getString("firstName");
        String lastName = response.jsonPath().getString("lastName");
        assertEquals("Peter1", firstName);
        assertEquals("Sun1", lastName);
    }

    /**
     * only admin can delete user, so the jwt should be admin's jwt
     */
    @Test
    @Order(4)
    @Disabled
    final void testDeleteUser() {
        Response response = given()
                .header("Authorization", authorizationHeader)
                .accept(JSON)
                .pathParam("id", userId)
                .when()
                .delete(CONTEXT_PATH + "/users/{id}")
                .then()
                .statusCode(200)
                .contentType(JSON)
                .extract()
                .response();

        String operationResult = response.jsonPath().getString("operationResult");
        assertEquals("SUCCESS", operationResult);
    }

}