package tn.inetum.userDoc.mapper;

import org.mapstruct.Mapper;
import tn.inetum.userDoc.dto.UserRequestDTO;
import tn.inetum.userDoc.dto.UserResponseDTO;
import tn.inetum.userDoc.entity.User;

@Mapper(componentModel = "spring" )
public interface UserMapper {
    UserResponseDTO userToUserResponseDTO(User user);
    User userRequestDTOToUser(UserRequestDTO userRequestDTO);
}
