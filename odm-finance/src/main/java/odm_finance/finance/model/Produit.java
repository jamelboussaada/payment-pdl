package odm_finance.finance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Le nom est obligatoire")
    private String name;
    @Min(value = 0, message = "Le prix doit être positif")
    private Double prix;
    @NotBlank(message = "La description est obligatoire")
    @Column(length = 10000)
    private String description;
    private Integer quantite;
    @NotBlank(message = "L'URL de l'image est obligatoire")
    private String imageUrl;

}
