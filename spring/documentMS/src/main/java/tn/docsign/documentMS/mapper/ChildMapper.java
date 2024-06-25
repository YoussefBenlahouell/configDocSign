package tn.docsign.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.documentMS.dto.ChildDTOin;
import tn.docsign.documentMS.dto.ChildDTOout;

import tn.docsign.documentMS.entity.Child;

@Mapper(componentModel = "spring" )
public interface ChildMapper {
    ChildDTOout ChildToChildDTOout(Child child);
   Child ChildDTOinToChild(ChildDTOin childDTOin);

}
