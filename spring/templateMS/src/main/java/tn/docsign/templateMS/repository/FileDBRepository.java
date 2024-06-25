package tn.docsign.templateMS.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 import tn.docsign.templateMS.entity.FileDB;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
}