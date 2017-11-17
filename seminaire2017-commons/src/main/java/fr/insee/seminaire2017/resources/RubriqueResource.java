package fr.insee.seminaire2017.resources;

import java.util.List;

import fr.insee.seminaire2017.model.Rubrique;

public interface RubriqueResource {
	List<Rubrique> getSections() throws ResourceException;
	Rubrique getRubrique(String niveau, String code) throws ResourceException;
}
