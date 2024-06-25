package tn.docsign.userDoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.docsign.userDoc.entity.Organization;
@Repository
public interface OrganizationRepository extends JpaRepository<Organization,String> {

}
