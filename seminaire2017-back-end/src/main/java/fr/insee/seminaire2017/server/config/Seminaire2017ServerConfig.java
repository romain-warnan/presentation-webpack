package fr.insee.seminaire2017.server.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.solr.SolrAutoConfiguration;
import org.springframework.core.env.AbstractEnvironment;

@SpringBootApplication(scanBasePackages={"fr.insee.seminaire2017"},exclude={SolrAutoConfiguration.class})
public class Seminaire2017ServerConfig {
	 public static void main(String[] args) {
		System.setProperty(AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME, "solr");
        SpringApplication.run(Seminaire2017ServerConfig.class, args);
    }
}
