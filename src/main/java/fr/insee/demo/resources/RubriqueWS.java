package fr.insee.demo.resources;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import fr.insee.demo.model.Rubrique;

@Profile("webservice")
@Component
public class RubriqueWS implements RubriqueResource {
	
	final private static String PATH = "http://localhost:1010/";
	
	private static Map<String, Rubrique> map = Maps.newHashMap();
	
	public Rubrique getRubrique(String niveau, String code) throws ResourceException{
		if(map.containsKey(code)){
			return map.get(code);
		} else {
			Client client = Client.create();
			WebResource webResource = client.resource(PATH + niveau + "/" + code);
			ClientResponse response = webResource.accept("application/json; charset=utf-8").get(ClientResponse.class);
					
			if (response.getStatus() != 200) {
				String error= response.getEntity(String.class);
				throw new ResourceException(error);
			}
			
			Rubrique rubrique = response.getEntity(Rubrique.class);
			map.put(code,  rubrique);
			
			return  rubrique;
		}
	}
	
	public List<Rubrique> getSections() throws ResourceException{		
		return Lists.newArrayList(
				getRubrique("section", "A"),
				getRubrique("section", "B"),
				getRubrique("section", "C"),
				getRubrique("section", "D"),
				getRubrique("section", "E"),
				getRubrique("section", "F"),
				getRubrique("section", "G"),
				getRubrique("section", "H"),
				getRubrique("section", "I"),
				getRubrique("section", "J"),
				getRubrique("section", "K"),
				getRubrique("section", "L"),
				getRubrique("section", "M"),
				getRubrique("section", "N"),
				getRubrique("section", "O"),
				getRubrique("section", "P"),
				getRubrique("section", "Q"),
				getRubrique("section", "R"),
				getRubrique("section", "S"),
				getRubrique("section", "T"),
				getRubrique("section", "U")
			);
	}

}
