package fr.insee.seminaire2017.batch;

import java.util.Stack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.insee.seminaire2017.model.Niveaux;
import fr.insee.seminaire2017.model.Rubrique;
import fr.insee.seminaire2017.model.RubriqueRepo;
import fr.insee.seminaire2017.resources.ResourceException;
import fr.insee.seminaire2017.resources.RubriqueResource;
import fr.insee.seminaire2017.solr.server.ServerFactory;
import fr.insee.seminaire2017.solr.server.SolrInseeException;



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
			throw new SolrInseeException("Impossible de charger la nafrev2.", e);
		} finally {
			serverFactory.shutdown();	
		}
					
	}
}
