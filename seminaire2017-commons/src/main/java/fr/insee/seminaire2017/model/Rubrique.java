package fr.insee.seminaire2017.model;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.google.common.collect.Lists;

@XmlRootElement(name = "rubrique")
@XmlAccessorType(XmlAccessType.FIELD)
public class Rubrique implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4040218293217203593L;
	
	
	private String code;
	private String libelle;
	private String niveau;
	private String comprend;
	private String neComprendPas;
	private String noteGenerale;
	List<String> enfants = Lists.newArrayList();
	List<String> parents = Lists.newArrayList();
	
	public Rubrique(){}
	
	public Rubrique(String code, String libelle) {
		this.code = code;
		this.libelle = libelle;
	}

	@Override
	public String toString() {
		return "Rubrique [code=" + code + ", libelle=" + libelle + "]";
	}
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public String getNiveau() {
		return niveau;
	}

	public void setNiveau(String niveau) {
		this.niveau = niveau;
	}

	public String getNeComprendPas() {
		return neComprendPas;
	}

	public void setNeComprendPas(String neComprendPas) {
		this.neComprendPas = neComprendPas;
	}

	public String getNoteGenerale() {
		return noteGenerale;
	}

	public void setNoteGenerale(String noteGenerale) {
		this.noteGenerale = noteGenerale;
	}

	public List<String> getEnfants() {
		return enfants;
	}

	public void setEnfants(List<String> enfants) {
		this.enfants = enfants;
	}

	public List<String> getParents() {
		return parents;
	}

	public void setParents(List<String> parents) {
		this.parents = parents;
	}

	public String getComprend() {
		return comprend;
	}

	public void setComprend(String comprend) {
		this.comprend = comprend;
	}

}
