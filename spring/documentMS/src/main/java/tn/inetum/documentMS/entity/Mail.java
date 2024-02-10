package tn.inetum.documentMS.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;

import javax.persistence.*;




@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Component
public class Mail {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String idMail;
    private String subjectMail;
    private String  messageMail;
    private Boolean reminderEnabled;
    private int reminderDelay;
    private int reminderFrequency;
    private Boolean exprationEnabled;
    private int exprationDelay;

}