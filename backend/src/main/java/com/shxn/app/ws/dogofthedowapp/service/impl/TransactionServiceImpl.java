package com.shxn.app.ws.dogofthedowapp.service.impl;

import com.shxn.app.ws.dogofthedowapp.exceptions.UserServiceException;
import com.shxn.app.ws.dogofthedowapp.io.entity.TransactionEntity;
import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import com.shxn.app.ws.dogofthedowapp.io.repositories.TransactionRepository;
import com.shxn.app.ws.dogofthedowapp.io.repositories.UserRepository;
import com.shxn.app.ws.dogofthedowapp.service.TransactionService;
import com.shxn.app.ws.dogofthedowapp.shared.Utils;
import com.shxn.app.ws.dogofthedowapp.shared.dto.TransactionDto;
import com.shxn.app.ws.dogofthedowapp.ui.model.response.ErrorMessages;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final int PUBLIC_TRANSACTION_ID_LEN = 40;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    Utils utils;

    @Override
    public TransactionDto createTransaction(TransactionDto transactionDto) {
        TransactionDto returnValue = new TransactionDto();
        String userId = transactionDto.getUserId();
        UserEntity userEntity = userRepository.findByUserId(userId);

        if (userEntity == null) {
            throw new UserServiceException(ErrorMessages.COULD_NOT_GET_USER_BY_USER_ID.getErrorMessage() + " " + userId);
        }

        TransactionEntity transactionEntity = new TransactionEntity();
        BeanUtils.copyProperties(transactionDto, transactionEntity);

        String publicTransactionId = utils.generateTransactionId(PUBLIC_TRANSACTION_ID_LEN);
        String dateTimeNow = utils.generateDateTimeNow();

        transactionEntity.setTransactionId(publicTransactionId);
        transactionEntity.setCreateAt(dateTimeNow);
        transactionEntity.setUserDetails(userEntity);

        TransactionEntity storeTransactionDetails = transactionRepository.save(transactionEntity);
        BeanUtils.copyProperties(storeTransactionDetails, returnValue);

        return returnValue;
    }

    @Override
    public List<TransactionDto> getTransactions(String userId) {
        List<TransactionDto> returnValue = new ArrayList<>();

        ModelMapper modelMapper = new ModelMapper();

        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) {
            return returnValue;
        }

        Iterable<TransactionEntity> transactions = transactionRepository.findAllByUserDetails(userEntity);
        for (TransactionEntity transactionEntity : transactions) {
            returnValue.add(modelMapper.map(transactionEntity, TransactionDto.class));
        }
        return returnValue;
    }
}
