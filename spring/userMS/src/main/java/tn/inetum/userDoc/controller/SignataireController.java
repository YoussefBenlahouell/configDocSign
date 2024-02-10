package tn.inetum.userDoc.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.inetum.userDoc.dto.SignataireRequestDTO;
import tn.inetum.userDoc.dto.SignataireResponseDTO;
import tn.inetum.userDoc.service.SignataireService;
import java.util.List;

@RestController
@RequestMapping(path="/api")
public class SignataireController {

@Autowired
SignataireService signataireService;

@GetMapping(path="/signataire")
    public List<SignataireResponseDTO> allSignataires(){
        return signataireService.listSignataires();

    }
@PostMapping(path="/signataire")
    public SignataireResponseDTO save (SignataireRequestDTO signataireRequestDTO) {
    return signataireService.save(signataireRequestDTO);
}
@GetMapping(path="signataire/{id}")

    public  SignataireResponseDTO getSignataire (@PathVariable String id){
    return signataireService.getSignataire(id);
    }




}
