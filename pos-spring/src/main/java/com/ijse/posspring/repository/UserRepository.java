package com.ijse.posspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.posspring.entity.User;
import java.util.Optional;;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername (String username);
    
}
