package odm_finance.finance.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double total;

    private LocalDateTime date;

    private String urlFacture;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL , orphanRemoval = true)
    @JsonManagedReference
    private List<CommandeItem> items;
}
