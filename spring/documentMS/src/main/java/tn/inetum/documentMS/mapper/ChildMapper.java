package tn.inetum.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.documentMS.dto.ChildDTOin;
import tn.inetum.documentMS.dto.ChildDTOout;

import tn.inetum.documentMS.entity.Child;

@Mapper(componentModel = "spring" )
public interface ChildMapper {
    ChildDTOout ChildToChildDTOout(Child child);
   Child ChildDTOinToChild(ChildDTOin childDTOin);

}
