package tn.docsign.userDoc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.docsign.userDoc.dto.SignataireRequestDTO;
import tn.docsign.userDoc.dto.SignataireResponseDTO;
import tn.docsign.userDoc.entity.Signataire;
import tn.docsign.userDoc.mapper.SignataireMapper;
import tn.docsign.userDoc.repository.SignataireRepository;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SignataireService  {

    @Autowired
    private SignataireRepository signataireRepository;

    @Autowired
    private SignataireMapper signataireMapper;


    public SignataireResponseDTO save(SignataireRequestDTO signataireRequestDTO) {
        Signataire signataire =signataireMapper.signataireRequestDTOToSignataire( signataireRequestDTO);
        Signataire saveSignataire =signataireRepository.save(signataire);
        SignataireResponseDTO signataireResponseDTO = signataireMapper.signataireToSignataireResponseDTO(saveSignataire);
        return signataireResponseDTO;
    }

     public List<SignataireResponseDTO> listSignataires() {
        return signataireRepository.findAll().stream().map(x->signataireMapper.signataireToSignataireResponseDTO(x)).collect(Collectors.toList());
    }
     public SignataireResponseDTO getSignataire(String id){
        return signataireMapper.signataireToSignataireResponseDTO(signataireRepository.findById(id).get());
    }


}
