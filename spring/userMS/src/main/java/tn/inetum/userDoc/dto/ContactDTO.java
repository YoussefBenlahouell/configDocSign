package tn.inetum.userDoc.dto;

import lombok.Data;
import tn.inetum.userDoc.entity.User;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class ContactDTO {
    private Long idContact;
    private String fullNameContact;
    private String emailContact;
    private String companyContact;
    private String telContact;
    private String idUser;
}
