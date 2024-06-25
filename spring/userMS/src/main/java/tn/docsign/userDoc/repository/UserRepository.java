package tn.docsign.userDoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.docsign.userDoc.entity.User;

import java.util.List;

@Repository

public interface UserRepository  extends JpaRepository<User,String> {
    @Query("SELECT t FROM User t  WHERE t.organization.idOrg  = ?1 ")
    List<User> findwithidOrg(String idOrg);

}
