package fr.insee.seminaire2017.server.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.insee.seminaire2017.model.Rubrique;
import fr.insee.seminaire2017.model.RubriqueRepo;
import fr.insee.seminaire2017.resources.ResourceException;
import fr.insee.seminaire2017.resources.RubriqueResource;
import fr.insee.seminaire2017.solr.server.SolrInseeException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/nomenclature")
public class RubriqueController {
	
	
	final private static Logger logger = LoggerFactory.getLogger(RubriqueController.class);
	
	@Autowired
	private RubriqueRepo rubriqueRepo;	
	@Autowired
	private RubriqueResource rubriqueResource;
	
	@GetMapping("/search")
	public List<Rubrique> search(@RequestParam(value = "q", required = false, defaultValue = "*:*") String q) throws SolrInseeException{
		logger.info("search " + q);
		return rubriqueRepo.search(q);
	}
	
	@GetMapping("/sections")
	public List<Rubrique> sections() throws SolrInseeException, ResourceException {
		logger.info("GET sections");
		return rubriqueResource.getSections();
	}

	@GetMapping("/rubrique/{code:.+}")
	public Rubrique rubrique(@PathVariable("code") String code) throws SolrInseeException, ResourceException{
		logger.info("GET rubrique " + code);
		return rubriqueRepo.getRubrique(code);
	}

}
