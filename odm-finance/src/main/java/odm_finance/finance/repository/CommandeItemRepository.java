package odm_finance.finance.repository;

import odm_finance.finance.model.CommandeItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeItemRepository extends JpaRepository<CommandeItem, Long> {
}
