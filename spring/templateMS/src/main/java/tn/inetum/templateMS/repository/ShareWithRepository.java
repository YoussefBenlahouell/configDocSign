package tn.inetum.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.inetum.templateMS.entity.ShareWith;
@Repository
public interface ShareWithRepository extends JpaRepository<ShareWith,String> {
}
