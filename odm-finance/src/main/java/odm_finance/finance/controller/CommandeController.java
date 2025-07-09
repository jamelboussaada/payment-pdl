package odm_finance.finance.controller;

import odm_finance.finance.model.Commande;
import odm_finance.finance.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/commands")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    // API to get all commands
    @GetMapping
    public ResponseEntity<List<Commande>> getAllCommands() {
        List<Commande> commands = commandeService.getAllCommands();
        return ResponseEntity.ok(commands);
    }

    @GetMapping("/userConnected")
    public ResponseEntity<List<Commande>> getCommandsByUser(@RequestHeader Long userId) {
        List<Commande> commands = commandeService.getCommandsByUser(userId);
        return ResponseEntity.ok(commands);
    }

    @GetMapping("/myInvoices")
    public ResponseEntity<List<String>> getMyInvoices(@RequestHeader Long userId) {
        List<Commande> commands = commandeService.getCommandsByUser(userId);
        List<String> invoices = commands.stream()
                .map(Commande::getUrlFacture) // Extract the urlFacture
                .filter(Objects::nonNull)      // Filter out null values
                .collect(Collectors.toList());

        return ResponseEntity.ok(invoices);
    }
}