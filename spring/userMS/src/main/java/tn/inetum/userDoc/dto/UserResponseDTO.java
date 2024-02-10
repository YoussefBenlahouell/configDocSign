package tn.inetum.userDoc.dto;

import lombok.Data;
import tn.inetum.userDoc.entity.Contact;
import tn.inetum.userDoc.entity.Organization;
import tn.inetum.userDoc.enumm.RoleUser;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
public class UserResponseDTO {
    private String idUser;
    private String lnameUser;
    private String fnameUser;
    private String emailUser;
    private String imageprofileUser;
    private String telUser;
    private String  contryUser ;
    private String regionUser ;
    private String fonctionUser;
    private String roleUser;
    private OrganizationResponseDTO organization;
    private List<ContactDTO> contacts;
    private Boolean isActive;
    private Date creationDateUser;
    private Date birthDateUser;
    private boolean isHomme;
}
