package tn.inetum.userDoc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;




@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Signataire {


    @Id
    private String idSig;
    private String lnameSig;
    private String fnameSig;
    private String emailSig;
    private String passwordSig;
    private String telSig;


}
