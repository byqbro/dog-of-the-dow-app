package com.shxn.app.ws.dogofthedowapp.service.impl;

import com.shxn.app.ws.dogofthedowapp.io.repositories.UserRepository;
import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import com.shxn.app.ws.dogofthedowapp.service.UserService;
import com.shxn.app.ws.dogofthedowapp.shared.Utils;
import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceImpl implements UserService {

    private final int PUBLIC_USER_ID_LEN = 30;

    @Autowired
    UserRepository userRepository;

    @Autowired
    Utils utils;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto createUser(UserDto user) {

        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Record already exists");
        }

        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);

        String publicUserId = utils.generateUserId(PUBLIC_USER_ID_LEN);
        userEntity.setUserId(publicUserId);
        userEntity.setEncryptPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userEntity.setCreateAt("testCreateAt");
        userEntity.setUpdateAt("testUpdateAt");
        userEntity.setToken("testToken");

        UserEntity storeUserDetails = userRepository.save(userEntity);

        UserDto returnValue = new UserDto();
        BeanUtils.copyProperties(storeUserDetails, returnValue);

        return returnValue;
    }

    @Override
    public UserDto getUser(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) {
            throw new UsernameNotFoundException(email);
        }

        UserDto returnValue = new UserDto();
        BeanUtils.copyProperties(userEntity, returnValue);
        return returnValue;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) {
            throw new UsernameNotFoundException(email);
        }

        return new User(userEntity.getEmail(), userEntity.getEncryptPassword(), new ArrayList<>());
    }
}
