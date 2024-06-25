package tn.docsign.templateMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.docsign.templateMS.dto.ShareWithDTOin;
import tn.docsign.templateMS.entity.ShareWith;

import tn.docsign.templateMS.entity.Template;
import tn.docsign.templateMS.repository.ShareWithRepository;
import tn.docsign.templateMS.repository.TemplateRepository;

import java.util.List;


@Service
public class ShareWithService {
    @Autowired
    ShareWithRepository shareWithRepository;
    @Autowired
    TemplateRepository templateRepository;


    public List<ShareWith> findAll(){
        return shareWithRepository.findAll();
    }


    public ShareWith findById(String id) {
        return this.shareWithRepository.findById(id).get();

    }

    public ShareWith create(ShareWithDTOin share) {
    ShareWith shareWith=new ShareWith();
          Template template=new Template();
          template=templateRepository.findById(share.getIdtemplate()).get();
          shareWith.setCanShare(share.getCanShare());
        shareWith.setCanDelete(share.getCanDelete());
        shareWith.setCanEdit(share.getCanEdit());
        shareWith.setCanUse(share.getCanUse());
        shareWith.setTemplate(template);
        shareWith.setIdUser(share.getIdUser());
        return   shareWithRepository.save(shareWith);
    }

    public void delete(String id) {

        this.shareWithRepository.deleteById(id);
    }

}
