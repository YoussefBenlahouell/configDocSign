package tn.inetum.userDoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.inetum.userDoc.entity.Signataire;

@Repository
public interface SignataireRepository extends JpaRepository<Signataire,String> {

}
