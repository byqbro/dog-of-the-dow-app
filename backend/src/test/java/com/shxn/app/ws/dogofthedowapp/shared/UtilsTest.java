package com.shxn.app.ws.dogofthedowapp.shared;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class UtilsTest {

    @Autowired
    Utils utils;

    @BeforeEach
    void setUp() {
    }

//    @Test
//    final void testGenerateUserId() {
//        String userId = utils.generateUserId(Utils.PUBLIC_USER_ID_LEN);
//        String userId2 = utils.generateUserId(Utils.PUBLIC_USER_ID_LEN);
//
//        assertNotNull(userId);
//        assertNotNull(userId2);
//
//        assertTrue(userId.length() == Utils.PUBLIC_USER_ID_LEN);
//        assertTrue(userId2.length() == Utils.PUBLIC_USER_ID_LEN);
//        assertFalse(userId.equalsIgnoreCase(userId2));
//    }
}
