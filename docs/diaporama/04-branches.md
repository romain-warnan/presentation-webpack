<!-- .slide: data-background-image="images/git-logo.png" data-background-size="800px" class="chapter" -->
## 4
### Branches


===


<!-- .slide: class="slide" -->
### Branches locales

Passer d’une branche à l’autre est très rapide avec Git
 - car tout se passe en local

Créer une nouvelle branche locale :
```bash
git branch nom-branche 
```

Extraire une branche existante :
```bash
git checkout nom-branche 
```
 - conserve les modifications locales
 - combiner les deux opérations grâce à `git checkout -b nom-branche`


===


<!-- .slide: class="slide" -->
### Branches distantes

Partager une branche locale :
```bash
git push --set-upstream origin nom-branche-distante
```
 - il faut être dans la branche locale
 - en général `nom-branch-distante` = `nom-branche`


Suivre une branche distante :
```bash
git checkout nom-branche-distante
```
 - attention au cas où il existe déjà une branche locale portant ce nom
 

===


<!-- .slide: class="slide" -->
### Fusionner une branche

Intégrer les commits dans la branche principale :
```bash
git checkout master
git merge nom-branche
```
 
Cas simple : *fast-forward*
 - pas de commit de fusion
 - simple avance rapide

Supprimer une branche locale fusionnée ou partagée :
```bash
git branch -d nom-branche
```


===


<!-- .slide: class="slide" -->
### Fusionner une branche

Cas intermédiaire : fusion à trois branches
 - commit du résultat de la fusion


<div class="center">
    <img src="images/fusion.png" />
</div>

Cas difficile : fusion avec conflits
 - résoudre les conflits avant de pouvoir commiter