package tn.inetum.userDoc.mapper;

import org.mapstruct.Mapper;
import tn.inetum.userDoc.dto.SignataireRequestDTO;
import tn.inetum.userDoc.dto.SignataireResponseDTO;
import tn.inetum.userDoc.entity.Signataire;

@Mapper(componentModel = "spring" )
public interface SignataireMapper {
    SignataireResponseDTO signataireToSignataireResponseDTO(Signataire signataire);
    Signataire signataireRequestDTOToSignataire(SignataireRequestDTO signataireRequestDTO);
}
