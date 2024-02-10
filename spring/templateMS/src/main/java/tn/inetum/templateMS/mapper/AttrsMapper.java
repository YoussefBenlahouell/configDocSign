package tn.inetum.templateMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.templateMS.dto.AttrsDTOin;
import tn.inetum.templateMS.dto.AttrsDTOout;

import tn.inetum.templateMS.entity.Attrs;


@Mapper(componentModel = "spring" )
public interface AttrsMapper {

    AttrsDTOout AttrsToAttrsDTOout(Attrs attrs);
    Attrs AttrsDTOinToAttrs(AttrsDTOin attrsDTOin);
}
