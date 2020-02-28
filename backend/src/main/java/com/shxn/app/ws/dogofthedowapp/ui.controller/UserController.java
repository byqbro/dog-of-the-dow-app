package com.shxn.app.ws.dogofthedowapp.ui.controller;

import com.shxn.app.ws.dogofthedowapp.exceptions.UserServiceException;
import com.shxn.app.ws.dogofthedowapp.service.UserService;
import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import com.shxn.app.ws.dogofthedowapp.ui.model.request.UserDetailsRequestModel;
import com.shxn.app.ws.dogofthedowapp.ui.model.response.ErrorMessages;
import com.shxn.app.ws.dogofthedowapp.ui.model.response.UserRest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user") // http://localhost:8080/user
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "/{id}")
    public UserRest getUser(@PathVariable String id) {
        UserRest returnValue = new UserRest();

        UserDto userDto = userService.getUserByUserId(id);
        BeanUtils.copyProperties(userDto, returnValue);

        return returnValue;
    }

    @PostMapping
    public UserRest createUser(@RequestBody UserDetailsRequestModel userDetails) throws Exception {
        UserRest returnValue = new UserRest();

        if (userDetails.getEmail().isEmpty()) {
            throw new UserServiceException(ErrorMessages.MISSING_REQUIRED_FIELD.getErrorMessage());
        }

        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userDetails, userDto);

        UserDto createUser = userService.createUser(userDto);
        BeanUtils.copyProperties(createUser, returnValue);

        return returnValue;
    }

    @PutMapping
    public String updateUser() {
        return "update user was called";
    }

    @DeleteMapping
    public String deleteUser() {
        return "delete user was called";
    }
}
