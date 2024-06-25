package tn.docsign.userDoc.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gitconfig")
@RefreshScope
public class GitController {



    @GetMapping
    public String gitconfig(){
        return "zzé" ;
    }
}
