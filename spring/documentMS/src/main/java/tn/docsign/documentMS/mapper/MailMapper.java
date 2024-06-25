package tn.docsign.documentMS.mapper;

import org.mapstruct.Mapper;
import tn.docsign.documentMS.dto.MailDTO;
import tn.docsign.documentMS.entity.Mail;


@Mapper(componentModel = "spring" )
public interface MailMapper {
    MailDTO MailToMailDTO(Mail mail);
    Mail MailDTOToMail(MailDTO mailDTO);
}