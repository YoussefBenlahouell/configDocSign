package tn.inetum.documentMS.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.inetum.documentMS.dto.ShareWithForDocDTOin;
import tn.inetum.documentMS.entity.ShareWithForDoc;
import tn.inetum.documentMS.service.ShareWithForDocService;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/sharedocument")
public class ShareWithForDocController {

    @Autowired
    private ShareWithForDocService shareWithForDocService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ShareWithForDoc> getAll(){
        return this.shareWithForDocService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ShareWithForDoc findById(@PathVariable String id) {
        return this.shareWithForDocService.findById(id);
    }

  /*  @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ShareWithForDoc save(@RequestBody ShareWithForDocDTOin share) {

        return this.shareWithForDocService.create(share);
    }
*/
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        this.shareWithForDocService.delete(id);
    }
}
