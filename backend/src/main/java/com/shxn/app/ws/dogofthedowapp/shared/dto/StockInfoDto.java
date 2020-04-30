package com.shxn.app.ws.dogofthedowapp.shared.dto;

import java.io.Serializable;

public class StockInfoDto implements Serializable {

    private static final long serialVersionUID = 8376823911624601857L;

    private String symbol;
    private double amount;

    public StockInfoDto(String symbol, double amount) {
        this.symbol = symbol;
        this.amount = amount;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
