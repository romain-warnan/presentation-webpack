package fr.insee.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import fr.insee.demo.resources.ResourceException;
import fr.insee.demo.resources.RubriqueResource;
import fr.insee.demo.solr.server.SolrInseeException;

@Controller
public class DatatableController {
	
	final private static Logger logger = LoggerFactory.getLogger(AccueilController.class);
	
	@Autowired
	private RubriqueResource rubriqueResource;
	
	@RequestMapping("/datatable")
	public String rubrique(ModelMap model) throws ResourceException, SolrInseeException {
		logger.info("==> NOMENCLATURE");		
		model.addAttribute("sections", rubriqueResource.getSections());
		
		return "datatable";
	}

}
