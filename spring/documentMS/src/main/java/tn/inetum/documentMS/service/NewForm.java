package tn.inetum.documentMS.service;

import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.io.IOUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
        import org.apache.pdfbox.pdmodel.PDPage;
        import org.apache.pdfbox.pdmodel.PDResources;
        import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
        import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationWidget;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDSignatureField;
import org.apache.pdfbox.pdmodel.interactive.form.PDTextField;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import java.util.concurrent.atomic.AtomicReference;

import org.springframework.mock.web.MockMultipartFile;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.inetum.documentMS.controller.FileController;
import tn.inetum.documentMS.entity.*;
import tn.inetum.documentMS.repository.DocumentSignRepository;

import javax.mail.MessagingException;

@Service
public class NewForm {

@Autowired
EmailSenderToSign emailSenderToSign;
@Autowired
    FileController fileController;
@Autowired
    FileStorageService fileStorageService;
@Autowired
DocumentSignRepository documentSignRepository;
    @Autowired
    UserServiceProxy userServiceProxy;

    public void  createFrom(DocumentSign documentSign) throws Exception{
        if( documentSign.getTypeofSend().equals("parallel") )  sendParallel(documentSign);
        else sendSerial(documentSign);



    }


public  void sendParallel(DocumentSign documentSign) throws IOException {




    documentSign.getPlaceholders().forEach
            ((Placeholder placeholder)-> {
                PDDocument pdDocument= null;
                try {
                    pdDocument = PDDocument.load(fileStorageService.getFile(documentSign.getFilePdf().getId()).getData());

                    PDDocument finalPdDocument = pdDocument;
                    PDAcroForm form = new PDAcroForm(finalPdDocument);
                    finalPdDocument.getDocumentCatalog().setAcroForm(form);
                    String defaultAppearanceString = "/Helv 12 Tf 0 g";
                    form.setDefaultAppearance(defaultAppearanceString);
                    placeholder.getElements().forEach((Element element) -> {
                            KonvaElement konvaElement = new KonvaElement();
                     Double scaleX= (element.getAttrs().getScaleX()==null) ? 1:element.getAttrs().getScaleX() ;
                        Double scaleY= (element.getAttrs().getScaleY()==null) ? 1:element.getAttrs().getScaleY() ;

                        String text =element.getChildren().stream().findFirst().get().getAttrs().getText();
                        konvaElement.setVariable(element.getAttrs().getWidth(),
                                    element.getAttrs().getHeight(),
                                     scaleX,
                                     scaleY,
                                    element.getAttrs().getX(),
                                    element.getAttrs().getY(),
                                    text,
                                    documentSign.getFilePdf().getHeight()
                                    , documentSign.getFilePdf().getNbrPage()
                            );
                            PDPage page = finalPdDocument.getPage(konvaElement.getPageElement());

                            PDFont font = PDType1Font.HELVETICA;
                            PDResources resources = new PDResources();
                            resources.put(COSName.getPDFName("Helv"), font);
                            form.setDefaultResources(resources);

                            try {
                                addField(form,page,konvaElement);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }

                        }
                );



                 File   file = File.createTempFile(placeholder.getIdPlaceholder(), ".pdf");
                    pdDocument.save(file);
                    FileInputStream input = new FileInputStream(file);
                    MultipartFile multipartFile = new MockMultipartFile("file",
                            file.getName(), "application/pdf", IOUtils.toByteArray(input));

                 documentSign.setFilePdf(fileStorageService.store(multipartFile));

                 documentSignRepository.save(documentSign);

            //   String idSavedFile=fileStorageService.store(multipartFile).getId();






                    String s=userServiceProxy.findUserById(documentSign.getIdCreatedBy()).getFnameUser()+userServiceProxy.findUserById(documentSign.getIdCreatedBy()).getLnameUser();

                          emailSenderToSign.sendHtmlMessage(placeholder.getNameRecipient(),placeholder.getEmailRecipient(),documentSign.getMail().getSubjectMail(),documentSign.getMail().getMessageMail(),s,documentSign.getIdDocumentSign());
                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                    }

            );

}
    public  void  verifynextormail( DocumentSign documentSign){
        if(documentSign.getAllDocumentSign()==documentSign.getCurrentDocumentSign()) sendfinishmail(documentSign) ;
        else sendSerial(documentSign) ;
    }


public  void  sendfinishmail( DocumentSign documentSign){
documentSign.getPlaceholders().forEach(placeholder->{
    try {
        emailSenderToSign.copyfinalMail(placeholder.getNameRecipient(),placeholder.getEmailRecipient());
    } catch (MessagingException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
});

 }
public  void sendSerial(DocumentSign documentSign){

 //  AtomicReference<Integer> i= new AtomicReference<>(0);
   Integer j=documentSign.getCurrentDocumentSign()+1  ;
    documentSign.getPlaceholders().forEach
            ((Placeholder placeholder)-> {

                       // i.set(i.get() + 1);
                        if ( placeholder.getOrderPlaceholder()== j ){
                        PDDocument pdDocument= null;
                        try {
                            pdDocument = PDDocument.load(fileStorageService.getFile(documentSign.getFilePdf().getId()).getData());

                            PDDocument finalPdDocument = pdDocument;
                            PDAcroForm form = new PDAcroForm(finalPdDocument);
                            finalPdDocument.getDocumentCatalog().setAcroForm(form);
                            String defaultAppearanceString = "/Helv 12 Tf 0 g";
                            form.setDefaultAppearance(defaultAppearanceString);
                            placeholder.getElements().forEach((Element element) -> {
                                        KonvaElement konvaElement = new KonvaElement();
                                        Double scaleX= (element.getAttrs().getScaleX()==null) ? 1:element.getAttrs().getScaleX() ;
                                        Double scaleY= (element.getAttrs().getScaleY()==null) ? 1:element.getAttrs().getScaleY() ;

                                        String text =element.getChildren().stream().findFirst().get().getAttrs().getText();
                                        konvaElement.setVariable(element.getAttrs().getWidth(),
                                                element.getAttrs().getHeight(),
                                                scaleX,
                                                scaleY,
                                                element.getAttrs().getX(),
                                                element.getAttrs().getY(),
                                                text,
                                                documentSign.getFilePdf().getHeight()
                                                , documentSign.getFilePdf().getNbrPage()
                                        );
                                        PDPage page = finalPdDocument.getPage(konvaElement.getPageElement());

                                        PDFont font = PDType1Font.HELVETICA;
                                        PDResources resources = new PDResources();
                                        resources.put(COSName.getPDFName("Helv"), font);
                                        form.setDefaultResources(resources);

                                        try {
                                            addField(form,page,konvaElement);
                                        } catch (IOException e) {
                                            e.printStackTrace();
                                        }

                                    }
                            );



                            File   file = File.createTempFile(placeholder.getIdPlaceholder(), ".pdf");
                            pdDocument.save(file);
                            FileInputStream input = new FileInputStream(file);
                            MultipartFile multipartFile = new MockMultipartFile("file",
                                    file.getName(), "application/pdf", IOUtils.toByteArray(input));

                            documentSign.setFilePdf(fileStorageService.store(multipartFile));
                            documentSign.setCurrentDocumentSign(documentSign.getCurrentDocumentSign()+1 );
                            documentSignRepository.save(documentSign);

                            //   String idSavedFile=fileStorageService.store(multipartFile).getId();






                            String s=userServiceProxy.findUserById(documentSign.getIdCreatedBy()).getFnameUser()+userServiceProxy.findUserById(documentSign.getIdCreatedBy()).getLnameUser();

                            emailSenderToSign.sendHtmlMessage(placeholder.getNameRecipient(),placeholder.getEmailRecipient(),documentSign.getMail().getSubjectMail(),documentSign.getMail().getMessageMail(),s,documentSign.getIdDocumentSign());
                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                    }}

            );
    }

    public  void addField(PDAcroForm acroForm,PDPage page,KonvaElement element ) throws IOException {

        String s= element.getTextElement();
       if(s.equals("Signature"))
        {
            PDSignatureField signatureBox = new PDSignatureField(acroForm);

            signatureBox.setPartialName("ENSGN-MY_SIGNATURE_FIELD-001");

            acroForm.getFields().add(signatureBox);

            PDAnnotationWidget widget = signatureBox.getWidgets().get(0);

            PDRectangle rect = new PDRectangle( element.getXElement().floatValue(), element.getYElement().floatValue(), element.getWidthElement().floatValue(), element.getHeightElement().floatValue());
            widget.setRectangle(rect);
            widget.setPage(page);
            widget.setPrinted(true);

            // Add the widget annotation to the page
            page.getAnnotations().add(widget);
        }
        else{PDTextField textBox = new PDTextField(acroForm);
            textBox.setPartialName(s);
            acroForm.getFields().add(textBox);

            // Specify the widget annotation associated with the field
            PDAnnotationWidget widget = textBox.getWidgets().get(0);
            PDRectangle rect = new PDRectangle( element.getXElement().floatValue(), element.getYElement().floatValue(), element.getWidthElement().floatValue(), element.getHeightElement().floatValue());
            widget.setRectangle(rect);
            widget.setPage(page);
            widget.setPrinted(true);

            // Add the widget annotation to the page
            page.getAnnotations().add(widget);

            // set the field value
            textBox.setValue(s);}

    }





}