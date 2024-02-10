package tn.inetum.documentMS.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 import tn.inetum.documentMS.entity.FileDB;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
}