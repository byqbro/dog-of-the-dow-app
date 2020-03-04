package com.shxn.app.ws.dogofthedowapp.io.repositories;

import com.shxn.app.ws.dogofthedowapp.io.entity.TransactionEntity;
import com.shxn.app.ws.dogofthedowapp.io.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<TransactionEntity, Long> {
    List<TransactionEntity> findAllByUserDetails(UserEntity userEntity);
}
