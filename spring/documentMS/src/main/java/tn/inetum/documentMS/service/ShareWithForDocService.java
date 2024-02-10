package tn.inetum.documentMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.inetum.documentMS.dto.ShareWithForDocDTOin;
import tn.inetum.documentMS.entity.DocumentSign;
import tn.inetum.documentMS.entity.ShareWithForDoc;
import tn.inetum.documentMS.repository.DocumentSignRepository;
import tn.inetum.documentMS.repository.ShareWithForDocRepository;

import java.util.List;
@Service
public class ShareWithForDocService {

    @Autowired
    ShareWithForDocRepository  shareWithFordocRepository;
    @Autowired
    DocumentSignRepository documentSignRepository;


    public List<ShareWithForDoc> findAll(){
        return shareWithFordocRepository.findAll();
    }


    public ShareWithForDoc findById(String id) {
        return this.shareWithFordocRepository.findById(id).get();

    }

    public ShareWithForDoc create(ShareWithForDocDTOin share) {
        ShareWithForDoc shareWith=new ShareWithForDoc();
        DocumentSign documentSign=new DocumentSign();
        documentSign=documentSignRepository.findById(share.getIdDocumentSign()).get();
        shareWith.setCanShare(share.getCanShare());
        shareWith.setCanDelete(share.getCanDelete());
        shareWith.setDocumentSign(documentSign);
        shareWith.setIdUser(share.getIdUser());
        return   shareWithFordocRepository.save(shareWith);
    }

    public void delete(String id) {

        this.shareWithFordocRepository.deleteById(id);
    }


}
