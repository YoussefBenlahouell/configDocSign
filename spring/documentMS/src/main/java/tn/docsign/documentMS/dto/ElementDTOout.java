package tn.docsign.documentMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Set;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ElementDTOout {

    public AttrsDTOout attrs;
    public String className;
    public Set<ChildDTOout> children;
 }
