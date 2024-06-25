package tn.docsign.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.documentMS.dto.*;

import tn.docsign.documentMS.entity.DocumentSign;

@Mapper(componentModel = "spring" )
public interface DocumentSignMapper {
    DocumentSignDTO DocumentSignToDocumentSignDTO(DocumentSign documentSign);
    DocumentSign DocumentSignDTOToDocumentSign(DocumentSignDTO documentSignDTO);




    //  List<TemplateDTO> toTemplateDTOs(List<Template> products);
    DocumentSignDTOout DocumentSignToDocumentSignDTOout(DocumentSign documentSign);
    DocumentSign DocumentSignDTOinToDocumentSign(DocumentSignDTOin documentSignDTOin);
    DocumentSign DocumentSignDTOoutToDocumentSign(DocumentSignDTOout documentSignDTOout);
}
