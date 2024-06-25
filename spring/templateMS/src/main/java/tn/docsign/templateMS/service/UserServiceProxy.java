package tn.docsign.templateMS.service;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.docsign.templateMS.entity.User;

@FeignClient(name= "user-service")
public interface UserServiceProxy {

 @GetMapping( value ="/user/{id}")
  public User findUserById( @PathVariable(name="id") String id);
}




