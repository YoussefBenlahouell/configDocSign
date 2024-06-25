package tn.docsign.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.docsign.templateMS.entity.Child;

public interface ChildRepository extends JpaRepository<Child, String> {
}
