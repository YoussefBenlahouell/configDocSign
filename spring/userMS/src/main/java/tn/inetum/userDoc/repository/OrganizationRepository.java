package tn.inetum.userDoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.inetum.userDoc.entity.Organization;
@Repository
public interface OrganizationRepository extends JpaRepository<Organization,String> {

}
