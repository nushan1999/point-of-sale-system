package com.ijse.posspring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ijse.posspring.entity.User;
import com.ijse.posspring.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUseres() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user, String password) {
        User existUser = userRepository.findById(id).orElse(null);
        if (existUser != null && passwordEncoder.matches(password, existUser.getPassword())) {
            existUser.setUsername(user.getUsername());
            existUser.setEmail(user.getEmail());
            existUser.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(existUser);
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteUser(Long id, String password) {
        User existUser = userRepository.findById(id).orElse(null);
        if (existUser != null && passwordEncoder.matches(password, existUser.getPassword())) {
            userRepository.deleteById(id);
            return true;
        } else {
            return false;  // Return false if password is incorrect
        }
    }
}
