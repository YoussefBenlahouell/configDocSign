package tn.docsign.documentMS.dto;

import lombok.Data;

@Data
public class ShareWithForDocDTOin {
    private Boolean canDelete;
    private Boolean canShare;
    private String idDocumentSign ;
    private String idUser;
}
