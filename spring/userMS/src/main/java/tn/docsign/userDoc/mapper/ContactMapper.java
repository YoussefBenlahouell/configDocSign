package tn.docsign.userDoc.mapper;

import org.mapstruct.Mapper;
import tn.docsign.userDoc.dto.ContactDTO;
import tn.docsign.userDoc.entity.Contact;

@Mapper(componentModel = "spring" )
public interface ContactMapper {
    ContactDTO ContactToContactDTO(Contact contact);
    Contact ContactDTOToContact(ContactDTO contactDTO);

}
