package tn.inetum.documentMS.service;

import org.springframework.beans.factory.annotation.Autowired;
  import tn.inetum.documentMS.dto.ElementDTOin;
import tn.inetum.documentMS.dto.ElementDTOout;
 import tn.inetum.documentMS.entity.Element;
 import tn.inetum.documentMS.mapper.ElementMapper;
 import tn.inetum.documentMS.repository.ElementRepository;

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
