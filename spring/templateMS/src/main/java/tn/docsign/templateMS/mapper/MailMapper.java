package tn.docsign.templateMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.templateMS.dto.MailDTO;
import tn.docsign.templateMS.entity.Mail;


@Mapper(componentModel = "spring" )
public interface MailMapper {
    MailDTO MailToMailDTO(Mail mail);
    Mail MailDTOToMail(MailDTO mailDTO);
}