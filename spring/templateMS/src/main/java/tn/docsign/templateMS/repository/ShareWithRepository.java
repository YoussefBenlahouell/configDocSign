package tn.docsign.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.docsign.templateMS.entity.ShareWith;
@Repository
public interface ShareWithRepository extends JpaRepository<ShareWith,String> {
}
