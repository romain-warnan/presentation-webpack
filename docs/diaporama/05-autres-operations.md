<!-- .slide: data-background-image="images/git-logo.png" data-background-size="800px" class="chapter" -->
## 5
### Autres opérations


===


<!-- .slide: class="slide" -->
### Remisage

Stocker toutes les modifications non commitées :
```bash
git stash
```
 - copie locale propre
 - modifications dans la remise

Réappliquer le contenu de la remise :
```bash
git stash pop
```
 - `git stash drop` pour abandonner le contenu de la remise


===


<!-- .slide: class="slide" -->
### Étiquettes

Marquer un commit comme particulier :
```bash
git tag -a v1.1 -m "Version livrée en production le 10/11/2017"
```
 - photographie du code à un moment donné

Poser une étiquette *a posteriori* :
```bash
git tag -a v1.1 -m "Version livrée en production le 10/11/2017" 5978c73
```

Envoyer des étiquettes dans le dépôt distant :
```bash
git push origin --tags
```

Récupérer le code associé à une étiquette donnée :
```bash
git checkout v1.1
```


===


<!-- .slide: class="slide" -->
### Revenir en arrière

Revenir au dernier commit :
```bash
git reset --hard
```
 - __attention__ on perd définitivement les modifications non commitées
 - *cf.* `svn revert`

Annuler les 3 derniers commits :
```bash
git reset --hard HEAD~3 --
```
 - en cas d’erreur de manipulation : `git reset HEAD@{3}`
  - chercher sur internet selon les cas

Pour retourner en arrière à un commit donné :
```bash
git reset --hard 46e273cc54
```


===


<!-- .slide: class="slide" -->
### Autres possibilités

Voir les modifications
 - `git diff`

Modifier un commit
 - `commit --amend`

Réorganiser l’historique local
 - `rebase --interactive`

Réécrire l’historique distant
 - `filter-branch`
 
Déclencher des actions
 - `.git/hooks`

Gérer des sous-modules 

…


===


<!-- .slide: class="slide" -->
### Ressources utiles


Documentation Git en français :

<div class="center">
	<a href="https://git-scm.com/book/fr/v2" target="_blank"><img src="images/documentation.png" style="width: 300px" /></a>
</div>

Code de la présentation :

<div class="center">
	<a href="https://github.com/romain-warnan/git-au-quotidien" target="_blank"><img src="images/github.png" /></a>
</div>
