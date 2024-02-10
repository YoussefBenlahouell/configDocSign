package tn.inetum.userDoc.service;

import tn.inetum.userDoc.dto.UserRequestDTO;
import tn.inetum.userDoc.dto.UserResponseDTO;

import java.util.List;

public interface UserServiceInter {
    UserResponseDTO save (UserRequestDTO userRequestDTO);
    List<UserResponseDTO> listUsers();
    UserResponseDTO getUser(String id);
}
