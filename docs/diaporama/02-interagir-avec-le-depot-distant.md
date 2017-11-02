<!-- .slide: data-background-image="images/git-logo.png" data-background-size="800px" class="chapter" -->
## 2
### Interagir avec le dépôt distant


===


<!-- .slide: class="slide" -->
### Partager son travail

```bash
git push
```
 - tous les commits du dépôt local sont envoyés vers le dépôt distant

Cas le plus simple car :
 - on a clôné le dépôt distant
 - il existe une branche master distante
 - il n’y a pas eu de modifications dans la branche distante

Gérer les droits d’accès :
 - échange de clés SSH
 - identifiant / mot de passe
 - `credential.helper`


===

 
<!-- .slide: class="slide" -->
### Mettre à jour sa copie locale
#### État initial

Des commits ont été envoyés vers le serveurs par d’autres développeurs :

<div class="center">
    <img src="images/rebase-1.png" />
</div>


===


<!-- .slide: class="slide" -->
### Mettre à jour sa copie locale
#### Option 1 – Fusion

```bash
git pull
```
Génère un commit résultant de la fusion :
 - branche distante -> branche locale

<div class="center">
    <img src="images/rebase-2.png" />
</div>


===


<!-- .slide: class="slide" -->
### Mettre à jour sa copie locale
#### Option 2 – Rebasage

```bash
git pull --rebase
```
Pas de commit de fusion :
 - l’historique de la branche locale est réécrit
 
<div class="center">
    <img src="images/rebase-3.png" />
</div>