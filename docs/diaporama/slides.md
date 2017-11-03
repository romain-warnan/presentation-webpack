<!-- .slide: data-background-image="images/webpack-2.png" data-background-size="600px" class="chapter" -->
## 1
### Bref historique


===


<!-- .slide: class="slide" -->
### Applications web dynamiques – 1/2

1) Pages HTML générées côté serveur
 - jsp, jstl, taglib, tiles, struts2, spring mvc…
 - peu d’interactions
  - *submit*
 - allers-retours serveurs systématiques

2) Ajout d’une surcouche JS côté client
 - dynamiser la page
 - nouveaux composants
  - autocomplétion, double *select*, calendriers…
 - gestion des évènements


===


<!-- .slide: class="slide" -->
### Applications web dynamiques – 2/2

3) Généralisation d’Ajax
 - récupération des données côté serveur
 - génération du HTML côté client
 - JS ↗, Java ↘

4) Utilisation massive de jQuery
 - lisser les comportements des différents navigateurs
 - sélecteurs, manipulation du DOM
 - appels Ajax simplifiés


===


<!-- .slide: data-background-image="images/webpack-2.png" data-background-size="600px" class="chapter" -->
## 2
### Démonstration
Code historique

===


<!-- .slide: data-background-image="images/webpack-2.png" data-background-size="600px" class="chapter" -->
## 3
### Limites du modèle


===


<!-- .slide: class="slide" -->
### Les navigateurs

ECMAScript 5 encore largement répandu dans les navigateurs en circulation
 - nombreuse fonctionnalités manquantes
 - syntaxe absconse


===


<!-- .slide: class="slide" -->
### Modularité

Quasiment aucune modularité
 - pas de système sérieux de gestion des imports
 - pas de gestion des dépendances
 - donc un gros fichiers JavaScript par page


===


<!-- .slide: class="slide" -->
### Structuration du code

jQuery est une librairie, pas un *framework*
 - pas de cadre de développement structuré


===


<!-- .slide: data-background-image="images/webpack-2.png" data-background-size="600px" class="chapter" -->
## 4
### Outils


===


<!-- .slide: class="slide" -->
### NodeJS

*Runtime* JavaScript
 - exécute du JS en dehors d’un navigateur
  - permet donc tout le reste 
 - basé sur V8 de Google
 - de plus en plus utilisé côté serveur
  - plus léger que Tomcat et autre
  - développer en JS côté serveur et client 

<div class="center">
    <img src="images/nodejs.png" style="width: 200px;" />
</div>


===


<!-- .slide: class="slide" -->
### npm

Gestionnaire de paquet
 - *node package manager*
 - gestion des dépendances

<div class="center">
    <img src="images/npm.png" style="width: 200px;" />
</div>


===


<!-- .slide: class="slide" -->
### Yarn

Remplace peu à peu npm
 - plus rapide
 - `npm install yarn -g`

<div class="center">
    <img src="images/yarn.png" style="width: 200px;" />
</div>


===


<!-- .slide: class="slide" -->
### ECMAScript

Normalisation du langage

Une nouvelle version tous les ans
 - les navigateurs ne peuvent pas suivre
 - les entreprises encore moins

Quelques caractéristiques
 - langage de script sans typage
 - orienté programmation fonctionnelle

<div class="center">
    <img src="images/es6.svg" style="width: 150px;" />
</div>


===


<!-- .slide: class="slide" -->
### Babel

Transpilation
 - compilation source à source
 - vers ES5 en général
 - ex. : ES2016 vers ES5

<div class="center">
    <img src="images/babel.png" style="width: 200px;" />
</div>


===


<!-- .slide: class="slide" -->
### Webpack

__Webpack permet d’utiliser simplement tous ces outils__
 - et plus encore :
  - css, obfuscation, débugage, rechargement à la volée…

Y compris dans les applications déjà développées « à l’ancienne »

<div class="center">
    <img src="images/webpack.png" style="width: 200px;" />
</div>


===


<!-- .slide: data-background-image="images/webpack-2.png" data-background-size="600px" class="chapter" -->
## 5
### Démonstration
Code avec Webpack

