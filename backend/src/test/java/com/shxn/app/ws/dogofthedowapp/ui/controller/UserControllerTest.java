package com.shxn.app.ws.dogofthedowapp.ui.controller;

import com.shxn.app.ws.dogofthedowapp.service.impl.UserServiceImpl;
import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import com.shxn.app.ws.dogofthedowapp.ui.model.response.UserRest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class UserControllerTest {

    @InjectMocks
    UserController userController;

    @Mock
    UserServiceImpl userService;

    UserDto userDto;

    String userId = "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ";
    String encryptedPassword = "$2a$10$TiC5YPmWRmnGdih6NPHvS.Bmm8ziFSt9ZDz9EnsoCR5/xLgJIy68.";
    String dateTimeNow = "2020-02-28 00:59:13 PST";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        userDto = new UserDto();
        userDto.setUserId(userId);
        userDto.setUsername("peter");
        userDto.setEmail("peter@gmail.com");
        userDto.setEncryptedPassword(encryptedPassword);
        userDto.setFirstName("Peter");
        userDto.setLastName("Sun");
        userDto.setCreateAt(dateTimeNow);
        userDto.setUpdateAt("2020-02-29 00:59:13 PST");
    }

    @Test
    final void getUser() {
        when(userService.getUserByUserId(anyString())).thenReturn(userDto);
        UserRest userRest = userController.getUser(userId);
        assertNotNull(userRest);
        assertEquals(userId, userRest.getUserId());
        assertEquals(userDto.getFirstName(), userRest.getFirstName());
        assertEquals(userDto.getLastName(), userRest.getLastName());
    }
}
