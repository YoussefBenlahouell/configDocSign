package tn.docsign.documentMS.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 import tn.docsign.documentMS.entity.FileDB;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
}