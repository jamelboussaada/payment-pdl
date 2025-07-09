package odm_finance.finance.service;

import jakarta.transaction.Transactional;
import odm_finance.finance.model.Commande;
import odm_finance.finance.model.CommandeItem;
import odm_finance.finance.model.ProduitAchat;
import odm_finance.finance.model.User;
import odm_finance.finance.repository.CommandeRepository;
import odm_finance.finance.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommandeService {
    private final CommandeRepository commandeRepository;
    private final UserRepository userRepository;

    public CommandeService(CommandeRepository commandeRepository, UserRepository userRepository) {
        this.commandeRepository = commandeRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void saveCommande(Long userId, List<ProduitAchat> produitsAchat, String filePath)  {
        Commande commande = new Commande();
        User user = userRepository.findById(userId).get();
        commande.setUser(user);
        commande.setDate(LocalDateTime.now());
        commande.setUrlFacture(filePath);

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

    public List<Commande> getAllCommands() {
        return commandeRepository.findAll();
    }

    public List<Commande> getCommandsByUser(Long userId) {
        return commandeRepository.findByUserId(userId);
    }

    // Method to save PDF to a file
    public String savePdfToFile(byte[] pdfBytes, String invoiceNumber) throws IOException {
        // Define the directory to store the PDFs
        String directoryPath = "invoices"; // Adjust the path as needed
        File directory = new File(directoryPath);

        // Create the directory if it doesn't exist
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Create the file path
        String filePath = directoryPath + "/facture-" + invoiceNumber + ".pdf";
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(pdfBytes);
        }

        return filePath;
    }
}
