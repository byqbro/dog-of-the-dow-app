package com.shxn.app.ws.dogofthedowapp.shared.dto;

import java.io.Serializable;
import java.util.List;

public class PortfolioDto implements Serializable {

    private static final long serialVersionUID = 8439936898159072707L;

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
