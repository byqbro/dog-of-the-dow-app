package com.shxn.app.ws.dogofthedowapp;

import com.shxn.app.ws.dogofthedowapp.io.entity.AuthorityEntity;
import com.shxn.app.ws.dogofthedowapp.io.entity.RoleEntity;
import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import com.shxn.app.ws.dogofthedowapp.io.repositories.AuthorityRepository;
import com.shxn.app.ws.dogofthedowapp.io.repositories.RoleRepository;
import com.shxn.app.ws.dogofthedowapp.io.repositories.UserRepository;
import com.shxn.app.ws.dogofthedowapp.security.SecurityConstants;
import com.shxn.app.ws.dogofthedowapp.shared.Roles;
import com.shxn.app.ws.dogofthedowapp.shared.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collection;

@Component
public class InitialUsersSetUp {

    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    Utils utils;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    UserRepository userRepository;

    @EventListener
    @Transactional
    public void onApplicationEvent(ApplicationReadyEvent event) {
        System.out.println("From Application ready event...");

        AuthorityEntity readAuthority = createAuthority("READ_AUTHORITY");
        AuthorityEntity writeAuthority = createAuthority("WRITE_AUTHORITY");
        AuthorityEntity deleteAuthority = createAuthority("DELETE_AUTHORITY");

        RoleEntity roleUser = createRole(Roles.ROLE_USER.name(), Arrays.asList(readAuthority, writeAuthority));
        RoleEntity roleAdmin = createRole(Roles.ROLE_ADMIN.name(), Arrays.asList(readAuthority, writeAuthority, deleteAuthority));

        if (roleAdmin == null) {
            return;
        }

        if (userRepository.findByEmail(SecurityConstants.getAdminEmail()) != null) {
            return;
        }

        UserEntity adminUser = new UserEntity();
        adminUser.setUserId(utils.generateUserId(Utils.PUBLIC_USER_ID_LEN));
        adminUser.setUsername(SecurityConstants.getAdminUsername());
        adminUser.setEmail(SecurityConstants.getAdminEmail());
        adminUser.setFirstName(SecurityConstants.getAdminFirstName());
        adminUser.setLastName(SecurityConstants.getAdminLastName());
        adminUser.setEncryptedPassword(bCryptPasswordEncoder.encode(SecurityConstants.getAdminPassword()));
        String dateTimeNow = utils.generateDateTimeNow();
        adminUser.setCreateAt(dateTimeNow);
        adminUser.setUpdateAt(dateTimeNow);
        adminUser.setRoles(Arrays.asList(roleAdmin));

        userRepository.save(adminUser);
    }

    @Transactional
    protected AuthorityEntity createAuthority(String name) {
        AuthorityEntity authority = authorityRepository.findByName(name);
        if (authority == null) {
            authority = new AuthorityEntity(name);
            authorityRepository.save(authority);
        }

        return authority;
    }

    @Transactional
    protected RoleEntity createRole(String name, Collection<AuthorityEntity> authorities) {
        RoleEntity role = roleRepository.findByName(name);
        if (role == null) {
            role = new RoleEntity(name);
            role.setAuthorities(authorities);
            roleRepository.save(role);
        }

        return role;
    }
}
