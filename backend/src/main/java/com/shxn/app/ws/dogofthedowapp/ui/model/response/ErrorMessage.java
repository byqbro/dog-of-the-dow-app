package com.shxn.app.ws.dogofthedowapp.ui.model.response;

import java.util.Date;

public class ErrorMessage {

    private Date timestamp;
    private String error;
    private String status;

    public ErrorMessage() {
        this.status = "fail";
    }

    public ErrorMessage(Date timestamp, String error) {
        this.timestamp = timestamp;
        this.error = error;
        this.status = "fail";
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
