package tn.docsign.userDoc.mapper;

import org.mapstruct.Mapper;
import tn.docsign.userDoc.dto.SignataireRequestDTO;
import tn.docsign.userDoc.dto.SignataireResponseDTO;
import tn.docsign.userDoc.entity.Signataire;

@Mapper(componentModel = "spring" )
public interface SignataireMapper {
    SignataireResponseDTO signataireToSignataireResponseDTO(Signataire signataire);
    Signataire signataireRequestDTOToSignataire(SignataireRequestDTO signataireRequestDTO);
}
