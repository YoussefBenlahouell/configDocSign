
package tn.docsign.documentMS.controller;

        import lombok.RequiredArgsConstructor;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.web.bind.annotation.*;
        import tn.docsign.documentMS.dto.DocumentSignDTO;
        import tn.docsign.documentMS.dto.DocumentSignDTOout;

        import tn.docsign.documentMS.service.DocumentSignService;
        import tn.docsign.documentMS.service.PlaceholderService;


        import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/documents")

public class DocumentSignController {
    @Autowired
    private DocumentSignService documentSignService;
    @Autowired
    private PlaceholderService placeholderService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentSignDTO> getAll(){
        return this.documentSignService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public DocumentSignDTO findById(@PathVariable String id) {
        return this.documentSignService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DocumentSignDTO save(@RequestBody DocumentSignDTO documentSignDTO) {
        return this.documentSignService.create(documentSignDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        this.documentSignService.delete(id);
    }


    @GetMapping("/forsigner/{id}")
    @ResponseStatus(HttpStatus.OK)
    public DocumentSignDTO findByIdd(@PathVariable String id) {
        return this.documentSignService.findByIdd(id);
    }




    @GetMapping("/sharedwithme/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentSignDTO> getSharedWithMe(@PathVariable String idUser){
        return this.documentSignService.findShareWithMe(idUser);
    }
    @GetMapping("/createdbyme/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentSignDTO> getCreatedByMe(@PathVariable String idUser){
        return this.documentSignService.findCreatedByMe(idUser);
    }
    @GetMapping("/createdsharedwithme/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public List<DocumentSignDTO> getCreatedAndSharedWithMe(@PathVariable String idUser){
        return this.documentSignService.findCreatedAndShareWithMe(idUser);
    }


    @GetMapping("/new/{id}")
    @ResponseStatus(HttpStatus.OK)
    public DocumentSignDTOout  findByIdfornew(@PathVariable String id) {
        return this.documentSignService.findByIdForChangePlaceholder(id);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public DocumentSignDTO postCopy(@RequestBody DocumentSignDTO documentSignDTO) {
        return this.documentSignService.createFromCopy(documentSignDTO);
    }



    @PutMapping("/change/rejected")

    public DocumentSignDTO changeRejected(@RequestBody DocumentSignDTO documentSignDTO) {
        return this.documentSignService.rejected(documentSignDTO);
    }
    @PutMapping("/change/sign")
    @ResponseStatus(HttpStatus.CREATED)
    public DocumentSignDTO changeSign(@RequestBody DocumentSignDTO documentSignDTO) {
        return this.documentSignService.sign(documentSignDTO);
    }

    @PutMapping("/change/consulte/{idDoc}")
    @ResponseStatus(HttpStatus.CREATED)
    public DocumentSignDTO changeconsulte(@PathVariable String   idDoc) {
        return this.documentSignService.consulte(idDoc);
    }






}