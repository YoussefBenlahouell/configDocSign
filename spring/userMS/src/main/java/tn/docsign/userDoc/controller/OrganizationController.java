package tn.docsign.userDoc.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.docsign.userDoc.dto.Imagedto;
import tn.docsign.userDoc.dto.OrganizationRequestDTO;
import tn.docsign.userDoc.dto.OrganizationResponseDTO;
import tn.docsign.userDoc.dto.UserResponseDTO;
import tn.docsign.userDoc.service.OrganizationService;
import java.util.List;


@RestController
@RequestMapping(path="/api")
public class OrganizationController {

@Autowired
OrganizationService organizationService;

@GetMapping(path="/organization")
    public List<OrganizationResponseDTO> allOrganizations(){
        return organizationService.listOrganizations();
    }
@PostMapping(path="/organization")
    public OrganizationResponseDTO save (@RequestBody OrganizationRequestDTO organizationRequestDTO) {
    return organizationService.save(organizationRequestDTO);
}
@GetMapping(path="organization/{id}")
    public  OrganizationResponseDTO getOrganization (@PathVariable String id) {
    return organizationService.getOrganization(id);
    }

@PutMapping("/organization/updateimage")
    public OrganizationResponseDTO updateimage(@RequestBody Imagedto image) {
        return this.organizationService.updateimage(image);
    }

    @PutMapping("/organization")
    public OrganizationResponseDTO updateorg(@RequestBody OrganizationRequestDTO organizationRequestDTO) {
        return this.organizationService.update(organizationRequestDTO);
    }


}
