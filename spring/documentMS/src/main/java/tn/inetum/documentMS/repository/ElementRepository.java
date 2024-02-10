package tn.inetum.documentMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.inetum.documentMS.entity.Attrs;
import tn.inetum.documentMS.entity.Element;

public interface ElementRepository extends JpaRepository<Element, Long> {
}
