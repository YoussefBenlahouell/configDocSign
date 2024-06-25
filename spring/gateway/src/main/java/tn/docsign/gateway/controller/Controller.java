package tn.docsign.gateway.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin(origins ="*")
@RequestMapping(path="/api")
public class Controller {

    @GetMapping("/test")
    public String index( ) {
        return "principal.getName()";
    }
}
