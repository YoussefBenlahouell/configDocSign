package tn.inetum.userDoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.inetum.userDoc.entity.Contact;

import java.util.Set;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

}
