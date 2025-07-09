package odm_finance.finance.service;

import odm_finance.finance.model.CommandeItem;
import odm_finance.finance.repository.CommandeItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandeItemService {

    private final CommandeItemRepository commandeItemRepository;

    @Autowired
    public CommandeItemService(CommandeItemRepository commandeItemRepository) {
        this.commandeItemRepository = commandeItemRepository;
    }

    public List<CommandeItem> getAllCommandeItems() {
        return commandeItemRepository.findAll();
    }
}
