package letscode.sarafan.controller;

import letscode.sarafan.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    MessageRepository messageRepository;

    @GetMapping
    public String getIndex(Model model){

        model.addAttribute("messages", messageRepository.findAll());

        return "index";
    }
}
