package tn.docsign.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.documentMS.dto.ElementDTOin;
import tn.docsign.documentMS.dto.ElementDTOout;
import tn.docsign.documentMS.entity.Element;

@Mapper(componentModel = "spring" )
public interface ElementMapper {
     ElementDTOout ElementToElementDTOout(Element element);
     Element ElementDTOinToElement(ElementDTOin elementDTOin);
}
