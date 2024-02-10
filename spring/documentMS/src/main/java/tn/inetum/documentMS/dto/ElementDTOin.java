package tn.inetum.documentMS.dto;


import lombok.Data;

import java.util.Set;

@Data
public class ElementDTOin {
    public AttrsDTOout attrs;
    public String className;
    public Set<ChildDTOin> children;
}

