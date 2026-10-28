# CC2II — Maquette du site institutionnel

Page d’accueil statique en français réalisée avec Bootstrap 5.3.8.

## Aperçu local

```sh
python3 -m http.server 5173 --bind 127.0.0.1 --directory maquette
```

Ouvrir http://127.0.0.1:5173/ . Servir uniquement le dossier `maquette`.

## Contenu

- Diaporama de quatre images : cabinet et trois expertises.
- Présentation, expertises, sept secteurs, implantations et contact.
- Navigation responsive et pied de page.
- Images et polices locales optimisées.

Les coordonnées et activités proviennent des informations fournies par le client. Les photos sont des illustrations et ne représentent pas des réalisations ni l’équipe du cabinet. Dubaï reste une perspective future.

Maquette sans administration, sans formulaire serveur et sans collecte de données. Les documents client, notes internes et fichiers d’environnement sont exclus du dépôt. GitHub Actions publie les pages HTML et les ressources de `maquette` sur https://gaslandie.github.io/cc2ii/ à chaque envoi sur `main`. Les documents et notes internes ne sont pas inclus dans le déploiement. Le serveur Python sert uniquement à la prévisualisation locale.

## Ressources et crédits

- Bootstrap 5.3.8 : https://getbootstrap.com/ — licence MIT, en-têtes conservés dans les fichiers distribués.
- Funnel Display et Plus Jakarta Sans : https://github.com/google/fonts — licences SIL OFL incluses dans `maquette/assets/fonts`.
- Photographie de Conakry : Boubacar Bila Diao Balde, https://commons.wikimedia.org/wiki/File:Ville_de_Conaky.jpg — CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/ . Versions redimensionnées et recadrages ; voile coloré selon l’emplacement. La photographie et ses adaptations conservent cette licence.
- Autres photographies et vidéo : ressources Envato fournies pour le projet. Leur présence dans ce dépôt ne confère pas de droit de réutilisation indépendant de leur licence d’origine.

La vidéo préparée est conservée dans les ressources, mais n’est plus utilisée dans le diaporama.
