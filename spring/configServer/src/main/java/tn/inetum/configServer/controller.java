package tn.inetum.configServer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api")
public class controller {







    @GetMapping(path="/aa")
    public String allUsers(){
        return "hhhhhhhhhhhh";

    }
}