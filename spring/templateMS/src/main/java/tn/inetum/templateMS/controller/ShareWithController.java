package tn.inetum.templateMS.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import tn.inetum.templateMS.dto.ShareWithDTOin;
import tn.inetum.templateMS.entity.ShareWith;

import tn.inetum.templateMS.service.ShareWithService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sharetemplate")
public class ShareWithController {

    @Autowired
    private ShareWithService shareWithService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ShareWith> getAll(){
        return this.shareWithService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ShareWith findById(@PathVariable String id) {
        return this.shareWithService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ShareWith save(@RequestBody ShareWithDTOin share) {
        return this.shareWithService.create(share);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        this.shareWithService.delete(id);
    }
}
