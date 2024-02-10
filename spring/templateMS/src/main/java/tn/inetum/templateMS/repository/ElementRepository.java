package tn.inetum.templateMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.inetum.templateMS.entity.Element;

public interface ElementRepository extends JpaRepository<Element, Long> {
}
