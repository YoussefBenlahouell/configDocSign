package tn.docsign.templateMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import tn.docsign.templateMS.entity.*;

import java.util.Date;
import java.util.Set;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TemplateDTOin {

    private String idTemplate;
    private String nameTemplate;
    private String descTemplate;
    private Date creationDateTemplate;
    private String typeofSend;
    private Date lastChangeDateTemplate;
    private FileDB filePdf;
    private Mail mail;
    private Set<PlaceholderDTOin> placeholders;
    private boolean visible;
    private String idOwner ;
    private User owner;

    private Folder folder;

}
