<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="fr">
<head>
<link rel="stylesheet" type="text/css" href="/demo-js/static/css/application.css">
<link rel="stylesheet" type="text/css" href="/demo-js/static/css/jquery/jquery-ui.min.css">
<title>Application demo</title>
</head>
<body>
	<div id="application">
		<div id="wait" class="wait" ><img src="/demo-js/static/images/preloader.svg" alt="Veuillez-patienter..." /></div>
		<a href="/demo-js/nomenclature">parcourir l'arbre de la Nafrev2</a><br/>
		<a href="/demo-js/datatable">datatable</a>
		<div id="accordion">
			<h3>Consulter la Nafrev2</h3>
			<div>
				<input type="text" name="nafrev2" /><button class="button"><span class="ui-icon ui-icon-search"></span></button>
			</div>
			<h3 class="fiche-titre">Fiche</h3>
			<div class="fiche-containeur">
				<p>Aucune fiche choisie</p>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="/demo-js/static/js/bundle.js"></script>
</body>
</html>
