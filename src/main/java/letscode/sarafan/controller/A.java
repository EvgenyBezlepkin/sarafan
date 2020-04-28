package letscode.sarafan.controller;

import letscode.sarafan.domain.Message;
import letscode.sarafan.exceptions.NotFoundException;
import letscode.sarafan.repository.MessageRepository;
import org.springframework.beans.BeanUtils;
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
    public Message putMessage(@RequestBody Message message) {
        messageRepository.save(message);
        return message;
    }

    @PutMapping("{id}")
    public Message updateMessage(@PathVariable("id") Message messagefromDb, @RequestBody Message message){
        BeanUtils.copyProperties(message, messagefromDb, "id");
        return messageRepository.save(messagefromDb);
    }

    @DeleteMapping("{id}")
    public void deleteMessage(@PathVariable("id") Message message) {
        messageRepository.delete(message);
    }

}
