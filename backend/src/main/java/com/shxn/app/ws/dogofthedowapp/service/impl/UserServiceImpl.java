package com.shxn.app.ws.dogofthedowapp.service.impl;

import com.shxn.app.ws.dogofthedowapp.UserRepository;
import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import com.shxn.app.ws.dogofthedowapp.service.UserService;
import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto user) {

        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);

        userEntity.setUserId("testUserId");
        userEntity.setEncryptPassword("testEncryptPassword");
        userEntity.setCreateAt("testCreateAt");
        userEntity.setUpdateAt("testUpdateAt");
        userEntity.setToken("testToken");

        UserEntity storeUserDetails = userRepository.save(userEntity);

        UserDto returnValue = new UserDto();
        BeanUtils.copyProperties(storeUserDetails, returnValue);

        return returnValue;
    }
}
