package odm_finance.finance.controller;

import odm_finance.finance.model.CommandeItem;
import odm_finance.finance.service.CommandeItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/command-items")
public class CommandeItemController {

    private final CommandeItemService commandeItemService;

    @Autowired
    public CommandeItemController(CommandeItemService commandeItemService) {
        this.commandeItemService = commandeItemService;
    }

    @GetMapping
    public List<CommandeItem> getAllCommandeItems() {
        return commandeItemService.getAllCommandeItems();
    }
}
