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
		<a href="/demo-js/accueil">accueil</a><br />
		<a href="/demo-js/nomenclature">parcourir l'arbre de la Nafrev2</a>

		<table class="table">
			<thead>
				<tr>
					<th>code</th>
					<th>niveau</th>
					<th>libelle</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="section" items="${sections}">
					<tr>
						<td>${section.code}</td>
						<td>${section.niveau}</td>
						<td>${section.libelle}</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>

	<script type="text/javascript" src="/demo-js/static/js/jquery/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="/demo-js/static/js/datatable/datatables.min.js"></script>
	<script type="text/javascript" src="/demo-js/static/js/table.js"></script>
</body>
</html>
