package tn.docsign.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.docsign.templateMS.entity.Placeholder;


public interface PlaceholderRepository extends JpaRepository<Placeholder, String> {
    //Placeholder findByTemplate(String idTemplate);
}
