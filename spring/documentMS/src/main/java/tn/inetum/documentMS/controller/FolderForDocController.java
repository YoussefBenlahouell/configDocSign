package tn.inetum.documentMS.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import tn.inetum.documentMS.entity.Folderdoc;
import tn.inetum.documentMS.repository.FolderDocRepository;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/docfolders")
public class FolderForDocController {
@Autowired
private FolderDocRepository  folderDocRepository ;


@GetMapping("/{id}")
@ResponseStatus(HttpStatus.OK)
public List<Folderdoc> getAllByIdUser(@PathVariable String id){
      return this.folderDocRepository.findByIdCreatedBy(id);
        }



@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public Folderdoc save(@RequestBody Folderdoc foler) {
   return this.folderDocRepository.save(foler);
}

@DeleteMapping("/{id}")
@ResponseStatus(HttpStatus.OK)
public void delete(@PathVariable String id) {
            this.folderDocRepository.deleteById(id);
        }
}
