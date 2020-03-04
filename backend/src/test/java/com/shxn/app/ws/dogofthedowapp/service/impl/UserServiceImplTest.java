package com.shxn.app.ws.dogofthedowapp.service.impl;

import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import com.shxn.app.ws.dogofthedowapp.io.repositories.UserRepository;
import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class UserServiceImplTest {

    @InjectMocks
    UserServiceImpl userService;

    @Mock
    UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    final void testGetUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(1L);
        userEntity.setUserId("P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ");
        userEntity.setUsername("peter");
        userEntity.setEmail("peter@gmail.com");
        userEntity.setEncryptPassword("$2a$10$TiC5YPmWRmnGdih6NPHvS.Bmm8ziFSt9ZDz9EnsoCR5/xLgJIy68.");
        userEntity.setFirstName("Peter");
        userEntity.setLastName("Sun");
        userEntity.setCreateAt("2020-02-28 00:59:13 PST");
        userEntity.setUpdateAt("2020-02-29 00:59:13 PST");

        when(userRepository.findByEmail(anyString())).thenReturn(userEntity);

        UserDto userDto = userService.getUser("peter@gmail.com");

        assertNotNull(userDto);
        assertEquals("Peter", userDto.getFirstName());
    }

    @Test
    final void testGetUserUsernameNotFoundException() {
        when(userRepository.findByEmail(anyString())).thenReturn(null);

        assertThrows(UsernameNotFoundException.class,
                () -> {
                    userService.getUser("peter@gmail.com");
                }
        );
    }
}