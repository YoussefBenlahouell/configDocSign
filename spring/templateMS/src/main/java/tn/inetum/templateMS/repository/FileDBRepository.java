package tn.inetum.templateMS.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 import tn.inetum.templateMS.entity.FileDB;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
}