package com.PFE.commerce.Service;


import org.springframework.mail.SimpleMailMessage;

public interface EmailServiceC {
    void sendEmail(SimpleMailMessage email) ;
}