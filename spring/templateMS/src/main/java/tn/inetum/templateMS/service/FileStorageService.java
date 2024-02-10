package tn.inetum.templateMS.service;

import java.io.IOException;
import java.util.stream.Stream;

import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.inetum.templateMS.entity.FileDB;
import tn.inetum.templateMS.repository.FileDBRepository;

@Service
public class FileStorageService {
    @Autowired
    private FileDBRepository fileDBRepository;
    public FileDB store(MultipartFile file) throws IOException {
        PdfReader reader = new PdfReader( file.getBytes());
        Rectangle cropBox = reader.getCropBox(1);
        Double width  = Double.valueOf(cropBox.getWidth());
        Double height  = Double.valueOf(cropBox.getHeight());
        int nbrPage = reader.getNumberOfPages();
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        float size=reader.getXrefSize();
        FileDB fileDB = new FileDB(fileName, file.getContentType(), file.getBytes(),nbrPage,width,height,size);
        return fileDBRepository.save(fileDB);
    }
    public FileDB getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    public Stream<FileDB> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }
}