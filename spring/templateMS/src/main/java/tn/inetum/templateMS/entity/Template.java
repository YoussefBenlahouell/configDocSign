package tn.inetum.templateMS.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Template {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "idTemplate", columnDefinition = "VARCHAR(255)")
    private String idTemplate;
    private String nameTemplate;
    private String descTemplate;
    private boolean visible;
    private String  typeofSend;

    @CreationTimestamp
    private Date creationDateTemplate;
    @UpdateTimestamp
    private Date lastChangeDateTemplate;
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "id")
    private FileDB filePdf;
    @ManyToOne(fetch = FetchType.EAGER  )
    @JoinColumn(name="idFolder")
    private Folder folder;




    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private  String idOwner ;
    @Transient
    private User owner;
    @OneToMany(  fetch=FetchType.EAGER,cascade = CascadeType.ALL ,orphanRemoval = true)
    @JoinColumn(name = "fk_template_placeholder")
    private Set<Placeholder> placeholders;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idMail", referencedColumnName = "idMail")
    private Mail mail;


}




