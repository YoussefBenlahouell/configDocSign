package tn.inetum.templateMS.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Placeholder {
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "idPlaceholderBack", columnDefinition = "VARCHAR(255)")
    @Id
    private String idPlaceholderBack;
    private String idPlaceholder;
    private String namePlaceholder;
    private String TypePlaceholder;
    private int orderPlaceholder;
    private String colorPlaceholder;
    private String nameRecipient;
    private String emailRecipient;
    private String  phoneRecipient;
    private String  orgRecipient;
    @OneToMany( fetch = FetchType.EAGER,
   cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_Placeholer_Elemements")
    private Set<Element> elements;



}