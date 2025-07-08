package odm_finance.finance.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private String clientAddress;

    private double total;

    private LocalDateTime date;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL , orphanRemoval = true)
    private List<CommandeItem> items;
}
