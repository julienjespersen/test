# Interface interactive sur les débouchés professionnels de l'Université de Genève

*Une interface interactive destinée à renseigner les étudiant-es sur les débouchés
professionnels après le diplôme universitaire.*

## Refonte

Ce dossier correspond à une réécriture de l'application initialement développée avec Vue.js,
dans le but de la rendre compatible à Concrete 5. Les objectifs de l'application restent les mêmes.

## Structure du projet

```
frontend-html
├── App.html
├── data
│   ├── Toutes-data.json
│   ├── ...
├── js
    ├── helpers.js
    ├── sankey-functions.js
```

### App
L'application est contenue dans le fichier ```App.html```. Elle utilise les données
contenues dans le dossier ```data```, ainsi que les fonctions js du dossier ```js```.

### Données

Les données utilisées dans cette application proviennent de fichiers CSV qui ont été
transformés en fichiers JSON à l'aide d'un script Python. Ces fichiers JSON contiennent
les données dans un format spécifique à la bibliothèque D3.js pour créer des diagrammes de Sankey.
Le dossier ```data``` contient tous les fichiers nécessaires au bon fonctionnement de
l'application. Les noms des fichiers sont générés automatiquement par le script.
Il y a un fichier pour toutes les données, et un fichier par date d'obtention unique de diplôme
pour permettre à l'application de filtrer les données assez facilement.

### Fonctions
Les fonctions Javascript utilisées par l'application et la gestion des diagrammes sont dans le
dossier ```js```.

## Remarques sur la mise à jour de l'application
L'application utilise des fichiers JSON, fournis préalablement dans le
dossier ```data```. Pour mettre à jour l'application, il faudra :
- mettre à jour les trois fichiers CSV ```Contenus_quantitatifs.csv```, ```Contenus_qualitatifs.csv```
et ```Descriptifs_débouchés.csv```, contenus dans le dossier ```scripts/data``` à
la racine de ce projet. *Attention à utiliser les mêmes noms de colonnes pour
permettre le bon fonctionnement du script.*
- lancer le script ```main.py```, situé dans le dossier ```scripts/csv_to_json```.
- remplacer les fichiers du dossier ```frontend-html/data``` par les fichiers
JSON nouvellement créés.
- modifier manuellement, si nécessaire, la variable _years_ dans le fichier
```App.html```. Par exemple, si le script a généré quatre fichiers ```Toutes-data.json```,
```2013-data.json```, ```2014-data.json``` et ```2015-data.json```, il faudra
modifier la variable comme suit : 
```js
let years = ["Toutes", 2013, 2014, 2015];
```
