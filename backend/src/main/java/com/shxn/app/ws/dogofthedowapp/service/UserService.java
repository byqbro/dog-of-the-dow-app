package com.shxn.app.ws.dogofthedowapp.service;

import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    UserDto createUser(UserDto userDto);
    UserDto getUser(String email);
}
