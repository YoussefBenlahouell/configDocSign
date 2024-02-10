package tn.inetum.userDoc.dto;

import lombok.Data;
import tn.inetum.userDoc.enumm.RoleUser;

@Data
public class SignataireRequestDTO {
    private String  idSig;
    private String lnameSig;
    private String fnameSig;
    private String emailSig;
    private String passwordSig;
    private String telSig;

}
