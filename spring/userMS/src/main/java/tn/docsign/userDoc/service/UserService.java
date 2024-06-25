package tn.docsign.userDoc.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import tn.docsign.userDoc.dto.*;
import tn.docsign.userDoc.entity.Organization;
import tn.docsign.userDoc.entity.User;
import tn.docsign.userDoc.mapper.OrganizationMapper;
import tn.docsign.userDoc.mapper.UserMapper;
import tn.docsign.userDoc.repository.OrganizationRepository;
import tn.docsign.userDoc.repository.UserRepository;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService implements UserServiceInter {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
        private UserMapper userMapper;
    @Autowired
    private OrganizationMapper organizationMapper;
    @Autowired
    private  SendMailService sendMailService;
    @Override
    public UserResponseDTO save(UserRequestDTO userRequestDTO) {


        Organization organization=  organizationRepository.save(organizationMapper.organizationRequestDTOToOrganization(userRequestDTO.getOrganization()));
        User user =userMapper.userRequestDTOToUser( userRequestDTO);
        user.setOrganization(organization);
        user.setIsActive(true);
        User saveUser =userRepository.save(user);
        UserResponseDTO userResponseDTO = userMapper.userToUserResponseDTO(saveUser);
        return userResponseDTO;
    }

    public UserResponseDTO update(UserRequestDTO userRequestDTO) {
        Organization organization=  organizationRepository.save(organizationMapper.organizationRequestDTOToOrganization(userRequestDTO.getOrganization()));
        User user =userMapper.userRequestDTOToUser( userRequestDTO);
        user.setOrganization(organization);
        User saveUser =userRepository.save(user);
        UserResponseDTO userResponseDTO = userMapper.userToUserResponseDTO(saveUser);
        return userResponseDTO;
    }




    public UserResponseDTO saveandsendmail(UserRequestDTO userRequestDTO) {
        User user =userMapper.userRequestDTOToUser( userRequestDTO);
        User saveUser =userRepository.save(user);
        UserResponseDTO userResponseDTO = userMapper.userToUserResponseDTO(saveUser);
String fullname=userResponseDTO.getFnameUser()+userResponseDTO.getLnameUser();
        try {
            sendMailService.sendHtmlMessage(fullname,userRequestDTO.getEmailUser(),"Signatury New Account");
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


        return userResponseDTO;
    }

    @Override
    public List<UserResponseDTO> listUsers() {
        return userRepository.findAll().stream().map(x->userMapper.userToUserResponseDTO(x)).collect(Collectors.toList());
    }
    @Override
    public UserResponseDTO getUser(String id){

        return userMapper.userToUserResponseDTO(userRepository.findById(id).get());
    }

    public List<UserResponseDTO> getUserOfSameOrg(String idOrg){
        return userRepository.findwithidOrg(idOrg).stream().map(x->userMapper.userToUserResponseDTO(x)).collect(Collectors.toList());

    }



    public UserResponseDTO play(String idUser) {
        User user=userRepository.getById(idUser);
        user.setIsActive(true);
        User saveUser =userRepository.save(user);
        UserResponseDTO userResponseDTO = userMapper.userToUserResponseDTO(saveUser);
        return userResponseDTO;
    }


    public UserResponseDTO pause(String idUser) {
        User user=userRepository.getById(idUser);
        user.setIsActive(false);
        User saveUser =userRepository.save(user);
        UserResponseDTO userResponseDTO = userMapper.userToUserResponseDTO(saveUser);
        return userResponseDTO;
    }

    public OrganizationResponseDTO getorgbyidadmin(String id){
        return organizationMapper.organizationToOrganizationResponseDTO(userRepository.findById(id).get().getOrganization());
    }
    public UserResponseDTO updateimage(Imagedto image) {
        User user=userRepository.getById(image.getId());
        user.setImageprofileUser(image.getUrl());
        User saveUser =userRepository.save(user);
        UserResponseDTO userResponseDTO = userMapper.userToUserResponseDTO(saveUser);
        return userResponseDTO;
    }



}
