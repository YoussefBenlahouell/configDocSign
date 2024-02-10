package tn.inetum.templateMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChildDTOin {
    public AttrsDTOin attrs;
    public String className;
}
