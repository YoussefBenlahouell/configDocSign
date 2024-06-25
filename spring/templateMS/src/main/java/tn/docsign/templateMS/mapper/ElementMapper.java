package tn.docsign.templateMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.templateMS.dto.ElementDTOin;
import tn.docsign.templateMS.dto.ElementDTOout;
import tn.docsign.templateMS.entity.Element;

@Mapper(componentModel = "spring" )
public interface ElementMapper {
     ElementDTOout ElementToElementDTOout(Element element);
     Element ElementDTOinToElement(ElementDTOin elementDTOin);
}
