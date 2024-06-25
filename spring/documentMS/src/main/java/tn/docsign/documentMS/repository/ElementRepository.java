package tn.docsign.documentMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.docsign.documentMS.entity.Attrs;
import tn.docsign.documentMS.entity.Element;

public interface ElementRepository extends JpaRepository<Element, Long> {
}
