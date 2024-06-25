package tn.docsign.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.docsign.templateMS.entity.Mail;


public interface MailRepository extends JpaRepository<Mail, String> {
}
