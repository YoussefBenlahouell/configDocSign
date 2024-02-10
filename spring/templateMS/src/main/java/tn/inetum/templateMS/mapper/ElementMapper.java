package tn.inetum.templateMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.templateMS.dto.ElementDTOin;
import tn.inetum.templateMS.dto.ElementDTOout;
import tn.inetum.templateMS.entity.Element;

@Mapper(componentModel = "spring" )
public interface ElementMapper {
     ElementDTOout ElementToElementDTOout(Element element);
     Element ElementDTOinToElement(ElementDTOin elementDTOin);
}
