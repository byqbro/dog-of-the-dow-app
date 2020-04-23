package com.shxn.app.ws.dogofthedowapp.io.repositories;

import com.shxn.app.ws.dogofthedowapp.io.entity.RoleEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Long> {
    RoleEntity findByName(String name);
}
