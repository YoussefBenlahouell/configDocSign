package tn.inetum.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.inetum.templateMS.entity.Child;

public interface ChildRepository extends JpaRepository<Child, String> {
}
