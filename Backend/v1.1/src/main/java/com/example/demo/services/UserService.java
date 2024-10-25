package com.example.demo.services;

import com.example.demo.entities.UserEntity;
import com.example.demo.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserEntity getUserById(Long id){ return userRepository.findById(id).get(); }
    public UserEntity getUserByRut(String rut){
        return userRepository.findByRut(rut);
    }
    public UserEntity saveUser(UserEntity user) {
        // Verify that the user have
        if (user.getId_rol() != 2) {
            throw new IllegalArgumentException("You are not allowed to create an executive or admin user.");
        }

        // Verificar si el RUT ya existe
        if (userRepository.findByRut(user.getRut()) != null) {
            throw new IllegalArgumentException("El RUT ya está registrado en el sistema.");
        }

        // Save the user in the database
        return userRepository.save(user);
    }

    public boolean deleteUser(Long id) throws Exception {
        try{
            userRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


}
