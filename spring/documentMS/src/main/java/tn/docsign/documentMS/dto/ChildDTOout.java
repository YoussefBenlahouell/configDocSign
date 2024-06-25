package tn.docsign.documentMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import tn.docsign.documentMS.entity.Attrs;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChildDTOout {
    public AttrsDTOout attrs;
    public String className;
}
