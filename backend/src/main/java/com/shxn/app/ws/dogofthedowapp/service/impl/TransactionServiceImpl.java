package com.shxn.app.ws.dogofthedowapp.service.impl;

import com.shxn.app.ws.dogofthedowapp.exceptions.UserServiceException;
import com.shxn.app.ws.dogofthedowapp.io.entity.TransactionEntity;
import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import com.shxn.app.ws.dogofthedowapp.io.repositories.TransactionRepository;
import com.shxn.app.ws.dogofthedowapp.io.repositories.UserRepository;
import com.shxn.app.ws.dogofthedowapp.service.TransactionService;
import com.shxn.app.ws.dogofthedowapp.shared.Utils;
import com.shxn.app.ws.dogofthedowapp.shared.dto.PortfolioDto;
import com.shxn.app.ws.dogofthedowapp.shared.dto.StockInfoDto;
import com.shxn.app.ws.dogofthedowapp.shared.dto.TransactionDto;
import com.shxn.app.ws.dogofthedowapp.ui.model.response.ErrorMessages;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TransactionServiceImpl implements TransactionService {

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

        String publicTransactionId = utils.generateTransactionId(Utils.PUBLIC_TRANSACTION_ID_LEN);
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

    @Override
    public PortfolioDto getPortfolio(String userId) {
        PortfolioDto returnValue = new PortfolioDto();
        List<TransactionDto> transactionDtoList = getTransactions(userId);

        if (transactionDtoList == null) {
            return returnValue;
        }

        Map<String, Double> buyAndSellStockMap = new TreeMap<>();

        // ∑stock((amount * sellPrice) - (amount * buyPrice))
        double totalTransactionsValue = 0.00;

        for (TransactionDto transaction : transactionDtoList) {
            String symbol = transaction.getStockSymbol();
            double amount = transaction.getAmount();
            double price = transaction.getPrice();
            if (transaction.getBuyOrSell().equals("Buy")) {
                buyAndSellStockMap.put(symbol, buyAndSellStockMap.getOrDefault(symbol, 0.00) + amount);
                totalTransactionsValue -= price * amount;
            } else if (transaction.getBuyOrSell().equals("Sell")) {
                buyAndSellStockMap.put(symbol, buyAndSellStockMap.getOrDefault(symbol, 0.00) - amount);
                totalTransactionsValue += price * amount;
            }
        }

        List<StockInfoDto> stockInfoDtoList = new ArrayList<>();
        for (Map.Entry<String, Double> entry : buyAndSellStockMap.entrySet()) {
            stockInfoDtoList.add(new StockInfoDto(entry.getKey(), entry.getValue()));
        }

        returnValue.setUserId(userId);
        returnValue.setStockInfoList(stockInfoDtoList);
        returnValue.setTotalTransactionsValue(totalTransactionsValue);

        return returnValue;
    }
}
