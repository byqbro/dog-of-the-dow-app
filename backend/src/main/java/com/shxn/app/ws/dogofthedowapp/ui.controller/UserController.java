package com.shxn.app.ws.dogofthedowapp.ui.controller;

import com.shxn.app.ws.dogofthedowapp.exceptions.UserServiceException;
import com.shxn.app.ws.dogofthedowapp.service.TransactionService;
import com.shxn.app.ws.dogofthedowapp.service.UserService;
import com.shxn.app.ws.dogofthedowapp.shared.dto.TransactionDto;
import com.shxn.app.ws.dogofthedowapp.shared.dto.UserDto;
import com.shxn.app.ws.dogofthedowapp.ui.model.request.TransactionRequestModel;
import com.shxn.app.ws.dogofthedowapp.ui.model.request.UserDetailsRequestModel;
import com.shxn.app.ws.dogofthedowapp.ui.model.response.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("users") // http://localhost:8080/mobile-app-ws/users
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    TransactionService transactionService;

    // @PostAuthorize("hasRole('ADMIN') or returnObject.userId == principal.userId")
    @PreAuthorize("hasRole('ADMIN') or #id == principal.userId")
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

        ModelMapper modelMapper = new ModelMapper();
        UserDto userDto = modelMapper.map(userDetails, UserDto.class);

//        UserDto userDto = new UserDto();
//        BeanUtils.copyProperties(userDetails, userDto);

        UserDto createUser = userService.createUser(userDto);
        returnValue = modelMapper.map(createUser, UserRest.class);

        return returnValue;
    }

    @PreAuthorize("hasRole('ADMIN') or #id == principal.userId")
    @PutMapping(path = "/{id}")
    public UserRest updateUser(@PathVariable String id, @RequestBody UserDetailsRequestModel userDetails) {
        UserRest returnValue = new UserRest();

        if (userDetails.getEmail().isEmpty()) {
            throw new UserServiceException(ErrorMessages.MISSING_REQUIRED_FIELD.getErrorMessage());
        }

        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userDetails, userDto);

        UserDto updateUser = userService.updateUser(id, userDto);
        BeanUtils.copyProperties(updateUser, returnValue);

        return returnValue;
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping(path = "/{id}")
    public OperationStatusModel deleteUser(@PathVariable String id) {
        OperationStatusModel returnValue = new OperationStatusModel();
        returnValue.setOperationName(RequestOperationName.DELETE.name());

        userService.deleteUser(id);

        returnValue.setOperationResult(RequestOperationStatus.SUCCESS.name());
        return returnValue;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserRest> getUsers(@RequestParam(value = "page", defaultValue = "0") int page,
                                   @RequestParam(value = "limit", defaultValue = "25") int limit) {
        List<UserRest> returnValue = new ArrayList<>();

        List<UserDto> users = userService.getUsers(page, limit);

		for (UserDto userDto : users) {
			UserRest userModel = new UserRest();
			BeanUtils.copyProperties(userDto, userModel);
			returnValue.add(userModel);
		}

        return returnValue;
    }

    @PostMapping(path = "/transactions")
    public TransactionRest createTransaction(@RequestBody TransactionRequestModel transactionDetails) {
        TransactionRest returnValue = new TransactionRest();

        if (transactionDetails.getUserId().isEmpty()) {
            throw new UserServiceException(ErrorMessages.MISSING_REQUIRED_FIELD.getErrorMessage());
        }

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        TransactionDto transactionDto = modelMapper.map(transactionDetails,TransactionDto.class);

        TransactionDto createTransaction = transactionService.createTransaction(transactionDto);
        BeanUtils.copyProperties(createTransaction, returnValue);

        return returnValue;
    }

    @PreAuthorize("hasRole('ADMIN') or #id == principal.userId")
    @GetMapping(path = "/{id}/transactions")
    public List<TransactionRest> getUserTransactions(@PathVariable String id) {
        List<TransactionRest> returnValue = new ArrayList<>();

        List<TransactionDto> transactionDto = transactionService.getTransactions(id);

        if (transactionDto != null && !transactionDto.isEmpty()) {
            Type listType = new TypeToken<List<TransactionRest>>() {}.getType();
            returnValue = new ModelMapper().map(transactionDto, listType);
        }

        return returnValue;
    }
}
