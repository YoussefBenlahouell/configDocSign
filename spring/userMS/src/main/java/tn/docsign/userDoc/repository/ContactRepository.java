package tn.docsign.userDoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.docsign.userDoc.entity.Contact;

import java.util.Set;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

}
