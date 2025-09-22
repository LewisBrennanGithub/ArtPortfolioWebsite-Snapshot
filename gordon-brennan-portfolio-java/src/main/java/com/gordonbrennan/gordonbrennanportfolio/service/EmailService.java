package com.gordonbrennan.gordonbrennanportfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${email.from}")
    private String emailFrom;

    @Value("${email.to}")
    private String defaultTo;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimpleMessage(String to, String subject, String userEmail, String text) {
        String target = (to == null || to.trim().isEmpty()) ? defaultTo : to;

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(emailFrom);
        msg.setTo(target);
        msg.setSubject(subject != null ? subject : "New contact form message");
        msg.setText((text == null ? "" : text) +
                "\n\nSender's email: " + (userEmail == null ? "(none provided)" : userEmail));

        if (userEmail != null && !userEmail.trim().isEmpty()) {
            msg.setReplyTo(userEmail);
        }

        try {
            mailSender.send(msg);
        } catch (MailException ex) {
            throw ex;
        }
    }
}
