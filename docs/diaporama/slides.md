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
### Limites du modèle


===


<!-- .slide: class="slide" -->
### Les navigateurs

ECMAScript 5 encore largement répandu dans les navigateurs en circulation
 - nombreuse fonctionnalités manquantes
 - syntaxe absconse

__Solution :__

Transpilation
 - compilation source à source
 - ex. : ES2016 vers ES5
 - Babel


===


<!-- .slide: class="slide" -->
### Modularité

Quasiment aucune modularité
 - pas de système sérieux de gestion des imports
 - pas de gestion des dépendances
 - donc un gros fichiers JavaScript par page

__Solutions :__
 
Gestionnaires de dépendances
 - npm

Gestion des imports
 - RequireJS
 - ECMAScript 6


===


<!-- .slide: class="slide" -->
### Structuration du code

jQuery est une librairie, pas un *framework*
 - pas de cadre de développement structuré

__Solution :__

*Frameworks* (hors sujet)
 - React
 - Angular



===


<!-- .slide: class="slide" -->
### Webpack

__Webpack permet de mettre en œuvre ces solutions__
 - et plus encore :
  - css, obfuscation, débugage, rechargement à la volée…

Y compris dans les applications déjà développées « à l’ancienne »



===


<!-- .slide: data-background-image="images/webpack-2.png" data-background-size="600px" class="chapter" -->
## 3
### Démonstration

