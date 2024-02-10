package tn.inetum.templateMS.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.inetum.templateMS.dto.MailDTO;

import tn.inetum.templateMS.service.MailService;


import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/mails")
public class MailController {
    @Autowired
    private MailService mailService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MailDTO> getAll(){
        return this.mailService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MailDTO findById(@PathVariable String id) {
        return this.mailService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MailDTO save(@RequestBody MailDTO mailDTO) {
        return this.mailService.create(mailDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        this.mailService.delete(id);
    }

    @GetMapping("/id")
    @ResponseStatus(HttpStatus.OK)
    public String getAllByIdUser(@PathVariable String idUser){
        return idUser;
        //  return this.folderDocRepository.findByIdCreatedBy(id);
    }



}