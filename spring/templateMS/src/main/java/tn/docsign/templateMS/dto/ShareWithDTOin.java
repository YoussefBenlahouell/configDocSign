package tn.docsign.templateMS.dto;

import lombok.Data;

@Data
public class ShareWithDTOin {
    private Boolean canDelete;
    private Boolean canEdit;
    private Boolean canUse;
    private Boolean canShare;
    private String idtemplate ;
    private String idUser;
}
