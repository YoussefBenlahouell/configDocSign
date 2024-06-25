package tn.docsign.documentMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import tn.docsign.documentMS.dto.AttrsDTOin;
import tn.docsign.documentMS.dto.AttrsDTOout;
import tn.docsign.documentMS.dto.ChildDTOin;
import tn.docsign.documentMS.dto.ChildDTOout;
import tn.docsign.documentMS.entity.Attrs;
import tn.docsign.documentMS.entity.Child;
import tn.docsign.documentMS.mapper.AttrsMapper;
import tn.docsign.documentMS.mapper.ChildMapper;
import tn.docsign.documentMS.repository.AttrsRepository;
import tn.docsign.documentMS.repository.ChildRepository;

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
