package tn.inetum.documentMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import tn.inetum.documentMS.dto.AttrsDTOin;
import tn.inetum.documentMS.dto.AttrsDTOout;
import tn.inetum.documentMS.dto.ChildDTOin;
import tn.inetum.documentMS.dto.ChildDTOout;
import tn.inetum.documentMS.entity.Attrs;
import tn.inetum.documentMS.entity.Child;
import tn.inetum.documentMS.mapper.AttrsMapper;
import tn.inetum.documentMS.mapper.ChildMapper;
import tn.inetum.documentMS.repository.AttrsRepository;
import tn.inetum.documentMS.repository.ChildRepository;

import java.util.List;
import java.util.stream.Collectors;

public class ChildService {
    @Autowired
    ChildRepository childRepository;
    @Autowired
    ChildMapper childMapper;

    public List<ChildDTOout> findAll(){
        return childRepository.findAll().stream().map(x->childMapper.ChildToChildDTOout(x)).collect(Collectors.toList());
    }


    public ChildDTOout findById(String id) {
        return this.childRepository.findById(id).
                map(x->childMapper.ChildToChildDTOout(x)).orElseThrow(IllegalStateException::new);
    }

    public ChildDTOout create(ChildDTOin childDTOin) {
        Child child= childMapper.ChildDTOinToChild(childDTOin);
        return childMapper.ChildToChildDTOout( childRepository.save(child));
    }

    public void delete(String id) {
        this.childRepository.deleteById(id);
    }
}
