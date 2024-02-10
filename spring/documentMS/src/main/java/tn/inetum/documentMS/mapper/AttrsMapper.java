package tn.inetum.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.documentMS.dto.AttrsDTOin;
import tn.inetum.documentMS.dto.AttrsDTOout;

import tn.inetum.documentMS.entity.Attrs;


@Mapper(componentModel = "spring" )
public interface AttrsMapper {

    AttrsDTOout AttrsToAttrsDTOout(Attrs attrs);
    Attrs AttrsDTOinToAttrs(AttrsDTOin attrsDTOin);
}
