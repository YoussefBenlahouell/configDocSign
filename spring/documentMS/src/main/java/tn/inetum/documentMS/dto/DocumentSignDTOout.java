package tn.inetum.documentMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import tn.inetum.documentMS.entity.*;

import java.util.Date;
import java.util.Set;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DocumentSignDTOout {

    private String idDocumentSign;
    private String nameDocumentSign;
    private String idCreatedBy;
    private User createdBy;
    private String descDocumentSign;
    private boolean visible;
    private String  typeofSend;
    private Date creationDateDocumentSign;
    private FileDB filePdf;
    private Set<PlaceholderDTOout> placeholders;
    private Mail mail;
    private Folderdoc folder;
    private Set<ShareWithForDoc> shareWiths;
    private String status;
    private  int allDocumentSign;
    private int currentDocumentSign;
}
