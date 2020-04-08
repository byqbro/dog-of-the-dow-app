package com.shxn.app.ws.dogofthedowapp.service;

import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    UserDto createUser(UserDto userDto);
    UserDto getUser(String email);
    UserDto getUserByUserId(String userId);
    UserDto updateUser(String userId, UserDto userDto);
    UserDto requestPasswordUpdate(String userId, UserDto userDto);
    void deleteUser(String userId);
    List<UserDto> getUsers(int page, int limit);
}
