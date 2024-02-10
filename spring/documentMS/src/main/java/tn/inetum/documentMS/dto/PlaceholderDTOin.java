package tn.inetum.documentMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlaceholderDTOin {
    private String idPlaceholderBack;
    private String idPlaceholder;
    private String namePlaceholder;
    private String nameRecipient;
    private String emailRecipient;
    private String TypePlaceholder;
    private int orderPlaceholder;
    private String colorPlaceholder;
    private List<ElementDTOin> elements;

    private String  phoneRecipient;
    private String  orgRecipient;


}
