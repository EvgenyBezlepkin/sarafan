package letscode.sarafan.controller;

import letscode.sarafan.domain.Message;
import letscode.sarafan.exceptions.NotFoundException;
import letscode.sarafan.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("messages")
public class A {

    @Autowired
    private MessageRepository messageRepository;

    @GetMapping
    public List<Message> getMessageList() {
        return messageRepository.findAll();
    }

    @GetMapping("{id}")
    public Message getMessage(@PathVariable("id") Message message) {
        return message;
    }

    @PostMapping
    public Map<String, String> putMessage(@RequestBody Message message) {
        messageRepository.save(message);
        return message;
    }

    @PutMapping("{id}")
    public Map<String, String> updateMessage(@PathVariable String id, @RequestBody Map<String, String> message){
        Map<String, String> getMessage = findMessage(id);
        getMessage.put("text", message.get("text"));
        return getMessage;
    }

    @DeleteMapping("{id}")
    public void deleteMessage(@PathVariable String id) {
        Map<String, String> message = findMessage(id);
        messages.remove(message);
    }

    private Map<String, String> findMessage(@PathVariable String id) {
        return messages
                .stream()
                .filter(message -> message.get("id").equals(id))
                .findFirst()
                .orElseThrow(NotFoundException::new);
    }
}
