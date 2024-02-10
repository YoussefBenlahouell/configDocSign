package tn.inetum.userDoc.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Contact   {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idContact;
    private String fullNameContact;
    private String emailContact;
    private String companyContact;
    private String telContact;
    @ManyToOne(  fetch = FetchType.EAGER)//par default EAGER(fetch = FetchType.EAGER)
    @JoinColumn(name="idUser")
    @JsonIgnoreProperties("contacts")
    private User user;


}

