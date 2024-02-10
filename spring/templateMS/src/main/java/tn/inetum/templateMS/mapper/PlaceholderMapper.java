package tn.inetum.templateMS.mapper;

import org.mapstruct.Mapper;

import tn.inetum.templateMS.dto.PlaceholderDTOin;
import tn.inetum.templateMS.dto.PlaceholderDTOout;
import tn.inetum.templateMS.entity.Placeholder;


@Mapper(componentModel = "spring" )
public interface PlaceholderMapper {

    PlaceholderDTOout placeholderToPlaceholderDTOout(Placeholder placeholder);

    Placeholder placeholderDTOinToPlaceholder (PlaceholderDTOin placeholderDTOin);
}