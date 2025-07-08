package odm_finance.finance.service;

import jakarta.transaction.Transactional;
import odm_finance.finance.model.Commande;
import odm_finance.finance.model.CommandeItem;
import odm_finance.finance.model.ProduitAchat;
import odm_finance.finance.repository.CommandeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommandeService {
    private final CommandeRepository commandeRepository;

    public CommandeService(CommandeRepository commandeRepository) {
        this.commandeRepository = commandeRepository;
    }

    @Transactional
    public void saveCommande(String userName, String userLastName,
                             String userEmail,
                             String userPhone,
                             String userAddress,
                             List<ProduitAchat> produitsAchat
    ) {
        Commande commande = new Commande();
        commande.setClientName(userName + " " + userLastName);
        commande.setClientEmail(userEmail);
        commande.setClientPhone(userPhone);
        commande.setClientAddress(userAddress);
        commande.setDate(LocalDateTime.now());

        double total = produitsAchat.stream().mapToDouble(ProduitAchat::getTotal).sum();
        commande.setTotal(total);

        List<CommandeItem> items = produitsAchat.stream().map(produit -> {
            CommandeItem item = new CommandeItem();
            item.setNom(produit.getNom());
            item.setPrix(produit.getPrix());
            item.setQuantite(produit.getQuantite());
            item.setCommande(commande);
            return item;
        }).collect(Collectors.toList());

        commande.setItems(items);

        commandeRepository.save(commande);
    }
}
