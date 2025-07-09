package odm_finance.finance.repository;

import odm_finance.finance.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    List<Commande> findByUserId(Long userId);
}
