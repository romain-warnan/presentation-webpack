<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
		<div class="arbre">
			<a href="/demo-js/accueil">accueil</a><br/>
			<a href="/demo-js/datatable">datatable</a>
			<ul class="liste-note racine">
				<c:forEach items="${sections}" var="section">
					<li class="arbre-fiche" data-code="${section.code}"
						data-niveau="section" data-open="false">
						<div class="note-container">
							<span class="node-code">${section.code}</span> <span
								class="node-libelle">${section.libelle}</span>
						</div>
						<ul class="liste-note"></ul>
					</li>
				</c:forEach>
			</ul>
		</div>
		<div class="fiche">
			<h1 id="titre-fiche" class="titre"></h1>
			<div id="note-generale" class="paragraphe">
				<h2 class="titre">Note générale :</h2>
				<div class="contenu"></div>
			</div>
			<div id="comprend" class="paragraphe">
				<h2 class="titre">Comprend :</h2>
				<div class="contenu"></div>
			</div>
			<div id="ne-comprend-pas" class="paragraphe">
				<h2 class="titre">Ne comprend pas :</h2>
				<div class="contenu"></div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="/demo-js/static/js/bundle.js"></script>
	</body>
</html>
