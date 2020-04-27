package com.shxn.app.ws.dogofthedowapp.ui.model.response;

import com.shxn.app.ws.dogofthedowapp.shared.dto.StockInfoDto;

import java.util.List;

public class PortfolioRest {

    private String userId;
    private List<StockInfoDto> stockInfoList;
    private double totalTransactionsValue;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<StockInfoDto> getStockInfoList() {
        return stockInfoList;
    }

    public void setStockInfoList(List<StockInfoDto> stockInfoList) {
        this.stockInfoList = stockInfoList;
    }

    public double getTotalTransactionsValue() {
        return totalTransactionsValue;
    }

    public void setTotalTransactionsValue(double totalTransactionsValue) {
        this.totalTransactionsValue = totalTransactionsValue;
    }
}
