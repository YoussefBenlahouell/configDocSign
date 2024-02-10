package tn.inetum.userDoc.mapper;

import org.mapstruct.Mapper;
import tn.inetum.userDoc.dto.OrganizationRequestDTO;
import tn.inetum.userDoc.dto.OrganizationResponseDTO;
import tn.inetum.userDoc.entity.Organization;


@Mapper(componentModel = "spring" )
public interface OrganizationMapper {
    OrganizationResponseDTO organizationToOrganizationResponseDTO(Organization organization);
    Organization organizationRequestDTOToOrganization(OrganizationRequestDTO organizationRequestDTO);
}
