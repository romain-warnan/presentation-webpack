package fr.insee.demo.model;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.beans.Field;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;

import fr.insee.demo.solr.server.ServerFactory;
import fr.insee.demo.solr.server.SolrInseeException;

@Component
public class RubriqueRepo {
	
	@Autowired
	private ServerFactory serverFactory;
	
	public void addRubrique(Rubrique rubrique) throws SolrInseeException{
		SolrBean bean = SolrBean.newInstance()
				.setId(rubrique.getCode())
				.setCode(rubrique.getCode())
				.setLibelle(rubrique.getLibelle())
				.setNiveau(rubrique.getNiveau())
				.setNoteGenerale(rubrique.getNoteGenerale())
				.setComprend(rubrique.getComprend())
				.setNeComprendPas(rubrique.getNeComprendPas())
				.setEnfants(rubrique.getEnfants())
				.setParents(rubrique.getParents())
				.build();

		SolrClient client = serverFactory.getServer();
		try {
			client.addBean(bean);
		} catch (IOException | SolrServerException e) {
			throw new SolrInseeException("hooo !", e);
		}
	}
	
	public List<Rubrique> search(String query) throws SolrInseeException{		
		try {
			List<Rubrique> rubriques = Lists.newArrayList();
			SolrClient client = serverFactory.getServer();
			SolrQuery sq = new SolrQuery();
			sq.setRequestHandler("/nomenclature");
		    sq.setQuery(query);
		    QueryResponse rsp = client.query(sq);		    
		    rubriques = rsp.getBeans(SolrBean.class).stream().map(SolrBean::makeRubrique).collect(Collectors.toList());
		    		    
			return rubriques;
		} catch (SolrServerException | IOException e) {
			throw new SolrInseeException("hooo !", e);
		}
	   
	}
	
	
	public Rubrique getRubrique(String id) throws SolrInseeException{
		try {
			List<Rubrique> rubriques = Lists.newArrayList();
			SolrClient client = serverFactory.getServer();
			SolrQuery sq = new SolrQuery();
			sq.setRequestHandler("/nomenclature");
		    sq.setQuery("id:" + id);
		    QueryResponse rsp = client.query(sq);		    
		    rubriques = rsp.getBeans(SolrBean.class).stream().map(SolrBean::makeRubrique).collect(Collectors.toList());
		    		    
			return rubriques.get(0);
		} catch (SolrServerException | IOException e) {
			throw new SolrInseeException("hooo !", e);
		}
	}
	
	
	
	public static class SolrBean implements Serializable {
		

		/**
		 * 
		 */
		private static final long serialVersionUID = -9025285879209935451L;
		@Field
		private String id;
		@Field("nomenclature_code")
		public String code;
		@Field("nomenclature_libelle")
		public String libelle;
		@Field("nomenclature_niveau")
		private String niveau;
		@Field("naf2008_noteGenerale")
		private String noteGenerale;
		@Field("naf2008_neComprendPas")
		private String neComprendPas;
		@Field("naf2008_comprend")
		private String comprend;
		@Field("nomenclature_enfants")
		private List<String> enfants = Lists.newArrayList();
		@Field("nomenclature_parents")
		private List<String> parents = Lists.newArrayList();

		public static Rubrique makeRubrique(SolrBean b){
			Rubrique r = new Rubrique();
			r.setCode(b.getCode());
			r.setLibelle(b.getLibelle());
			r.setNiveau(b.getNiveau());
			r.setNeComprendPas(b.getNeComprendPas());
			r.setNoteGenerale(b.getNoteGenerale());
			r.setComprend(b.getComprend());
			r.setEnfants(b.getEnfants());
			r.setParents(b.getParents());
			
			return r;
		}
		
		public SolrBean(String code, String libelle) {
			this.id = code;
			this.code = code;
			this.libelle = libelle;
		}
		
		public List<String> getEnfants() {
			return enfants;
		}

		public void setEnfants(List<String> enfants) {
			this.enfants = enfants;
		}
		
		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getNiveau() {
			return niveau;
		}

		public void setNiveau(String niveau) {
			this.niveau = niveau;
		}

		public SolrBean(){}		

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

		public String getNoteGenerale() {
			return noteGenerale;
		}

		public void setNoteGenerale(String noteGenerale) {
			this.noteGenerale = noteGenerale;
		}

		public String getNeComprendPas() {
			return neComprendPas;
		}

		public void setNeComprendPas(String neComprendPas) {
			this.neComprendPas = neComprendPas;
		}

		public String getComprend() {
			return comprend;
		}

		public void setComprend(String comprend) {
			this.comprend = comprend;
		}
		
		public static Builder newInstance(){
			return new Builder();
		}
		
		public List<String> getParents() {
			return parents;
		}

		public void setParents(List<String> parents) {
			this.parents = parents;
		}

		public static class Builder {
			private SolrBean b;
			
			private Builder(){
				b = new SolrBean();
			}			
			public Builder setComprend(String comprend) {
				b.comprend = comprend;
				return this;
			}			
			public Builder setNeComprendPas(String neComprendPas) {
				b.neComprendPas = neComprendPas;
				return this;
			}			
			public Builder setNoteGenerale(String noteGenerale) {
				b.noteGenerale = noteGenerale;
				return this;
			}			
			public Builder setLibelle(String libelle) {
				b.libelle = libelle;
				return this;
			}			
			public Builder setCode(String code) {
				b.code = code;
				return this;
			}			
			public Builder setId(String id) {
				b.id = id;
				return this;
			}
			public Builder setEnfants(List<String> enfants) {
				b.enfants = enfants;
				return this;
			}
			public Builder setParents(List<String> parents) {
				b.parents = parents;
				return this;
			}
			public Builder setNiveau(String niveau) {
				b.niveau = niveau;
				return this;
			}
			public SolrBean build(){
				return b;
			}
		}
	}
}
