package fr.insee.seminaire2017.model;

import java.util.Map;

import com.google.common.collect.Maps;

public class Niveaux {
	private static  final Map<String,String> mapNiveauDown = Maps.newHashMap();
	private static final Map<String,String> mapNiveauUp = Maps.newHashMap();
	
	static{
		mapNiveauDown.put("section", "division");
		mapNiveauDown.put("division", "groupe");
		mapNiveauDown.put("groupe", "classe");
		mapNiveauDown.put("classe", "sousClasse");
		
		mapNiveauUp.put("division", "section");
		mapNiveauUp.put("groupe", "division");
		mapNiveauUp.put("classe", "groupe");
		mapNiveauUp.put("sousClasse", "classe");
	}
	
	
	public static String getSousNiveau(String niveau){
		return mapNiveauDown.get(niveau);
	}

	public static String getSurNiveau(String niveau){
		return mapNiveauUp.get(niveau);
	}
}
