package tn.docsign.userDoc.dto;

import lombok.Data;
import tn.docsign.userDoc.entity.User;
import tn.docsign.userDoc.enumm.RoleUser;

import java.util.Set;

@Data
public class OrganizationResponseDTO {
    private String idOrg;
    private String nameOrg;
    private String adressOrg;
    private String postalcodeOrg;
    private String countryOrg;
    private String telOrg;
    private String emailOrg;
    private String logoOrg;
 //   private Set<UserResponseDTO> users;

}
