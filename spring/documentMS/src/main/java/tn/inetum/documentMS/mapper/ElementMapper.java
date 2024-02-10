package tn.inetum.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.documentMS.dto.ElementDTOin;
import tn.inetum.documentMS.dto.ElementDTOout;
import tn.inetum.documentMS.entity.Element;

@Mapper(componentModel = "spring" )
public interface ElementMapper {
     ElementDTOout ElementToElementDTOout(Element element);
     Element ElementDTOinToElement(ElementDTOin elementDTOin);
}
