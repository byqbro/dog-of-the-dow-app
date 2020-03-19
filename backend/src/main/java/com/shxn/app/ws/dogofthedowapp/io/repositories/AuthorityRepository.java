package com.shxn.app.ws.dogofthedowapp.io.repositories;

import com.shxn.app.ws.dogofthedowapp.io.entity.AuthorityEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends CrudRepository<AuthorityEntity, Long> {
    AuthorityEntity findByName(String name);
}
