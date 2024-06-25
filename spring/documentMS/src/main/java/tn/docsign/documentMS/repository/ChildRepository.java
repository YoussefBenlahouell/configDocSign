package tn.docsign.documentMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.docsign.documentMS.entity.Attrs;
import tn.docsign.documentMS.entity.Child;

public interface ChildRepository extends JpaRepository<Child, String> {
}
