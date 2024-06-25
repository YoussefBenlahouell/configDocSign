package tn.docsign.userDoc.mapper;

import org.mapstruct.Mapper;
import tn.docsign.userDoc.dto.UserRequestDTO;
import tn.docsign.userDoc.dto.UserResponseDTO;
import tn.docsign.userDoc.entity.User;

@Mapper(componentModel = "spring" )
public interface UserMapper {
    UserResponseDTO userToUserResponseDTO(User user);
    User userRequestDTOToUser(UserRequestDTO userRequestDTO);
}
