package tn.docsign.templateMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlaceholderDTOout {

    private String idPlaceholder;
    private String namePlaceholder;
    private String nameRecipient;
    private String emailRecipient;
    private String TypePlaceholder;
    private int orderPlaceholder;
    private String colorPlaceholder;
    private List<ElementDTOout> elements;
    private TemplateDTO template;
    private String  phoneRecipient;
    private String  orgRecipient;


}
