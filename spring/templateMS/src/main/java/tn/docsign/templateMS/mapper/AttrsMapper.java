package tn.docsign.templateMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.templateMS.dto.AttrsDTOin;
import tn.docsign.templateMS.dto.AttrsDTOout;

import tn.docsign.templateMS.entity.Attrs;


@Mapper(componentModel = "spring" )
public interface AttrsMapper {

    AttrsDTOout AttrsToAttrsDTOout(Attrs attrs);
    Attrs AttrsDTOinToAttrs(AttrsDTOin attrsDTOin);
}
