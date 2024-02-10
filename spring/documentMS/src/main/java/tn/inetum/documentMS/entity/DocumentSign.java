package tn.inetum.documentMS.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DocumentSign {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "idDocumentSign", columnDefinition = "VARCHAR(255)")
    private String idDocumentSign;
    private String nameDocumentSign;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String idCreatedBy;
    @Transient
    private User createdBy;
    private String descDocumentSign;
    private boolean visible;
    private String  typeofSend;
    @CreationTimestamp
    private Date creationDateDocumentSign;
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "id")
    private FileDB filePdf;
    @OneToMany(  fetch=FetchType.EAGER,cascade = CascadeType.ALL ,orphanRemoval = true)
    @JoinColumn(name = "fk_doc_placeholder")
    private Set<Placeholder> placeholders;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idMail", referencedColumnName = "idMail")
    private Mail mail;


    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name="idFolder")
    private Folderdoc folder;


    @OneToMany(targetEntity = ShareWithForDoc.class, mappedBy = "idShare", orphanRemoval = false, fetch = FetchType.LAZY)
    private Set<ShareWithForDoc> shareWiths;
    private String status;


    private  int allDocumentSign;
    private int currentDocumentSign;

}
