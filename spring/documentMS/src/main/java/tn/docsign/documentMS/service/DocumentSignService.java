package tn.docsign.documentMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.docsign.documentMS.dto.DocumentSignDTO;
import tn.docsign.documentMS.dto.DocumentSignDTOout;
import tn.docsign.documentMS.entity.DocumentSign;
import tn.docsign.documentMS.mapper.DocumentSignMapper;
import tn.docsign.documentMS.mapper.PlaceholderMapper;
import tn.docsign.documentMS.repository.DocumentSignRepository;
import tn.docsign.documentMS.repository.FolderDocRepository;
import tn.docsign.documentMS.repository.PlaceholderRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentSignService {
    @Autowired
    DocumentSignRepository documentSignRepository;
    @Autowired
    DocumentSignMapper documentSignMapper;
    @Autowired
    NewForm newForm;
    @Autowired
    PlaceholderRepository placeholderRepository;
    @Autowired
    PlaceholderMapper placeholderMapper;
    @Autowired
    FolderDocRepository folderDocRepository;
    @Autowired
    UserServiceProxy userServiceProxy;



    public DocumentSignDTO create(DocumentSignDTO documentSignDTO) {
      //  if(documentSignDTO.getFolder().getIdFolder().isEmpty()) documentSignDTO.setFolder(folderDocRepository.getById("1"));
        DocumentSign documentSign= documentSignMapper.DocumentSignDTOToDocumentSign(documentSignDTO);
        documentSign.setAllDocumentSign((int) documentSign.getPlaceholders().stream().count());
        documentSign.setCurrentDocumentSign(0);
        DocumentSign t= documentSignRepository.save(documentSign);
 try {
            newForm.createFrom(t);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //   t.getPlaceholders().forEach((Placeholder x) ->{  this.newForm.setElements(x.getElements());});

        return  documentSignMapper.DocumentSignToDocumentSignDTO(t);
    }




    public DocumentSignDTO rejected(DocumentSignDTO documentSignDTO) {
        DocumentSign documentSign=   documentSignRepository.findById(documentSignDTO.getIdDocumentSign()). get() ;

        documentSign.setStatus("ignored");
        DocumentSign t= documentSignRepository.save(documentSign);

        return  documentSignMapper.DocumentSignToDocumentSignDTO(t);
    }
    public DocumentSignDTO sign(DocumentSignDTO documentSignDTO) {

        DocumentSign documentSign= documentSignMapper.DocumentSignDTOToDocumentSign(documentSignDTO);
        DocumentSign t= documentSignRepository.save(documentSign);
        try {
            newForm.verifynextormail(t);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return  documentSignMapper.DocumentSignToDocumentSignDTO(t);
    }
    public DocumentSignDTO consulte(String idDoc) {
        DocumentSign documentSign= documentSignRepository.findById(idDoc).get();
        documentSign.setStatus("consulted");
        DocumentSign t= documentSignRepository.save(documentSign);

        return  documentSignMapper.DocumentSignToDocumentSignDTO(t);

    }

    public List<DocumentSignDTO> findAll(){
        documentSignRepository.findAll().forEach(x->x.setCreatedBy(userServiceProxy.findUserById(x.getIdCreatedBy())));
        return documentSignRepository.findAll().stream().map(x->documentSignMapper.DocumentSignToDocumentSignDTO(x)).collect(Collectors.toList());
    }

    public List<DocumentSignDTO> findCreatedByMe(String idOwner){
        documentSignRepository.findByIdCreatedBy(idOwner).forEach(x->x.setCreatedBy(userServiceProxy.findUserById(x.getIdCreatedBy())));
        return documentSignRepository.findByIdCreatedBy(idOwner).stream().map(x->documentSignMapper. DocumentSignToDocumentSignDTO(x)).collect(Collectors.toList());
    }
    public List<DocumentSignDTO> findShareWithMe( String idUser){
        documentSignRepository.findSharedByIdOwner(idUser).forEach(x->x.setCreatedBy(userServiceProxy.findUserById(x.getIdCreatedBy())));
        return documentSignRepository.findSharedByIdOwner(idUser).stream().map(x->documentSignMapper.DocumentSignToDocumentSignDTO(x)).collect(Collectors.toList());
    }

    public List<DocumentSignDTO> findCreatedAndShareWithMe( String idUser){

        documentSignRepository.findShareAndCreatedIdOwner(idUser).forEach(x->x.setCreatedBy(userServiceProxy.findUserById(x.getIdCreatedBy())));
        return documentSignRepository.findShareAndCreatedIdOwner(idUser).stream().map(x->documentSignMapper.DocumentSignToDocumentSignDTO(x)).collect(Collectors.toList());
    }

    public DocumentSignDTO findById(String id) {

        // t.setOwner(userServiceProxy.findUserById(t.getIdOwner()));
        return this.documentSignRepository.findById(id).map(x->  documentSignMapper.DocumentSignToDocumentSignDTO(x)).orElseThrow(IllegalStateException::new);
    }
    public DocumentSignDTO findByIdd(String id) {

       DocumentSign documentSign= this.documentSignRepository.findById(id).get();
        documentSign.setStatus("consulted");
        documentSignRepository.save(documentSign);
        return this.documentSignRepository.findById(id).map(x->  documentSignMapper.DocumentSignToDocumentSignDTO(x)).orElseThrow(IllegalStateException::new);
    }
    public DocumentSignDTOout findByIdForChangePlaceholder(String id) {
        // t.setOwner(userServiceProxy.findUserById(t.getIdOwner()));
        return this.documentSignRepository.findById(id).map(x->  documentSignMapper.DocumentSignToDocumentSignDTOout(x)).orElseThrow(IllegalStateException::new);
    }



    public DocumentSignDTO update(DocumentSignDTO documentSignDTO) {
        DocumentSign documentSign= documentSignMapper.DocumentSignDTOToDocumentSign (documentSignDTO);
        DocumentSign t= documentSignRepository.save(documentSign);
        return  documentSignMapper.DocumentSignToDocumentSignDTO(t);
    }


    public  DocumentSignDTO createFromCopy(DocumentSignDTO documentSignDTO)
    {
        DocumentSignDTOout documentSignOut = documentSignMapper.DocumentSignToDocumentSignDTOout(documentSignMapper.DocumentSignDTOToDocumentSign(documentSignDTO));
        DocumentSign d =documentSignMapper.DocumentSignDTOoutToDocumentSign(documentSignOut);

        return  documentSignMapper.DocumentSignToDocumentSignDTO(documentSignRepository.save(d));
    }

    public void delete(String id) {
        this.documentSignRepository.deleteById(id);

    }






}







