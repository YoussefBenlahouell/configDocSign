package tn.docsign.userDoc.mapper;

import org.mapstruct.Mapper;
import tn.docsign.userDoc.dto.OrganizationRequestDTO;
import tn.docsign.userDoc.dto.OrganizationResponseDTO;
import tn.docsign.userDoc.entity.Organization;


@Mapper(componentModel = "spring" )
public interface OrganizationMapper {
    OrganizationResponseDTO organizationToOrganizationResponseDTO(Organization organization);
    Organization organizationRequestDTOToOrganization(OrganizationRequestDTO organizationRequestDTO);
}
