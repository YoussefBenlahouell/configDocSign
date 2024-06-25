package tn.docsign.documentMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.docsign.documentMS.entity.DocumentSign;

import java.util.List;

@Repository
public interface DocumentSignRepository  extends JpaRepository<DocumentSign, String> {


    List<DocumentSign> findByIdCreatedBy(String id);
    @Query("SELECT t FROM DocumentSign t INNER JOIN ShareWithForDoc  s ON s.documentSign = t.idDocumentSign WHERE s.idUser = ?1 ")
    List<DocumentSign> findSharedByIdOwner(String id);
    @Query("SELECT t FROM DocumentSign t LEFT JOIN ShareWithForDoc  s ON s.documentSign = t.idDocumentSign WHERE s.idUser = ?1 OR t.idCreatedBy= ?1 ")
    List<DocumentSign> findShareAndCreatedIdOwner(String id);

}
