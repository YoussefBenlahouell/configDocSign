package tn.inetum.documentMS.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(path="/api")
public class test {

    @GetMapping("/test")
    public String index( ) {
        return "principal.getName();";

    }
}
