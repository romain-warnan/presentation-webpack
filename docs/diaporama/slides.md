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


<!-- .slide: class="slide" -->
### Webpack diapo 2

```bash
git clone git@github.com:romain-warnan/git-au-quotidien.git
cd git-au-quotidien
```

Différence majeure par rapport à SVN
 - le dépôt entier est cloné : y compris l’historique
  - répertoire `.git/`
  - `git log`
 - dépôt local ≠ dépôt distant