package tech.yicode.portfolio.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.yicode.portfolio.entity.Contact;
import tech.yicode.portfolio.repository.ContactRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ContactService {
    
    private final ContactRepository contactRepository;
    private final JavaMailSender mailSender;
    
    @Value("${app.email.from}")
    private String fromEmail;
    
    @Value("${app.email.admin}")
    private String adminEmail;
    
    public Contact saveContact(Contact contact, String ipAddress, String userAgent) {
        log.info("Saving new contact message from: {}", contact.getEmail());
        
        contact.setIpAddress(ipAddress);
        contact.setUserAgent(userAgent);
        contact.setIsRead(false);
        contact.setIsReplied(false);
        
        Contact savedContact = contactRepository.save(contact);
        
        // Send notification email to admin
        try {
            sendAdminNotification(savedContact);
        } catch (Exception e) {
            log.error("Failed to send admin notification email", e);
            // Don't fail the contact save if email fails
        }
        
        // Send confirmation email to user
        try {
            sendUserConfirmation(savedContact);
        } catch (Exception e) {
            log.error("Failed to send user confirmation email", e);
            // Don't fail the contact save if email fails
        }
        
        return savedContact;
    }
    
    @Transactional(readOnly = true)
    public List<Contact> getAllContacts() {
        log.debug("Fetching all contacts");
        return contactRepository.findAllByOrderByCreatedAtDesc();
    }
    
    @Transactional(readOnly = true)
    public List<Contact> getUnreadContacts() {
        log.debug("Fetching unread contacts");
        return contactRepository.findByIsReadFalseOrderByCreatedAtDesc();
    }
    
    @Transactional(readOnly = true)
    public List<Contact> getUnrepliedContacts() {
        log.debug("Fetching unreplied contacts");
        return contactRepository.findByIsRepliedFalseOrderByCreatedAtDesc();
    }
    
    @Transactional(readOnly = true)
    public Optional<Contact> getContactById(Long id) {
        log.debug("Fetching contact by id: {}", id);
        return contactRepository.findById(id);
    }
    
    public void markAsRead(Long id) {
        log.info("Marking contact as read: {}", id);
        
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contact not found with id: " + id));
        
        contact.setIsRead(true);
        contactRepository.save(contact);
    }
    
    public void markAsReplied(Long id) {
        log.info("Marking contact as replied: {}", id);
        
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contact not found with id: " + id));
        
        contact.setIsReplied(true);
        contactRepository.save(contact);
    }
    
    public void deleteContact(Long id) {
        log.info("Deleting contact with id: {}", id);
        
        if (!contactRepository.existsById(id)) {
            throw new IllegalArgumentException("Contact not found with id: " + id);
        }
        
        contactRepository.deleteById(id);
    }
    
    @Transactional(readOnly = true)
    public List<Contact> getContactsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        log.debug("Fetching contacts between {} and {}", startDate, endDate);
        return contactRepository.findByDateRange(startDate, endDate);
    }
    
    @Transactional(readOnly = true)
    public Long getContactCountSince(LocalDateTime date) {
        log.debug("Counting contacts since: {}", date);
        return contactRepository.countContactsSince(date);
    }
    
    @Transactional(readOnly = true)
    public List<Contact> searchContactsByEmail(String email) {
        log.debug("Searching contacts by email: {}", email);
        return contactRepository.findByEmailContainingIgnoreCase(email);
    }
    
    @Transactional(readOnly = true)
    public List<Contact> searchContactsByName(String name) {
        log.debug("Searching contacts by name: {}", name);
        return contactRepository.findByNameContainingIgnoreCase(name);
    }
    
    private void sendAdminNotification(Contact contact) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(adminEmail);
        message.setSubject("New Contact Message - Portfolio Website");
        message.setText(buildAdminNotificationText(contact));
        
        mailSender.send(message);
        log.info("Admin notification email sent for contact: {}", contact.getId());
    }
    
    private void sendUserConfirmation(Contact contact) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(contact.getEmail());
        message.setSubject("Thank you for contacting me!");
        message.setText(buildUserConfirmationText(contact));
        
        mailSender.send(message);
        log.info("User confirmation email sent to: {}", contact.getEmail());
    }
    
    private String buildAdminNotificationText(Contact contact) {
        return String.format(
            "New contact message received:\n\n" +
            "Name: %s\n" +
            "Email: %s\n" +
            "Message:\n%s\n\n" +
            "Received at: %s\n" +
            "IP Address: %s\n" +
            "User Agent: %s",
            contact.getName(),
            contact.getEmail(),
            contact.getMessage(),
            contact.getCreatedAt(),
            contact.getIpAddress(),
            contact.getUserAgent()
        );
    }
    
    private String buildUserConfirmationText(Contact contact) {
        return String.format(
            "Hi %s,\n\n" +
            "Thank you for reaching out! I've received your message and will get back to you as soon as possible.\n\n" +
            "Your message:\n%s\n\n" +
            "Best regards,\n" +
            "Yi Developer\n" +
            "YiCode.Tech",
            contact.getName(),
            contact.getMessage()
        );
    }
}