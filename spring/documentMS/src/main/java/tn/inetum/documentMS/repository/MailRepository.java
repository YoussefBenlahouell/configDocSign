package tn.inetum.documentMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.inetum.documentMS.entity.Mail;


public interface MailRepository extends JpaRepository<Mail, String> {
}
