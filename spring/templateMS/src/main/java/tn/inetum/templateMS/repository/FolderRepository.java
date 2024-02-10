package tn.inetum.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.inetum.templateMS.entity.Folder;

import java.util.List;


public interface FolderRepository extends JpaRepository<Folder, String> {

    List<Folder> findByIdOwner(String id);

}

