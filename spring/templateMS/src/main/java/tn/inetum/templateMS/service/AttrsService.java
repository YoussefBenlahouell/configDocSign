package tn.inetum.templateMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import tn.inetum.templateMS.dto.AttrsDTOin;
import tn.inetum.templateMS.dto.AttrsDTOout;
import tn.inetum.templateMS.entity.Attrs;
import tn.inetum.templateMS.mapper.AttrsMapper;
import tn.inetum.templateMS.repository.AttrsRepository;

import java.util.List;
import java.util.stream.Collectors;

public class AttrsService {
    @Autowired
    AttrsRepository attrsRepository;
    @Autowired
    AttrsMapper attrsMapper;

    public List<AttrsDTOout> findAll(){
        return attrsRepository.findAll().stream().map(x->attrsMapper.AttrsToAttrsDTOout(x)).collect(Collectors.toList());
    }


    public AttrsDTOout findById(String id) {
        return this.attrsRepository.findById(id).
                map(x->attrsMapper.AttrsToAttrsDTOout(x)).orElseThrow(IllegalStateException::new);
    }

    public AttrsDTOout create(AttrsDTOin attrsDTOin) {
        Attrs attrs= attrsMapper.AttrsDTOinToAttrs(attrsDTOin);
        return attrsMapper.AttrsToAttrsDTOout( attrsRepository.save(attrs));
    }

    public void delete(String id) {
        this.attrsRepository.deleteById(id);
    }
}
