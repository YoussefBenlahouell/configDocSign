package tn.docsign.userDoc.service;

import tn.docsign.userDoc.dto.UserRequestDTO;
import tn.docsign.userDoc.dto.UserResponseDTO;

import java.util.List;

public interface UserServiceInter {
    UserResponseDTO save (UserRequestDTO userRequestDTO);
    List<UserResponseDTO> listUsers();
    UserResponseDTO getUser(String id);
}
