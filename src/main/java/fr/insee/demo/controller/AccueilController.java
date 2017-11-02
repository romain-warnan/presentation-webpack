package fr.insee.demo.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
public class AccueilController {
	
	final private static Logger logger = LoggerFactory.getLogger(AccueilController.class);

	@RequestMapping("accueil")
	public String index() {
		logger.info("==> INDEX");
		return "accueil";
	}
}
