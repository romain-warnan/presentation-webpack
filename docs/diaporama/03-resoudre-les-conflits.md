<!-- .slide: data-background-image="images/git-logo.png" data-background-size="800px" class="chapter" -->
## 3
### Résoudre les conflits


===


<!-- .slide: class="slide" -->
### Résoudre les conflits

#### Cas du rebasage

```bash
git pull --rebase
```
 - on est avertis qu’il y a des conflits

Quand un fichier est corrigé :
```bash
git add fichier-conflit
```

Une fois que tous les conflits sont corrigés :
```bash
git rebase --continue
```

Répéter ces opérations tant que le rebasage n’est pas terminé.

Pour revenir à l’état sans conflit et annuler le rebasage :
```bash
git rebase --abort
```


===


<!-- .slide: class="slide" -->
### Résoudre les conflits

#### Cas de la fusion


```bash
git pull
```
 - on est avertis qu’il y a des conflits

Quand un fichier est corrigé :
```bash
git add fichier-conflit
```

Une fois que tous les conflits sont corrigés :
```bash
git commit -m "Message de résolution du conflit."
```

Pour revenir à l’état sans conflit et annuler la fusion :
```bash
git merge --abort
```