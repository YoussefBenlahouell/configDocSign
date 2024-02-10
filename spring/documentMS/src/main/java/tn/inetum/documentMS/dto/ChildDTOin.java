package tn.inetum.documentMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import tn.inetum.documentMS.entity.Attrs;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChildDTOin {
    public AttrsDTOin attrs;
    public String className;
}
