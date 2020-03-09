package com.shxn.app.ws.dogofthedowapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class AppProperties {

    @Autowired
    private Environment env;

    public String getTokenSecret() {
        return env.getProperty("tokenSecret");
    }

    public String getAdminUsername() {
        return env.getProperty("adminUsername");
    }

    public String getAdminEmail() {
        return env.getProperty("adminEmail");
    }

    public String getAdminFirstName() {
        return env.getProperty("adminFirstName");
    }

    public String getAdminLastName() {
        return env.getProperty("adminLastName");
    }

    public String getAdminPassword() {
        return env.getProperty("adminPassword");
    }
}
