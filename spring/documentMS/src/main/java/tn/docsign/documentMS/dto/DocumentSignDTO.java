package tn.docsign.documentMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import tn.docsign.documentMS.entity.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DocumentSignDTO {
    private String idDocumentSign;
    private String nameDocumentSign;
    private String idCreatedBy;
    private User createdBy;
    private String descDocumentSign;
    private boolean visible;
    private String  typeofSend;
    private Date creationDateDocumentSign;
    private FileDB filePdf;
    private Set<Placeholder> placeholders;
    private Mail mail;
    private Folderdoc folder;
    private Set<ShareWithForDoc> shareWiths;
    private String status;
    private  int allDocumentSign;
    private int currentDocumentSign;


}

