package tn.docsign.documentMS.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mappings;

import tn.docsign.documentMS.dto.PlaceholderDTOin;
import tn.docsign.documentMS.dto.PlaceholderDTOout;
import tn.docsign.documentMS.entity.Placeholder;


@Mapper(componentModel = "spring" )
public interface PlaceholderMapper {

    PlaceholderDTOout placeholderToPlaceholderDTOout(Placeholder placeholder);

    Placeholder placeholderDTOinToPlaceholder (PlaceholderDTOin placeholderDTOin);
}