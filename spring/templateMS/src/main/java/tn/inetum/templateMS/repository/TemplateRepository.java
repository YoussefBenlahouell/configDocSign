package tn.inetum.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.inetum.templateMS.entity.Template;

import java.util.List;


public interface TemplateRepository extends JpaRepository<Template, String> {

    List<Template> findByIdOwner(String id);

    @Query("SELECT t FROM Template t INNER JOIN ShareWith  s ON s.template = t.idTemplate WHERE s.idUser = ?1 ")
    List<Template> findSharedByIdOwner(String id);
    @Query("SELECT t FROM Template t LEFT JOIN ShareWith  s ON s.template = t.idTemplate WHERE s.idUser = ?1 OR t.idOwner= ?1 ")
    List<Template> findShareAndCreatedIdOwner(String id);


}
