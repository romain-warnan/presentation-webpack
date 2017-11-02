package fr.insee.demo.controller;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import fr.insee.demo.model.Rubrique;
import fr.insee.demo.model.RubriqueRepo;
import fr.insee.demo.resources.ResourceException;
import fr.insee.demo.resources.RubriqueResource;
import fr.insee.demo.solr.server.SolrInseeException;

@Controller
@RequestMapping("/nomenclature")
public class NomenclatureController {
	final private static Logger logger = LoggerFactory.getLogger(AccueilController.class);
	@Autowired
	private RubriqueRepo rubriqueRepo;	
	@Autowired
	private RubriqueResource rubriqueResource;

	@RequestMapping(value = "")
	public String rubrique(ModelMap model) throws ResourceException, SolrInseeException {
		logger.info("==> NOMENCLATURE");		
		model.addAttribute("sections", rubriqueResource.getSections());
		
		return "nomenclature";
	}
	
	@RequestMapping(value = "/search")
	@ResponseBody
	public List<Rubrique> search(@RequestParam(value = "q", required = false, defaultValue = "*:*") String q) throws SolrInseeException{
		return rubriqueRepo.search(q);
	}
	
	
	@RequestMapping(value = "/sections")
	@ResponseBody
	public List<Rubrique> sections() throws SolrInseeException, ResourceException{
		return rubriqueResource.getSections();
	}
	
	@RequestMapping(value = "/rubrique/{code:.+}")
	@ResponseBody
	public Rubrique rubrique(@PathVariable("code") String code) throws SolrInseeException, ResourceException{
		return rubriqueRepo.getRubrique(code);
	}
	
}
