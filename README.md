# Utiliser Webpack pour développer plus proprement et plus rapidement les parties Javascript

## Contenu de la présentation

Les applications comportent de plus en plus de Javascript, et pourtant, l’attention portée à la qualité du code Javascript est moindre.
Cette situation peut s’améliorer grâce à une meilleure formation mais aussi grâce à l’utilisation d’outils adaptés comme Webpack.

 - Installation de Webpack : rappels rapides sur NodeJs et npm, installation des paquets webpack et webpack-dev-server.
 - Comment ajouter Webpack à un projet existant et qui contient déjà du code Javascript, et comment commencer un projet avec Webpack.
 - Fonctionnalités de Webpack : rendre le code JavaScript modulaire ; utiliser les dernières versions d’EcmaScript tout en étant compatibles avec les anciens navigateurs ; voir ses modifications instantanément prises en compte dans le navigateur ; etc.
 
## Installation : 

```bash
git clone https://github.com/romain-warnan/webpack.git
cd presentation-webpack/solr/
npm update
cd ../src/main/webapp
npm update
```

Démarrer SolR (`npm start` dans `npm solr/`).

Dans Eclipse, lancer `fr.insee.demo.solr.loader.Launcher`.

## Lancer l’application

### Version Javascript classique

Branche `javascript-version`

 1. Démarrer SolR (`npm start` dans `npm solr/`) si nécessaire.
 2. Démarrer Tomcat
 3. [http://localhost:8080/demo-js/accueil](http://localhost:8080/demo-js/demo-js/accueil)

### Version Webpack

Branche `webpack-version`

 1. Démarrer SolR (`npm start` dans `npm solr/`) si nécessaire.
 1. Démarrer Webpack (`npm start` dans `npm src/main/webapp/`)
 2. Démarrer Tomcat
 3. [http://localhost:3030/demo-js/accueil](http://localhost:3030/demo-js/accueil)

