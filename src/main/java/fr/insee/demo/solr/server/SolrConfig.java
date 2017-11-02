package fr.insee.demo.solr.server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SolrConfig {

    @Bean
    public ServerFactory solrFactory() {
    	return new EmbeddedServerFactory("nafrev2");
    }
}
