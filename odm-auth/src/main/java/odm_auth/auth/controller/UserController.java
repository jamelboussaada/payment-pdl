package odm_auth.auth.controller;


import odm_auth.auth.entity.User;
import odm_auth.auth.enums.Role;
import odm_auth.auth.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    UserRepository userRepository;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userRepository.findByRole(Role.USER));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/status/{status}")
    public ResponseEntity<?> setUserStatus(@PathVariable Long id, @PathVariable boolean status) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        user.setEnabled(status);
        userRepository.save(user);

        return ResponseEntity.ok("User status updated to " + (status ? "ENABLED" : "DISABLED"));
    }
}

