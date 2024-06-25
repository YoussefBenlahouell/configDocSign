package tn.docsign.userDoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.docsign.userDoc.entity.Signataire;

@Repository
public interface SignataireRepository extends JpaRepository<Signataire,String> {

}
