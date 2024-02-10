package tn.inetum.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.inetum.templateMS.entity.Placeholder;


public interface PlaceholderRepository extends JpaRepository<Placeholder, String> {
    //Placeholder findByTemplate(String idTemplate);
}
