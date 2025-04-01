package tn.docsign.gateway;

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
public class SecurityConfig {

  @Bean
  public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
            .csrf().disable()
            .authorizeExchange(exchanges -> exchanges
                    // Chemins Swagger explicitement listés
                    .pathMatchers("/user/swagger-ui/**").permitAll()
                    .pathMatchers("/filees/swagger-ui/**").permitAll()
                    .pathMatchers("/templates/swagger-ui/**").permitAll()
                    .pathMatchers("/user/v3/api-docs/**").permitAll()
                    .pathMatchers("/filees/v3/api-docs/**").permitAll()
                    .pathMatchers("/templates/v3/api-docs/**").permitAll()
                    // Tes règles existantes
                    .pathMatchers(HttpMethod.POST, "/user").permitAll()
                    .pathMatchers(HttpMethod.GET, "/filees/**").permitAll()
                    // Tout le reste nécessite une authentification
                    .anyExchange().authenticated()
            )
            .oauth2ResourceServer(ServerHttpSecurity.OAuth2ResourceServerSpec::jwt)
            .oauth2Login(withDefaults());

    return http.build();
  }
}