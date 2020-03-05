package com.shxn.app.ws.dogofthedowapp.service.impl;

import com.shxn.app.ws.dogofthedowapp.exceptions.UserServiceException;
import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import com.shxn.app.ws.dogofthedowapp.io.repositories.UserRepository;
import com.shxn.app.ws.dogofthedowapp.shared.Utils;
import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @InjectMocks
    UserServiceImpl userService;

    @Mock
    UserRepository userRepository;

    @Mock
    Utils utils;

    @Mock
    BCryptPasswordEncoder bCryptPasswordEncoder;

    String userId = "P8qmI1I2YfGL0ru4a0Yd0IuQXQx4XQ";
    String encryptedPassword = "$2a$10$TiC5YPmWRmnGdih6NPHvS.Bmm8ziFSt9ZDz9EnsoCR5/xLgJIy68.";
    String dateTimeNow = "2020-02-28 00:59:13 PST";

    UserEntity userEntity;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        userEntity = new UserEntity();
        userEntity.setId(1L);
        userEntity.setUserId(userId);
        userEntity.setUsername("peter");
        userEntity.setEmail("peter@gmail.com");
        userEntity.setEncryptedPassword(encryptedPassword);
        userEntity.setFirstName("Peter");
        userEntity.setLastName("Sun");
        userEntity.setCreateAt(dateTimeNow);
        userEntity.setUpdateAt("2020-02-29 00:59:13 PST");
    }

    @Test
    final void testGetUser() {


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

    @Test
    final void testCreateUserServiceException() {
        when(userRepository.findByEmail(anyString())).thenReturn(userEntity);
        UserDto userDto = new UserDto();
        userDto.setUsername("peter");
        userDto.setEmail("peter@gmail.com");
        userDto.setPassword("123456Ab");
        userDto.setFirstName("Peter");
        userDto.setLastName("Sun");

        assertThrows(UserServiceException.class,
                () -> {
                    userService.createUser(userDto);
                }
        );
    }

    @Test
    final void testCreateUser() {
        when(userRepository.findByEmail(anyString())).thenReturn(null);
        when(utils.generateUserId(anyInt())).thenReturn(userId);
        when(utils.generateDateTimeNow()).thenReturn(dateTimeNow);
        when(bCryptPasswordEncoder.encode(anyString())).thenReturn(encryptedPassword);
        when(userRepository.save(any(UserEntity.class))).thenReturn(userEntity);

        UserDto userDto = new UserDto();
        userDto.setUsername("peter");
        userDto.setEmail("peter@gmail.com");
        userDto.setPassword("123456Ab");
        userDto.setFirstName("Peter");
        userDto.setLastName("Sun");

        UserDto storedUserDetails = userService.createUser(userDto);
        assertNotNull(storedUserDetails);
        assertEquals(userEntity.getFirstName(), storedUserDetails.getFirstName());
        assertEquals(userEntity.getLastName(), storedUserDetails.getLastName());
        assertNotNull(storedUserDetails.getUserId());
        verify(bCryptPasswordEncoder, times(1)).encode("123456Ab");
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }

}