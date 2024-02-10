package tn.inetum.userDoc.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.inetum.userDoc.dto.ContactDTO;
import tn.inetum.userDoc.dto.UserResponseDTO;
import tn.inetum.userDoc.entity.Contact;
import tn.inetum.userDoc.entity.User;
import tn.inetum.userDoc.mapper.ContactMapper;
import tn.inetum.userDoc.mapper.UserMapper;
import tn.inetum.userDoc.repository.ContactRepository;
import tn.inetum.userDoc.repository.UserRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;




@Service
public class ContactService {
    @Autowired
    ContactRepository contactRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ContactMapper contactMapper;
    @Autowired
    UserMapper userMapper;

    public List<ContactDTO> findAll(){
        return contactRepository.findAll().stream().map(x->contactMapper.ContactToContactDTO(x)).collect(Collectors.toList());
    }


    public ContactDTO findById(Long id) {
        return this.contactRepository.findById(id).
                map(x->contactMapper.ContactToContactDTO(x)).orElseThrow(IllegalStateException::new);
    }

    public List<ContactDTO>  findallById(String idUser){

      UserResponseDTO user=  this.userRepository.findById(idUser). map(x->userMapper.userToUserResponseDTO(x)).orElseThrow(IllegalStateException::new);
        List<ContactDTO> contacts= user.getContacts();

        return contacts;
        //contactRepository.findAll().stream().map(x->contactMapper.ContactToContactDTO(x)).collect(Collectors.toList());
    }

    public ContactDTO create(ContactDTO contactDTO) {
        Contact contact= contactMapper.ContactDTOToContact(contactDTO);
        contact.setUser(userRepository.findById(contactDTO.getIdUser()).get());
        return contactMapper.ContactToContactDTO ( contactRepository.save(contact));
    }

    public void delete(Long id) {
        this.contactRepository.deleteById(id);
    }


    public ContactDTO update(ContactDTO contactDTO) {

        Contact contact= contactRepository.getById(contactDTO.getIdContact());
        contact.setCompanyContact(contactDTO.getCompanyContact());
        contact.setEmailContact(contactDTO.getEmailContact());
        contact.setTelContact(contactDTO.getTelContact());
        contact.setFullNameContact(contactDTO.getFullNameContact());
        return contactMapper.ContactToContactDTO ( contactRepository.save(contact));
    }

}


