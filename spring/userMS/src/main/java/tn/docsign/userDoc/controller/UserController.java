package tn.docsign.userDoc.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.docsign.userDoc.dto.*;
import tn.docsign.userDoc.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

@Autowired
UserService userService;

@GetMapping
@ResponseStatus(HttpStatus.OK)
    public List<UserResponseDTO> allUsers(){
        return userService.listUsers();

    }




@PostMapping( consumes = {"application/json"})
@ResponseStatus(HttpStatus.CREATED)

    public UserResponseDTO save (@RequestBody UserRequestDTO userRequestDTO) {
    return this.userService.save(userRequestDTO);
}
@PostMapping("/savewithmail")
    @ResponseStatus(HttpStatus.CREATED)

    public UserResponseDTO savewithmail (@RequestBody UserRequestDTO userRequestDTO) {
        return this.userService.saveandsendmail(userRequestDTO);
    }
@GetMapping("/{id}")
@ResponseStatus(HttpStatus.OK)
    public  UserResponseDTO getUserById (@PathVariable String id){
    return userService.getUser(id);
    }

    @PutMapping("/pause")
    public UserResponseDTO pause(@RequestBody String idUser) {
        return this.userService.pause(idUser);
    }
    @PutMapping("/play")
    public UserResponseDTO play(@RequestBody String idUser) {
        return this.userService.play(idUser);
    }

    @GetMapping("/org/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrganizationResponseDTO getorgByIdadmin (@PathVariable String id){
        return userService.getorgbyidadmin(id);
    }
    @PutMapping("/updateimage")
    public UserResponseDTO updateimage(@RequestBody Imagedto image) {
        return this.userService.updateimage(image);
    }

    @PutMapping("/update")
    public UserResponseDTO updateUser(@RequestBody UserRequestDTO userRequestDTO) {
        return this.userService.update(userRequestDTO);
    }


    @GetMapping("/userofOrg/{idOrg}")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponseDTO> getUserOfSameOrg (@PathVariable String idOrg){
        return userService.getUserOfSameOrg(idOrg);
    }

}

