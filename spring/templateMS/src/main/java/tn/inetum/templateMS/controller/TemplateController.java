package tn.inetum.templateMS.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.inetum.templateMS.dto.TemplateDTO;
import tn.inetum.templateMS.dto.TemplateDTOout;
import tn.inetum.templateMS.service.PlaceholderService;
import tn.inetum.templateMS.service.TemplateService;
import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/templates")
public class TemplateController {
    @Autowired
    private PlaceholderService placeholderService;
     @Autowired
    private TemplateService  templateService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TemplateDTO> getAll(){
        return this.templateService.findAll();
    }

    @GetMapping("/sharedwithme/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public List<TemplateDTO> getSharedWithMe(@PathVariable String idUser){
        return this.templateService.findShareWithMe(idUser);
    }
    @GetMapping("/createdbyme/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public List<TemplateDTO> getCreatedByMe(@PathVariable String idUser){
        return this.templateService.findCreatedByMe(idUser);
    }
    @GetMapping("/createdsharedwithme/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public List<TemplateDTO> getCreatedAndSharedWithMe(@PathVariable String idUser){
        return this.templateService.findCreatedAndShareWithMe(idUser);
    }


    @GetMapping("/new/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TemplateDTOout findByIdfornew(@PathVariable String id) {
        return this.templateService.findByIdForChangePlaceholder(id);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public TemplateDTO postCopy(@RequestBody TemplateDTO templateDTO) {
        return this.templateService.createFromCopy(templateDTO);

         }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TemplateDTO findById(@PathVariable String id) {

        return this.templateService.findById(id);
    }



    @PutMapping()
    public TemplateDTO update(@RequestBody TemplateDTO templateDTO) {
        return this.templateService.update(templateDTO);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TemplateDTO save(@RequestBody TemplateDTO templateDTO) {
        return this.templateService.create(templateDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        this.templateService.delete(id);
    }

}