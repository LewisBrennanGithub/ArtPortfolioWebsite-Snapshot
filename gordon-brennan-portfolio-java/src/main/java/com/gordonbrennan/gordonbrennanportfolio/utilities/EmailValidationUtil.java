package com.gordonbrennan.gordonbrennanportfolio.utilities;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

public class EmailValidationUtil {

    public static boolean isValidEmailAddress(String email) {
        if (email == null || email.trim().isEmpty()) return false;
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
            return true;
        } catch (AddressException ex) {
            return false;
        }
    }
}
