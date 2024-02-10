package tn.inetum.templateMS.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class reminderMail {
    @Id
    private String idReminder;
    private Boolean reminderEnabled;
    private int reminderDelay;
    private int reminderFrequency;
}
