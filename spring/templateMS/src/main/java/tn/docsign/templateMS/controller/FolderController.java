package tn.docsign.templateMS.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.docsign.templateMS.entity.Folder;
import tn.docsign.templateMS.repository.FolderRepository;


import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/folders")
public class FolderController {
    @Autowired
    private FolderRepository folderRepository;


    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Folder> getAllByIdUser(@PathVariable String id){
        return this.folderRepository.findByIdOwner(id);
    }



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Folder save(@RequestBody Folder foler) {
        return this.folderRepository.save(foler);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        this.folderRepository.deleteById(id);
    }

}