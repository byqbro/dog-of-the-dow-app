package com.shxn.app.ws.dogofthedowapp.service;

import com.shxn.app.ws.dogofthedowapp.shared.dto.PortfolioDto;
import com.shxn.app.ws.dogofthedowapp.shared.dto.TransactionDto;

import java.util.List;

public interface TransactionService {

    TransactionDto createTransaction(TransactionDto transactionDto);
    List<TransactionDto> getTransactions(String userId);
    PortfolioDto getPortfolio(String userId);
}
