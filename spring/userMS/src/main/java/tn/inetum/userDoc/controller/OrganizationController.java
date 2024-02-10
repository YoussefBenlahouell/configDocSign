package tn.inetum.userDoc.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.inetum.userDoc.dto.Imagedto;
import tn.inetum.userDoc.dto.OrganizationRequestDTO;
import tn.inetum.userDoc.dto.OrganizationResponseDTO;
import tn.inetum.userDoc.dto.UserResponseDTO;
import tn.inetum.userDoc.service.OrganizationService;
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
