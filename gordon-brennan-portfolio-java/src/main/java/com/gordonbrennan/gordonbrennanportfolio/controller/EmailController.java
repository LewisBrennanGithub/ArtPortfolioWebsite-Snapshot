package com.gordonbrennan.gordonbrennanportfolio.controller;

import com.gordonbrennan.gordonbrennanportfolio.models.EmailRequest;
import com.gordonbrennan.gordonbrennanportfolio.service.EmailService;
import com.gordonbrennan.gordonbrennanportfolio.utilities.EmailValidationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Value("${email.to}")
    private String emailTo;

    @PostMapping("/sendEmail")
    public ResponseEntity<Map<String, String>> sendEmail(@RequestBody EmailRequest emailRequest) {
        Map<String, String> response = new HashMap<>();

        if (!EmailValidationUtil.isValidEmailAddress(emailRequest.getUserEmail())) {
            response.put("message", "Invalid email address.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        emailService.sendSimpleMessage(
                emailTo,
                emailRequest.getSubject(),
                emailRequest.getUserEmail(),
                emailRequest.getMessage()
        );

        response.put("message", "Email sent successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}