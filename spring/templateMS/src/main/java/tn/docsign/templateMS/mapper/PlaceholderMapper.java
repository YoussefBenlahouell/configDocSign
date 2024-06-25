package tn.docsign.templateMS.mapper;

import org.mapstruct.Mapper;

import tn.docsign.templateMS.dto.PlaceholderDTOin;
import tn.docsign.templateMS.dto.PlaceholderDTOout;
import tn.docsign.templateMS.entity.Placeholder;


@Mapper(componentModel = "spring" )
public interface PlaceholderMapper {

    PlaceholderDTOout placeholderToPlaceholderDTOout(Placeholder placeholder);

    Placeholder placeholderDTOinToPlaceholder (PlaceholderDTOin placeholderDTOin);
}