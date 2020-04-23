package com.shxn.app.ws.dogofthedowapp.security;

import com.shxn.app.ws.dogofthedowapp.SpringApplicationContext;

public class SecurityConstants {

    public static final long EXPIRATION_TIME = 864000000; // 10 days
    public static final long PASSWORD_RESET_EXPIRATION_TIME = 3600000; // 1 hour
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/users";
    public static final String H2_CONSOLE = "/h2-console/**";

    public static String getTokenSecret() {
        AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
        return appProperties.getTokenSecret();
    }

    public static String getAdminUsername() {
        AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
        return appProperties.getAdminUsername();
    }

    public static String getAdminEmail() {
        AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
        return appProperties.getAdminEmail();
    }

    public static String getAdminFirstName() {
        AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
        return appProperties.getAdminFirstName();
    }

    public static String getAdminLastName() {
        AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
        return appProperties.getAdminLastName();
    }

    public static String getAdminPassword() {
        AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
        return appProperties.getAdminPassword();
    }
}
