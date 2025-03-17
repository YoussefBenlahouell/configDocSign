package tn.docsign.documentMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring5.SpringTemplateEngine;
import tn.docsign.documentMS.entity.Recipient;
import org.thymeleaf.context.Context;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailSenderToSign {

    @Autowired
    SpringTemplateEngine templateEngine;

    @Autowired
    private JavaMailSender emailSender;

    public String sendHtmlMessage(String RecipientName,String RecipientEmail ,String emailSubject,String emailMessage,String senderName,String idSavedFile) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Map<String, Object> model = new HashMap<>();
        model.put("recipientName",RecipientName);
        model.put("senderName",senderName);
        model.put("emailMessage",emailMessage);
        model.put("url","http://localhost:80/signature/viewpdf/"+idSavedFile);


        Context context = new Context();
        context.setVariables(model);
        String html = templateEngine.process("sendEmailToSign", context);

            helper.setTo(RecipientEmail);
            helper.setText(html,true);
            helper.setSubject(emailSubject);

        emailSender.send(message);

       return "email sender";


    }

    public void copyfinalMail(String RecipientName,String RecipientEmail ) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
        StandardCharsets.UTF_8.name());

        Map<String, Object> model = new HashMap<>();
        model.put("recipientName",RecipientName);


        Context context = new Context();
        context.setVariables(model);
        String html = templateEngine.process("sendEmailwithCopy", context);

        helper.setTo(RecipientEmail);
        helper.setText(html,true);
        helper.setSubject("Document signed by Signatury");
        FileSystemResource file = new FileSystemResource("C:\\log.txt");
        helper.addAttachment(file.getFilename(), file);

        emailSender.send(message);



    }
}