package tn.inetum.userDoc.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import tn.inetum.userDoc.enumm.RoleUser;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String idUser;
    private String lnameUser;
    private String fnameUser;
    private String emailUser;
    private String passwordUser;
    private String telUser;
    private String fonctionUser;
    private String imageprofileUser;
    @CreationTimestamp
    private Date creationDateUser;
    private Date birthDateUser;
    private String roleUser;
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name="idOrg")
    @JsonIgnoreProperties("users")
    private Organization organization;
   @OneToMany(mappedBy = "user", fetch = FetchType. LAZY,
            cascade = CascadeType.ALL)
   @JsonIgnoreProperties("user")
   private List<Contact> contacts=new ArrayList<>();
    private Boolean isActive;
    private boolean isHomme;
    private String  contryUser ;
    private String regionUser ;

}
