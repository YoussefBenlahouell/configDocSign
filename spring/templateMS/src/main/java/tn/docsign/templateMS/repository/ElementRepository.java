package tn.docsign.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.docsign.templateMS.entity.Element;

public interface ElementRepository extends JpaRepository<Element, Long> {
}
