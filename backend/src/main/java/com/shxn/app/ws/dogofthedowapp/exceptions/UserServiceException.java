package com.shxn.app.ws.dogofthedowapp.exceptions;

public class UserServiceException extends RuntimeException {

    private static final long serialVersionUID = 2814810966294285279L;

    public UserServiceException(String message) {
        super(message);
    }
}
