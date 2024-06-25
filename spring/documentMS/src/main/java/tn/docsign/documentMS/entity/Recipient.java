package tn.docsign.documentMS.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Recipient {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "idTemplate", columnDefinition = "VARCHAR(255)")
    private String idRecipient;
    private String nameRecipient;
    private String emailRecipient;
    private String TelRecipient;
    private String typeRecipient;
    private int orderRecipient;
    @OneToMany(mappedBy = "recipient", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Element> elements;

    //  private JSONPObject element;



}
