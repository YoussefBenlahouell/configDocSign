package tn.inetum.templateMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import tn.inetum.templateMS.dto.TemplateDTO;
import tn.inetum.templateMS.dto.TemplateDTOout;
import tn.inetum.templateMS.entity.Template;
import tn.inetum.templateMS.mapper.PlaceholderMapper;
import tn.inetum.templateMS.mapper.TemplateMapper;
import tn.inetum.templateMS.repository.PlaceholderRepository;
import tn.inetum.templateMS.repository.TemplateRepository;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;



@Service
@Transactional
public class TemplateService {
    @Autowired
    TemplateRepository templateRepository;
    @Autowired
    PlaceholderRepository placeholderRepository;
    @Autowired
    TemplateMapper templateMapper;
    @Autowired
    PlaceholderMapper placeholderMapper;


@Autowired
UserServiceProxy userServiceProxy;
    public List<TemplateDTO> findAll(){
        templateRepository.findAll().forEach(x->x.setOwner(userServiceProxy.findUserById(x.getIdOwner())));
    return templateRepository.findAll().stream().map(x->templateMapper.templateToTemplateDto(x)).collect(Collectors.toList());
    }

    public List<TemplateDTO> findCreatedByMe(String idOwner){
        templateRepository.findByIdOwner(idOwner).forEach(x->x.setOwner(userServiceProxy.findUserById(x.getIdOwner())));
        return templateRepository.findByIdOwner(idOwner).stream().map(x->templateMapper.templateToTemplateDto(x)).collect(Collectors.toList());
    }
    public List<TemplateDTO> findShareWithMe( String idUser){
         templateRepository.findSharedByIdOwner(idUser).forEach(x->x.setOwner(userServiceProxy.findUserById(x.getIdOwner())));
        return templateRepository.findSharedByIdOwner(idUser).stream().map(x->templateMapper.templateToTemplateDto(x)).collect(Collectors.toList());
    }

    public List<TemplateDTO> findCreatedAndShareWithMe( String idUser){
       templateRepository.findShareAndCreatedIdOwner(idUser).forEach(x->x.setOwner(userServiceProxy.findUserById(x.getIdOwner())));
        return templateRepository.findShareAndCreatedIdOwner(idUser).stream().map(x->templateMapper.templateToTemplateDto(x)).collect(Collectors.toList());
    }

    public TemplateDTO findById(String id) {

       // t.setOwner(userServiceProxy.findUserById(t.getIdOwner()));
        return this.templateRepository.findById(id).map(x->  templateMapper.templateToTemplateDto(x)).orElseThrow(IllegalStateException::new);
    }
    public TemplateDTOout findByIdForChangePlaceholder(String id) {
        // t.setOwner(userServiceProxy.findUserById(t.getIdOwner()));
        return this.templateRepository.findById(id).map(x->  templateMapper.templateToTemplateDTOout(x)).orElseThrow(IllegalStateException::new);
    }


    public TemplateDTO create(TemplateDTO templateDto) {
        Template template= templateMapper.templateDtoToTemplate(templateDto);
        Template t= templateRepository.save(template);
          return  templateMapper.templateToTemplateDto(t);
    }

    public TemplateDTO update(TemplateDTO templateDto) {
        Template template= templateMapper.templateDtoToTemplate(templateDto);
        Template t= templateRepository.save(template);
        return  templateMapper.templateToTemplateDto(t);
    }
    public  TemplateDTO createFromCopy(TemplateDTO templateDTO)
    {
      TemplateDTOout templateOut = templateMapper.templateToTemplateDTOout(templateMapper.templateDtoToTemplate(templateDTO));
      Template t =templateMapper.templateDTOoutToTemplate(templateOut);

        return  templateMapper.templateToTemplateDto(templateRepository.save(t));
    }

    public void delete(String id) {
        this.templateRepository.deleteById(id);
    }








}









