package tn.inetum.userDoc.mapper;

import org.mapstruct.Mapper;
import tn.inetum.userDoc.dto.ContactDTO;
import tn.inetum.userDoc.entity.Contact;

@Mapper(componentModel = "spring" )
public interface ContactMapper {
    ContactDTO ContactToContactDTO(Contact contact);
    Contact ContactDTOToContact(ContactDTO contactDTO);

}
