package tn.docsign.configServer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api")
public class controller {







    @GetMapping(path="/test")
    public String allUsers(){
        return "test";

    }
}