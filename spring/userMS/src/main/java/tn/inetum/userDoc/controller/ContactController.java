package tn.inetum.userDoc.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.inetum.userDoc.dto.ContactDTO;
import tn.inetum.userDoc.dto.Imagedto;
import tn.inetum.userDoc.dto.UserResponseDTO;
import tn.inetum.userDoc.service.ContactService;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/contacts")
public class ContactController   {
    @Autowired
    private ContactService contactService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ContactDTO> getAll(){
        return this.contactService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ContactDTO findById(@PathVariable Long id) {
        return this.contactService.findById(id);
    }

    @GetMapping("createdbyme/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<ContactDTO> createdByMe(@PathVariable String id) {
        return this.contactService.findallById(id);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactDTO save(@RequestBody ContactDTO contactDTO) {
        return this.contactService.create(contactDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id) {
        this.contactService.delete(id);
    }



    @PutMapping()
    public ContactDTO update(@RequestBody ContactDTO contactDTO) {
        return this.contactService.update(contactDTO);
    }


}
