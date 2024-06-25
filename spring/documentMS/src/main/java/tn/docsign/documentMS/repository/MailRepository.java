package tn.docsign.documentMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.docsign.documentMS.entity.Mail;


public interface MailRepository extends JpaRepository<Mail, String> {
}
