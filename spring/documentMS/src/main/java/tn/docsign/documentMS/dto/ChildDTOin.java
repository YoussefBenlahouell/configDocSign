package tn.docsign.documentMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import tn.docsign.documentMS.entity.Attrs;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChildDTOin {
    public AttrsDTOin attrs;
    public String className;
}
