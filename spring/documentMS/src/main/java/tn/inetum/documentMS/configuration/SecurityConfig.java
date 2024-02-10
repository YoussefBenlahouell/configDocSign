package tn.inetum.documentMS.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;

import javax.ws.rs.HttpMethod;

@Configuration
@EnableWebSecurity
public  class    SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    public  void configure (HttpSecurity security ) throws  Exception{
        security.csrf().disable()
                .authorizeRequests().antMatchers(HttpMethod.GET,"/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);

    }

}