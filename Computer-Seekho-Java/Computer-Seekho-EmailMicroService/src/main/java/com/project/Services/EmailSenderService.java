package com.project.Services;

import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Properties;
import org.springframework.stereotype.Service;

import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

@Service
public class EmailSenderService {
  final String username = "computerseekho2025@gmail.com";
  final String password = "uqknkgmutwmxuxju";

  public void sendEmailPayment(Map<String, String> paymentDetails) {
    
    String to = paymentDetails.get("email");
    String studentName = paymentDetails.get("studentName");
    String paymentAmount = paymentDetails.get("amount");
    String paymentMethod = paymentDetails.get("Type");
    String paymentDate = paymentDetails.get("date");
    String paymentID = paymentDetails.get("paymentId");
    System.out.println(to);
    Properties props = new Properties();
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.port", "587");

    Session session = Session.getInstance(props,
        new jakarta.mail.Authenticator() {
          protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username, password);
          }
        });

    try {
      // Create a new email message
      MimeMessage message1 = new MimeMessage(session);
      message1.setRecipients(Message.RecipientType.TO,
          InternetAddress.parse(to));
      message1.setSubject("Payment Received");

      // Read the HTML template from a file
      String emailTemplate = new String(Files.readAllBytes(Paths.get("Computer-Seekho-Java/Computer-Seekho-EmailMicroService/src/main/resources/paymentTemplate.html")));
      System.out.println("PaymentTemplate");

      // Replace placeholders with actual values
      emailTemplate = emailTemplate.replace("${studentName}", studentName);
      emailTemplate = emailTemplate.replace("${paymentID}", paymentID);
      emailTemplate = emailTemplate.replace("${paymentAmount}", paymentAmount);
      emailTemplate = emailTemplate.replace("${paymentMethod}", paymentMethod);
      emailTemplate = emailTemplate.replace("${paymentDate}", paymentDate);

      // Create the HTML part
      MimeBodyPart htmlPart = new MimeBodyPart();
      htmlPart.setContent(emailTemplate, "text/html");

      // Create a multipart message
      MimeMultipart multipart = new MimeMultipart();
      multipart.addBodyPart(htmlPart);

      // Set the multipart content to the message
      message1.setContent(multipart);

      // Send the email
      Transport.send(message1);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void sendAdmissionEmail(String to, String studentName) {

    // Set up the mail server properties
    Properties props = new Properties();
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.port", "587");

    // Create a session with an authenticator
    Session session = Session.getInstance(props,
        new jakarta.mail.Authenticator() {
          protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username, password);
          }
        });
    try {
      // Create a new email message
      MimeMessage message1 = new MimeMessage(session);
      message1.setRecipients(Message.RecipientType.TO,
          InternetAddress.parse(to));
      message1.setSubject("Admission Confirmation");

      // Read the HTML template from a file
      String emailTemplate = new String(Files.readAllBytes(Paths.get("Computer-Seekho-Java/Computer-Seekho-EmailMicroService/src/main/resources/emailTemplate.html")));

      // Replace placeholders with actual values
      emailTemplate = emailTemplate.replace("${studentName}", studentName);

      // Create the HTML part
      MimeBodyPart htmlPart = new MimeBodyPart();
      htmlPart.setContent(emailTemplate, "text/html");

      // Create a multipart message
      MimeMultipart multipart = new MimeMultipart();
      multipart.addBodyPart(htmlPart);

      // Set the multipart content to the message
      message1.setContent(multipart);

      // Send the email
      Transport.send(message1);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
