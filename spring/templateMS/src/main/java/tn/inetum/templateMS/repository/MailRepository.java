package tn.inetum.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.inetum.templateMS.entity.Mail;


public interface MailRepository extends JpaRepository<Mail, String> {
}
