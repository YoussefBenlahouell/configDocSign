package tn.inetum.userDoc.service;



        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.mail.javamail.JavaMailSender;
        import org.springframework.mail.javamail.MimeMessageHelper;
        import org.springframework.stereotype.Service;
        import org.thymeleaf.spring5.SpringTemplateEngine;
        import org.thymeleaf.context.Context;
        import javax.mail.MessagingException;
        import javax.mail.internet.MimeMessage;
        import java.io.IOException;
        import java.nio.charset.StandardCharsets;
        import java.util.HashMap;
        import java.util.Map;

@Service
public class SendMailService {

    @Autowired
    SpringTemplateEngine templateEngine;

    @Autowired
    private JavaMailSender emailSender;

    public String sendHtmlMessage(String RecipientName,String RecipientEmail ,String emailSubject) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Map<String, Object> model = new HashMap<>();
        model.put("RecipientName",RecipientName);
        model.put("RecipientEmail",RecipientEmail);
        model.put("url","http://localhost:4200/dashbord/");
        //  model.put("emailMessage",emailMessage);

        Context context = new Context();
        context.setVariables(model);
        String html = templateEngine.process("sendEmailTologin", context);

        helper.setTo(RecipientEmail);
        helper.setText(html,true);
        helper.setSubject(emailSubject);

        emailSender.send(message);

        return "email sender";


    }
}