package tn.docsign.userDoc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Organization {
    @Id
    private String idOrg;
    private String nameOrg;
    private String adressOrg;
    private String postalcodeOrg;
    private String countryOrg;
    private String telOrg;
    private String emailOrg;
    private String logoOrg;
/*
    @OneToMany(mappedBy="organization", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private Set<User> users;
*/

}
