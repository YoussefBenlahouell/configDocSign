package tn.inetum.documentMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.inetum.documentMS.entity.Folderdoc;

import java.util.List;

public interface FolderDocRepository  extends JpaRepository<Folderdoc,String> {
  List<Folderdoc>  findByIdCreatedBy(String idCreatedBy);

}
