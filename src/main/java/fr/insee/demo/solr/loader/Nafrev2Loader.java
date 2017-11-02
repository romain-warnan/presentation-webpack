package fr.insee.demo.solr.loader;

import java.util.Stack;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import fr.insee.demo.model.Niveaux;
import fr.insee.demo.model.Rubrique;
import fr.insee.demo.resources.ResourceException;
import fr.insee.demo.resources.RubriqueResource;
import fr.insee.demo.solr.server.ServerFactory;
import fr.insee.demo.solr.server.SolrInseeException;
import fr.insee.demo.model.RubriqueRepo;

@Service
public class Nafrev2Loader {
	
	@Autowired
	private ServerFactory serverFactory;
	
	@Autowired
	private RubriqueResource rubriqueResource;
	
	@Autowired
	private RubriqueRepo RubriqueRepo;

	public void chargerNafrev2() throws SolrInseeException {		
		Stack<Rubrique> pile = new Stack<>();
		try {
			pile.addAll(rubriqueResource.getSections());
			
			while(!pile.empty()){
				Rubrique r = pile.pop();
				RubriqueRepo.addRubrique(r);
				
				for(String e : r.getEnfants()){
					pile.push(rubriqueResource.getRubrique(Niveaux.getSousNiveau(r.getNiveau()), e));
				}
			}	
			
		} catch (ResourceException e) {
			throw new SolrInseeException("hooo !, e");
		} finally {
			serverFactory.shutdown();	
		}
	}
}
