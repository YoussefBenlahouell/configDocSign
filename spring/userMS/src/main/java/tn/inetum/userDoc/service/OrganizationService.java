package tn.inetum.userDoc.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.inetum.userDoc.dto.Imagedto;
import tn.inetum.userDoc.dto.OrganizationRequestDTO;
import tn.inetum.userDoc.dto.OrganizationResponseDTO;
import tn.inetum.userDoc.dto.UserResponseDTO;
import tn.inetum.userDoc.entity.Organization;
import tn.inetum.userDoc.entity.User;
import tn.inetum.userDoc.mapper.OrganizationMapper;
import tn.inetum.userDoc.repository.OrganizationRepository;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrganizationService  {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private OrganizationMapper organizationMapper;


    public OrganizationResponseDTO save(OrganizationRequestDTO organizationRequestDTO) {
        Organization organization =organizationMapper.organizationRequestDTOToOrganization( organizationRequestDTO);
        Organization saveOrganization =organizationRepository.save(organization);
        OrganizationResponseDTO organizationResponseDTO = organizationMapper.organizationToOrganizationResponseDTO(saveOrganization);
        return organizationResponseDTO;
    }


    public List<OrganizationResponseDTO> listOrganizations() {
        return organizationRepository.findAll().stream().map(x->organizationMapper.organizationToOrganizationResponseDTO(x)).collect(Collectors.toList());
    }

    public OrganizationResponseDTO getOrganization(String id){
        return organizationMapper.organizationToOrganizationResponseDTO(organizationRepository.findById(id).get());
    }

    public OrganizationResponseDTO updateimage(Imagedto image) {
        Organization org=organizationRepository.getById(image.getId());
        org.setLogoOrg(image.getUrl());
        Organization saveOrg =organizationRepository.save(org);
        OrganizationResponseDTO organizationResponseDTO = organizationMapper.organizationToOrganizationResponseDTO(saveOrg);
        return organizationResponseDTO;
    }


    public OrganizationResponseDTO update(OrganizationRequestDTO organizationRequestDTO) {
        Organization organization =organizationMapper.organizationRequestDTOToOrganization(organizationRequestDTO);
        Organization saveOrganization =organizationRepository.save(organization);
        OrganizationResponseDTO organizationResponseDTO = organizationMapper.organizationToOrganizationResponseDTO(saveOrganization);
        return organizationResponseDTO;
    }
}
