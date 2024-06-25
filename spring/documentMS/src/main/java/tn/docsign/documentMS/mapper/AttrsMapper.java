package tn.docsign.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.documentMS.dto.AttrsDTOin;
import tn.docsign.documentMS.dto.AttrsDTOout;

import tn.docsign.documentMS.entity.Attrs;


@Mapper(componentModel = "spring" )
public interface AttrsMapper {

    AttrsDTOout AttrsToAttrsDTOout(Attrs attrs);
    Attrs AttrsDTOinToAttrs(AttrsDTOin attrsDTOin);
}
