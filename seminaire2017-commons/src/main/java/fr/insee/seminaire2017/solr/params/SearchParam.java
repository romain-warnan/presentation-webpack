package fr.insee.seminaire2017.solr.params;

import java.io.Serializable;
import java.util.List;

import com.google.common.collect.Lists;

public class SearchParam implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2805095289906339572L;
	
	private String q;
	private int start;
	private int rows;
	private List<SortParam> sortParams = Lists.newArrayList();
	
	public String getQ() {
		return q;
	}
	public void setQ(String q) {
		this.q = q;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}
	public List<SortParam> getSortParams() {
		return sortParams;
	}
	public void setSortParams(List<SortParam> sortParams) {
		this.sortParams = sortParams;
	}
	
	

}
