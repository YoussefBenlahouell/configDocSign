package tn.docsign.templateMS.mapper;

import org.mapstruct.Mapper;

import tn.docsign.templateMS.dto.TemplateDTO;
import tn.docsign.templateMS.dto.TemplateDTOin;
import tn.docsign.templateMS.dto.TemplateDTOout;
import tn.docsign.templateMS.entity.Template;

@Mapper(componentModel = "spring" )
public interface TemplateMapper {
    TemplateDTO templateToTemplateDto(Template template);
    Template templateDtoToTemplate(TemplateDTO templateDTO);
  //  List<TemplateDTO> toTemplateDTOs(List<Template> products);
    TemplateDTOout templateToTemplateDTOout(Template template);
    Template templateDTOinToTemplate(TemplateDTOin templateDTOin);
    Template templateDTOoutToTemplate(TemplateDTOout templateDTOout);
}