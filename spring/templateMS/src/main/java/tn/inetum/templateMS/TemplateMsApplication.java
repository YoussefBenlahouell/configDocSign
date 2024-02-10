package tn.inetum.templateMS;

import feign.RequestInterceptor;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import   org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

@SpringBootApplication
@EnableFeignClients
@EnableEurekaClient
public class TemplateMsApplication {

	public static void main(String[] args) throws IOException {

		SpringApplication.run(TemplateMsApplication.class, args);}
		@Bean
		public RequestInterceptor requestTokenBearerInterceptor(){
			return   requestTemplate ->
			{

					JwtAuthenticationToken token =(JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
					requestTemplate.header("Authorization","Bearer " + token.getToken().getTokenValue());

			};
	}

}


