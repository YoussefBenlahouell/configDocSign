package tn.inetum.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.documentMS.dto.*;

import tn.inetum.documentMS.entity.DocumentSign;

@Mapper(componentModel = "spring" )
public interface DocumentSignMapper {
    DocumentSignDTO DocumentSignToDocumentSignDTO(DocumentSign documentSign);
    DocumentSign DocumentSignDTOToDocumentSign(DocumentSignDTO documentSignDTO);




    //  List<TemplateDTO> toTemplateDTOs(List<Template> products);
    DocumentSignDTOout DocumentSignToDocumentSignDTOout(DocumentSign documentSign);
    DocumentSign DocumentSignDTOinToDocumentSign(DocumentSignDTOin documentSignDTOin);
    DocumentSign DocumentSignDTOoutToDocumentSign(DocumentSignDTOout documentSignDTOout);
}
