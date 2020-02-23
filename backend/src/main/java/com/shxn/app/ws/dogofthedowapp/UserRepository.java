package com.shxn.app.ws.dogofthedowapp;

import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {

}
