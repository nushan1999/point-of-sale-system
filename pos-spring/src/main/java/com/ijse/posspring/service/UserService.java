package com.ijse.posspring.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ijse.posspring.entity.User;

@Service
public interface UserService {

    List<User> getAllUseres();
    User getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User user, String password);
    boolean deleteUser(Long id ,String password);
    
}
