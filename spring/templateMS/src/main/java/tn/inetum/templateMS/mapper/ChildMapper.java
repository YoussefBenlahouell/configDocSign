package tn.inetum.templateMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.templateMS.dto.ChildDTOin;
import tn.inetum.templateMS.dto.ChildDTOout;

import tn.inetum.templateMS.entity.Child;

@Mapper(componentModel = "spring" )
public interface ChildMapper {
    ChildDTOout ChildToChildDTOout(Child child);
   Child ChildDTOinToChild(ChildDTOin childDTOin);

}
