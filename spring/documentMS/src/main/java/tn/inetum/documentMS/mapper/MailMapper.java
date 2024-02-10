package tn.inetum.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.documentMS.dto.MailDTO;
import tn.inetum.documentMS.entity.Mail;


@Mapper(componentModel = "spring" )
public interface MailMapper {
    MailDTO MailToMailDTO(Mail mail);
    Mail MailDTOToMail(MailDTO mailDTO);
}