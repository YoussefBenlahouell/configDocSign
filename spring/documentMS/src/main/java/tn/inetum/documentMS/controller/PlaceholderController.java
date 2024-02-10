package tn.inetum.documentMS.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;


import tn.inetum.documentMS.dto.PlaceholderDTOin;
import tn.inetum.documentMS.dto.PlaceholderDTOout;
import tn.inetum.documentMS.service.PlaceholderService;


import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping( "/placeholders")
public class PlaceholderController {

   @Autowired
   private PlaceholderService placeholderService;


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PlaceholderDTOout> getAll(){
        return this.placeholderService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PlaceholderDTOout findById(@PathVariable String id) {
        return this.placeholderService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PlaceholderDTOout save(@RequestBody PlaceholderDTOin placeholderdtoin) {
        return this.placeholderService.create(placeholderdtoin);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        this.placeholderService.delete(id);
    }

}