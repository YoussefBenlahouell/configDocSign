package tn.docsign.templateMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.templateMS.dto.ChildDTOin;
import tn.docsign.templateMS.dto.ChildDTOout;

import tn.docsign.templateMS.entity.Child;

@Mapper(componentModel = "spring" )
public interface ChildMapper {
    ChildDTOout ChildToChildDTOout(Child child);
   Child ChildDTOinToChild(ChildDTOin childDTOin);

}
