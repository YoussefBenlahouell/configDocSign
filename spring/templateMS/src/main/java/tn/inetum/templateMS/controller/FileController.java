package tn.inetum.templateMS.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import tn.inetum.templateMS.entity.FileDB;
import tn.inetum.templateMS.entity.ResponseFile;
import tn.inetum.templateMS.entity.ResponseMessage;
import tn.inetum.templateMS.service.FileDeleteService;
import tn.inetum.templateMS.service.FileStorageService;

@Controller

public class FileController {
    @Autowired
    private FileStorageService storageService;
    @Autowired
    private FileDeleteService deleteService;
    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";String id="";
        try {

            Object result= storageService.store(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message,id,result));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message,id));
        }
    }
    @GetMapping("/files")
    public ResponseEntity<List<ResponseFile>> getListFiles() {
        List<ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId())
                    .toUriString();
            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length,
                    dbFile.getId());
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }
    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
    }
    @GetMapping("/filee/{id}")
    public ResponseEntity<byte[]> getFilee(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);
        return ResponseEntity.ok()

                .body(fileDB.getData());
    }

    @GetMapping("/fil/{id}")
    public FileDB getFil(@PathVariable String id) {
        FileDB fileDB = storageService.getFile(id);
        return  fileDB;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseMessage> deleteFile(@PathVariable String id) {
        String message = "";
        try {
            deleteService.delete(id);
            message = "Delete the file successfully ";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not delete the file  ! "  ;
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }
}