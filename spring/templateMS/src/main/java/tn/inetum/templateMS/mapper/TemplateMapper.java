package tn.inetum.templateMS.mapper;

import org.mapstruct.Mapper;

import tn.inetum.templateMS.dto.TemplateDTO;
import tn.inetum.templateMS.dto.TemplateDTOin;
import tn.inetum.templateMS.dto.TemplateDTOout;
import tn.inetum.templateMS.entity.Template;

@Mapper(componentModel = "spring" )
public interface TemplateMapper {
    TemplateDTO templateToTemplateDto(Template template);
    Template templateDtoToTemplate(TemplateDTO templateDTO);
  //  List<TemplateDTO> toTemplateDTOs(List<Template> products);
    TemplateDTOout templateToTemplateDTOout(Template template);
    Template templateDTOinToTemplate(TemplateDTOin templateDTOin);
    Template templateDTOoutToTemplate(TemplateDTOout templateDTOout);
}