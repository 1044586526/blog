package tech.yicode.portfolio.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.yicode.portfolio.entity.Contact;
import tech.yicode.portfolio.service.ContactService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081", "http://127.0.0.1:5500"})
public class ContactController {
    
    private final ContactService contactService;
    
    @PostMapping
    public ResponseEntity<Contact> submitContact(@Valid @RequestBody Contact contact, 
                                               HttpServletRequest request) {
        log.info("POST /api/contact - New contact submission from: {}", contact.getEmail());
        
        String ipAddress = getClientIpAddress(request);
        String userAgent = request.getHeader("User-Agent");
        
        try {
            Contact savedContact = contactService.saveContact(contact, ipAddress, userAgent);
            return ResponseEntity.ok(savedContact);
        } catch (Exception e) {
            log.error("Error saving contact: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Contact>> getAllContacts() {
        log.debug("GET /api/contact/all - Fetching all contacts");
        List<Contact> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<Contact>> getUnreadContacts() {
        log.debug("GET /api/contact/unread - Fetching unread contacts");
        List<Contact> contacts = contactService.getUnreadContacts();
        return ResponseEntity.ok(contacts);
    }
    
    @GetMapping("/unreplied")
    public ResponseEntity<List<Contact>> getUnrepliedContacts() {
        log.debug("GET /api/contact/unreplied - Fetching unreplied contacts");
        List<Contact> contacts = contactService.getUnrepliedContacts();
        return ResponseEntity.ok(contacts);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        log.debug("GET /api/contact/{} - Fetching contact by id", id);
        return contactService.getContactById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{id}/mark-read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        log.info("PATCH /api/contact/{}/mark-read - Marking contact as read", id);
        try {
            contactService.markAsRead(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            log.error("Error marking contact as read: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/mark-replied")
    public ResponseEntity<Void> markAsReplied(@PathVariable Long id) {
        log.info("PATCH /api/contact/{}/mark-replied - Marking contact as replied", id);
        try {
            contactService.markAsReplied(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            log.error("Error marking contact as replied: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        log.info("DELETE /api/contact/{} - Deleting contact", id);
        try {
            contactService.deleteContact(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            log.error("Error deleting contact: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search/email")
    public ResponseEntity<List<Contact>> searchByEmail(@RequestParam String email) {
        log.debug("GET /api/contact/search/email?email={} - Searching contacts by email", email);
        List<Contact> contacts = contactService.searchContactsByEmail(email);
        return ResponseEntity.ok(contacts);
    }
    
    @GetMapping("/search/name")
    public ResponseEntity<List<Contact>> searchByName(@RequestParam String name) {
        log.debug("GET /api/contact/search/name?name={} - Searching contacts by name", name);
        List<Contact> contacts = contactService.searchContactsByName(name);
        return ResponseEntity.ok(contacts);
    }
    
    @GetMapping("/stats/count")
    public ResponseEntity<Long> getContactCountSince(@RequestParam String since) {
        log.debug("GET /api/contact/stats/count?since={} - Getting contact count", since);
        try {
            LocalDateTime sinceDate = LocalDateTime.parse(since);
            Long count = contactService.getContactCountSince(sinceDate);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            log.error("Error parsing date or getting count: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}