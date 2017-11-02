package fr.insee.demo.resources;

import java.util.List;

import fr.insee.demo.model.Rubrique;

public interface RubriqueResource {
	List<Rubrique> getSections() throws ResourceException;
	Rubrique getRubrique(String niveau, String code) throws ResourceException;
}
