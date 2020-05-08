package com.shxn.app.ws.dogofthedowapp.io.repositories;

import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    static boolean recordsCreated = false;

    String email = "test@gmail.com";
    String userId = "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ";
    String encryptedPassword = "$2a$10$TiC5YPmWRmnGdih6NPHvS.Bmm8ziFSt9ZDz9EnsoCR5/xLgJIy68.";
    String dateTimeNow = "2020-02-28 00:59:13 PST";

    @BeforeEach
    void setUp() throws Exception {
        if (!recordsCreated) {
            createRecords();
        }
    }

    @Test
    final void findByEmail() {
        UserEntity userEntity = userRepository.findByEmail(email);
        assertNotNull(userEntity);
        assertTrue(userEntity.getEmail().equals(email));
    }

    @Test
    final void findByUserId() {
        UserEntity userEntity = userRepository.findByUserId(userId);
        assertNotNull(userEntity);
        assertTrue(userEntity.getUserId().equals(userId));
    }

    private void createRecords() {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null) {
            return;
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(userId);
        userEntity.setUsername("peter");
        userEntity.setEmail(email);
        userEntity.setEncryptedPassword(encryptedPassword);
        userEntity.setFirstName("Peter");
        userEntity.setLastName("Sun");
        userEntity.setCreateAt(dateTimeNow);
        userEntity.setUpdateAt("2020-02-29 00:59:13 PST");

        userRepository.save(userEntity);

        recordsCreated = true;
    }
}
