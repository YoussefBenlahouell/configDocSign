package tn.inetum.documentMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.inetum.documentMS.entity.Placeholder;


public interface PlaceholderRepository extends JpaRepository<Placeholder, String> {
    //Placeholder findByTemplate(String idTemplate);
}
