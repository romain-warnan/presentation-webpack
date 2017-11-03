package fr.insee.seminaire2017.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;

import fr.insee.seminaire2017.model.Rubrique;
import fr.insee.seminaire2017.model.RubriqueRepo;
import fr.insee.seminaire2017.solr.server.SolrInseeException;

@Profile("solr")
@Component
public class RubriqueSolr implements RubriqueResource{
	
	@Autowired
	private RubriqueRepo rubriqueRepo;
	
	public Rubrique getRubrique(String niveau, String code) throws ResourceException {
		try {
			return rubriqueRepo.getRubrique(code);
		} catch (SolrInseeException e) {
			throw new ResourceException("Hooo !", e);
		}
	}
	
	public List<Rubrique> getSections() throws ResourceException {		
		try {
			return Lists.newArrayList(
					rubriqueRepo.getRubrique("A"),
					rubriqueRepo.getRubrique("B"),
					rubriqueRepo.getRubrique("C"),
					rubriqueRepo.getRubrique("D"),
					rubriqueRepo.getRubrique("E"),
					rubriqueRepo.getRubrique("F"),
					rubriqueRepo.getRubrique("G"),
					rubriqueRepo.getRubrique("H"),
					rubriqueRepo.getRubrique("I"),
					rubriqueRepo.getRubrique("J"),
					rubriqueRepo.getRubrique("K"),
					rubriqueRepo.getRubrique("L"),
					rubriqueRepo.getRubrique("M"),
					rubriqueRepo.getRubrique("N"),
					rubriqueRepo.getRubrique("O"),
					rubriqueRepo.getRubrique("P"),
					rubriqueRepo.getRubrique("Q"),
					rubriqueRepo.getRubrique("R"),
					rubriqueRepo.getRubrique("S"),
					rubriqueRepo.getRubrique("T"),
					rubriqueRepo.getRubrique("U")
				);
		} catch (SolrInseeException e) {
			throw new ResourceException("Hooo !", e);
		}
	}
	
//	public Rubrique getRubrique(String niveau, String code) throws ResourceException{
//		if(map.containsKey(code)){
//			return map.get(code);
//		} else {
//			Client client = Client.create();
//			WebResource webResource = client.resource(PATH + niveau + "/" + code);
//			ClientResponse response = webResource.accept("application/json; charset=utf-8").get(ClientResponse.class);
//					
//			if (response.getStatus() != 200) {
//				String error= response.getEntity(String.class);
//				throw new ResourceException(error);
//			}
//			
//			Rubrique rubrique = response.getEntity(Rubrique.class);
//			map.put(code,  rubrique);
//			
//			return  rubrique;
//		}
//	}
//	
//	public List<Rubrique> getSections() throws ResourceException{		
//		return Lists.newArrayList(
//				getRubrique("section", "A"),
//				getRubrique("section", "B"),
//				getRubrique("section", "C"),
//				getRubrique("section", "D"),
//				getRubrique("section", "E"),
//				getRubrique("section", "F"),
//				getRubrique("section", "G"),
//				getRubrique("section", "H"),
//				getRubrique("section", "I"),
//				getRubrique("section", "J"),
//				getRubrique("section", "K"),
//				getRubrique("section", "L"),
//				getRubrique("section", "M"),
//				getRubrique("section", "N"),
//				getRubrique("section", "O"),
//				getRubrique("section", "P"),
//				getRubrique("section", "Q"),
//				getRubrique("section", "R"),
//				getRubrique("section", "S"),
//				getRubrique("section", "T"),
//				getRubrique("section", "U")
//			);
//	}

}
