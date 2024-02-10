package tn.inetum.gateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

import javax.ws.rs.HttpMethod;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig    {

  @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    /*  http.authorizeExchange().pathMatchers("/user-service/user/**").permitAll();

        http.
                authorizeExchange(exchanges -> exchanges.anyExchange().authenticated()
                        )
        .oauth2Login(withDefaults());
         http.csrf().disable();
          http.oauth2ResourceServer().jwt();
         return http.build();
*/

             // .pathMatchers(HttpMethod.GET, "/managers-can-see-this-folder/**", "/and-this-page")
             // .hasRole("MANAGER")
              //.matchers(exchange -> new MediaTypeServerWebExchangeMatcher(MediaType.APPLICATION_PDF).matches(exchange))
            //  .hasRole("ADMIN")


     /* http .authorizeExchange().pathMatchers("user-service/**" ).permitAll();
      http .authorizeExchange() .anyExchange().authenticated() ;
      http.oauth2Login(withDefaults())
      .csrf().disable().oauth2ResourceServer().jwt();*/
      http.csrf().disable().authorizeExchange(exchabge->exchabge.pathMatchers(HttpMethod.POST,"/user").permitAll().
              pathMatchers(HttpMethod.GET,"/filees/**").permitAll()
              .anyExchange().authenticated()).oauth2ResourceServer(ServerHttpSecurity.OAuth2ResourceServerSpec::jwt);

      return http.build();


  }



/*
  
@Override
protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http.oauth2Login();//.successHandler(myAuthenticationHandler);
    http.authorizeRequests()
            // Access to "Menu Files Resource" is allowed (for test purpose)
             // All the rest need a valid token with Admin role claimed from the keycloak server.
            .antMatchers("/api/test").authenticated()

            .antMatchers("/user-service/test/user").permitAll()
            .anyRequest().permitAll()
            .and().logout()
            .logoutUrl("/perform_logout")
            .deleteCookies("JSESSIONID");
    http.oauth2ResourceServer().jwt();
    http.headers().frameOptions().sameOrigin();
}
*/
}