package tn.inetum.templateMS.mapper;

import org.mapstruct.Mapper;
import tn.inetum.templateMS.dto.MailDTO;
import tn.inetum.templateMS.entity.Mail;


@Mapper(componentModel = "spring" )
public interface MailMapper {
    MailDTO MailToMailDTO(Mail mail);
    Mail MailDTOToMail(MailDTO mailDTO);
}