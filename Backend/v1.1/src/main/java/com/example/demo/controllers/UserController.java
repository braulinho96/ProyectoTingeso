package com.example.demo.controllers;

import com.example.demo.entities.UserEntity;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/{rut}")
    public ResponseEntity<UserEntity> getUserByRut(@PathVariable String rut){
        UserEntity user = userService.getUserByRut(rut);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/")
    public ResponseEntity<UserEntity> saveUser(@RequestBody UserEntity user){
        UserEntity newUser = userService.saveUser(user);
        return ResponseEntity.ok(newUser);
    }

}
    