package odm_finance.finance.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CommandeItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private double prix;
    private int quantite;

    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;
}