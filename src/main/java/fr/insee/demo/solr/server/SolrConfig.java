package fr.insee.demo.solr.server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SolrConfig {

    final private static String PATH = "D:/wehdrc/Mes Documents/eclipse_workspace/seminaire-2017-js/demo-1/src/main/resources/solr/nafrev2";
    final private static String CORE_NAME = "nafrev2";

    @Bean
    public ServerFactory solrFactory() {
	return new EmbeddedServerFactory(PATH, CORE_NAME);
    }
}
