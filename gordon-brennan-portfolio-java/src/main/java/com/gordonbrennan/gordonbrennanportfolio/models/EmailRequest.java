package com.gordonbrennan.gordonbrennanportfolio.models;

public class EmailRequest {
    private String userEmail;
    private String subject;
    private String message;

    public String getUserEmail() {
        return userEmail;
    }

    public String getSubject() {
        return subject;
    }

    public String getMessage() {
        return message;
    }

    // Setters
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}