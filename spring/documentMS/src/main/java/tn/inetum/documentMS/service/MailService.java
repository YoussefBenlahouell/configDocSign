package tn.inetum.documentMS.service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.inetum.documentMS.dto.MailDTO;
import tn.inetum.documentMS.entity.Mail;
import tn.inetum.documentMS.mapper.MailMapper;
import tn.inetum.documentMS.repository.MailRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
    public class MailService {
        @Autowired
        MailRepository mailRepository;
        @Autowired
        MailMapper mailMapper;

        public List<MailDTO> findAll(){
            return mailRepository.findAll().stream().map(x->mailMapper.MailToMailDTO(x)).collect(Collectors.toList());
        }


        public MailDTO findById(String id) {
            return this.mailRepository.findById(id).
                    map(x->mailMapper.MailToMailDTO(x)).orElseThrow(IllegalStateException::new);
        }

        public MailDTO create(MailDTO mailDTO) {
            Mail mail= mailMapper.MailDTOToMail(mailDTO);
            return mailMapper.MailToMailDTO( mailRepository.save(mail));
        }

        public void delete(String id) {
            this.mailRepository.deleteById(id);
        }


    }


