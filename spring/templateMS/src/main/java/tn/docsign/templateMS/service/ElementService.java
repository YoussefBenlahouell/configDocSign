package tn.docsign.templateMS.service;

import org.springframework.beans.factory.annotation.Autowired;
  import tn.docsign.templateMS.dto.ElementDTOin;
import tn.docsign.templateMS.dto.ElementDTOout;
 import tn.docsign.templateMS.entity.Element;
 import tn.docsign.templateMS.mapper.ElementMapper;
 import tn.docsign.templateMS.repository.ElementRepository;

import java.util.List;
import java.util.stream.Collectors;

public class ElementService {
    @Autowired
    ElementRepository elementRepository;
    @Autowired
    ElementMapper elementMapper;

    public List<ElementDTOout> findAll(){
        return elementRepository.findAll().stream().map(x->elementMapper.ElementToElementDTOout(x)).collect(Collectors.toList());
    }


    public ElementDTOout findById(Long id) {
        return this.elementRepository.findById(id).
                map(x->elementMapper.ElementToElementDTOout(x)).orElseThrow(IllegalStateException::new);
    }

    public ElementDTOout create(ElementDTOin elementDTOin) {
        Element element= elementMapper.ElementDTOinToElement(elementDTOin);
        return elementMapper.ElementToElementDTOout( elementRepository.save(element));
    }

    public void delete(Long id) {
        this.elementRepository.deleteById(id);
    }
}
