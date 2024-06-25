package tn.docsign.templateMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.docsign.templateMS.dto.PlaceholderDTOin;
import tn.docsign.templateMS.dto.PlaceholderDTOout;
import tn.docsign.templateMS.entity.Placeholder;
import tn.docsign.templateMS.mapper.PlaceholderMapper;
import tn.docsign.templateMS.repository.PlaceholderRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceholderService {
    @Autowired
    PlaceholderRepository placeholderRepository;

    @Autowired
      PlaceholderMapper placeholderMapper;

    public List<PlaceholderDTOout> findAll(){
        return placeholderRepository.findAll().stream().map(x->placeholderMapper.placeholderToPlaceholderDTOout(x)).collect(Collectors.toList());
    }


    public PlaceholderDTOout findById(String id) {
        return this.placeholderRepository.findById(id).
                map(x->placeholderMapper.placeholderToPlaceholderDTOout(x)).orElseThrow(IllegalStateException::new);
    }

    public PlaceholderDTOout create(PlaceholderDTOin placeholderDTOin) {

        Placeholder placeholder= placeholderMapper.placeholderDTOinToPlaceholder(placeholderDTOin);
        Placeholder placeholder1=placeholder;
        return placeholderMapper.placeholderToPlaceholderDTOout( placeholderRepository.save(placeholder));
    }

    public void delete(String id) {
        this.placeholderRepository.deleteById(id);
    }


}
