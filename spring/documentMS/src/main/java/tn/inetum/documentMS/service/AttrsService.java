package tn.inetum.documentMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import tn.inetum.documentMS.dto.AttrsDTOin;
import tn.inetum.documentMS.dto.AttrsDTOout;
import tn.inetum.documentMS.dto.MailDTO;
import tn.inetum.documentMS.entity.Attrs;
import tn.inetum.documentMS.entity.Mail;
import tn.inetum.documentMS.mapper.AttrsMapper;
import tn.inetum.documentMS.mapper.MailMapper;
import tn.inetum.documentMS.repository.AttrsRepository;
import tn.inetum.documentMS.repository.MailRepository;

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
