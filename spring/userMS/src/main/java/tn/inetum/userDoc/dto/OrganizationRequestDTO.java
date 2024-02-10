package tn.inetum.userDoc.dto;

import lombok.Data;
import tn.inetum.userDoc.enumm.RoleUser;

import java.util.Set;

@Data
public class OrganizationRequestDTO {
    private String idOrg;
    private String nameOrg;
    private String adressOrg;
    private String postalcodeOrg;
    private String countryOrg;
    private String telOrg;
    private String emailOrg;
    private String logoOrg;
   // private Set<UserRequestDTO> users;

}
