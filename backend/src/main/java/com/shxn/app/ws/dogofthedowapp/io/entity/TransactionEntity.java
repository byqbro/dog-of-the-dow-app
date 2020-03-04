package com.shxn.app.ws.dogofthedowapp.io.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name="transactions")
public class TransactionEntity implements Serializable {

    private static final long serialVersionUID = 880854055595802325L;

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String transactionId;

    @Column(nullable = false, length = 10)
    private String stockSymbol;

    @Column(nullable = false, length = 30)
    private String stockName;

    @Column(nullable = false, length = 6)
    private String buyOrSell;

    @Column(nullable = false, length = 50)
    private double price;

    @Column(nullable = false, length = 30)
    private long amount;

    @Column(nullable = false, length = 50)
    private String currency;

    @Column(nullable = false, length = 50)
    private String createAt;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private UserEntity userDetails;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getStockSymbol() {
        return stockSymbol;
    }

    public void setStockSymbol(String stockSymbol) {
        this.stockSymbol = stockSymbol;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public String getBuyOrSell() {
        return buyOrSell;
    }

    public void setBuyOrSell(String buyOrSell) {
        this.buyOrSell = buyOrSell;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCreateAt() {
        return createAt;
    }

    public void setCreateAt(String createAt) {
        this.createAt = createAt;
    }

    public UserEntity getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserEntity userDetails) {
        this.userDetails = userDetails;
    }
}
