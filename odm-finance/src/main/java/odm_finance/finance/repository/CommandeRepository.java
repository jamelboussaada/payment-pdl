package odm_finance.finance.repository;

import odm_finance.finance.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
