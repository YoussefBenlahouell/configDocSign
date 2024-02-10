package tn.inetum.documentMS.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mappings;

import tn.inetum.documentMS.dto.PlaceholderDTOin;
import tn.inetum.documentMS.dto.PlaceholderDTOout;
import tn.inetum.documentMS.entity.Placeholder;


@Mapper(componentModel = "spring" )
public interface PlaceholderMapper {

    PlaceholderDTOout placeholderToPlaceholderDTOout(Placeholder placeholder);

    Placeholder placeholderDTOinToPlaceholder (PlaceholderDTOin placeholderDTOin);
}