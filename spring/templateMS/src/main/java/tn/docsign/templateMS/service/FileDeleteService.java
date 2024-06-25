
package tn.docsign.templateMS.service;

        import java.io.IOException;
        import java.util.stream.Stream;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;
        import tn.docsign.templateMS.entity.FileDB;
        import tn.docsign.templateMS.repository.FileDBRepository;

@Service
public class FileDeleteService {
    @Autowired
    private FileDBRepository fileDBRepository;
    public void delete(String idfile) throws IOException {

          FileDB fileDB = getFile(idfile);
          fileDBRepository.delete(fileDB);
    }
    public FileDB getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    public Stream<FileDB> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }
}