# Prompts et commandes

## Claude web

Dans l’accueil claude.ai, ouvrir un nouveau chat. Utiliser le bouton +, puis Importer ou ajouter des fichiers et Importer depuis l’ordinateur, selon l’interface. Joindre exemples/decision-pilote/Pilote-A.txt, exemples/decision-pilote/Pilote-B.txt et exemples/decision-pilote/Criteres.txt. Garder exemples/decision-pilote/Note-reference.txt de côté.

Prompt à copier
Compare Pilote-A.txt et Pilote-B.txt selon Criteres.txt. Donne un tableau avec le budget, le délai et le format d’export. Pour chaque chiffre déterminant, cite le fichier et le passage. Indique les données manquantes. Termine par une recommandation conditionnelle, la vérification à faire et sa source.

Demande de révision
Réécris la réponse sous les rubriques décision, faits, condition et prochaine action. Conserve les montants, les délais et les références aux fichiers.

Contrôle
Pilote-A.txt indique 8 000 € et 4 semaines. Pilote-B.txt indique 10 500 € et 3 semaines. Criteres.txt fixe 9 000 € et 5 semaines maximum. B dépasse le budget de 1 500 €. A annonce un export CSV. Il faut l’essayer avant signature. Le format de B est inconnu. Comparer à exemples/decision-pilote/Note-reference.txt après l’exercice.

## Modèle, contexte et quota

Dans le sélecteur de modèle, garder un modèle rapide pour extraire un fait et essayer un modèle adapté à l’analyse pour comparer plusieurs conditions. Comparer les faits et les passages cités. Si un chat ancien réintroduit des données obsolètes, créer une conversation et joindre les sources à jour. Consulter l’écran d’usage pour le quota du compte.

## Projets, mémoire, RAG et recherche

Créer un Projet « Pilote fournisseurs ». Ajouter les trois fichiers. Ajouter l’instruction suivante.
Pour chaque chiffre de décision, cite le fichier. Signale ce qui manque. Ne complète pas un engagement absent des pièces.

Dans un nouveau chat du Projet, saisir.
Pourquoi B dépasse-t-il le budget ? Donne le calcul et les deux passages qui permettent de le vérifier.

Résultat attendu : 10 500 € moins 9 000 € donne 1 500 € de dépassement. Vérifier Pilote-B.txt et Criteres.txt. La mémoire peut servir aux préférences de restitution. Le RAG aide à retrouver des passages quand la recherche documentaire est activée. Pour une règle externe, demander un lien officiel et l’ouvrir.

## Artefact, connecteur et Cowork

Artefact
Crée un calculateur à deux champs pour répartir une addition. Affiche la part par personne et signale une erreur si le nombre de personnes est inférieur à 1.
Vérifier 48 € / 4 = 12 € et le message d’erreur pour 0 personne.

Connecteur, si le service est autorisé
Retrouve le document « lancement produit » dans le service connecté. Donne le titre, la date, deux décisions et le lien. Limite-toi à la lecture.
Comparer la réponse à la page source.

Cowork
Joindre les trois fichiers de exemples/cowork.
À partir des notes jointes, rédige plan-actions.md. Donne une action, un responsable, une échéance et la source par ligne. Écris « à confirmer » quand un élément manque.
Ouvrir le fichier produit, puis comparer chaque ligne importante à sa note d’origine.

## Claude Code

Depuis un terminal, à la racine du dépôt. Prérequis pour cette démo : JDK 17, Git et Claude Code. Le serveur MCP local demande aussi Node.js. Aucune commande npm n’est nécessaire.


```sh
cd exemples/livraison-kotlin
git status --short
./gradlew :shipping:test
claude --permission-mode plan
```


Dans Claude Code, /memory permet de vérifier le chargement de `CLAUDE.md`. Ouvrir docs/regle-livraison.txt et les sources du module shipping. Si Gradle ne démarre pas dans votre environnement, noter cette erreur. Dans la session de production, Gradle a été bloqué par la restriction sur les sockets. Les tests ci-dessous ont été vérifiés par compilation Kotlin et JUnit. Les sorties se trouvent dans [resultats](../resultats).

Prompt de plan
Lis CLAUDE.md, docs/regle-livraison.txt et shipping/src/test/kotlin/formation/shipping/ShippingPolicyTest.kt. À 5 000 centimes la livraison doit être offerte. Explique la cause. Indique le fichier à modifier, le changement minimal et les tests. Attends mon accord avant toute modification.

Résultat de référence
Le plan cible ShippingPolicy.kt. Il propose de remplacer > 5000L par >= 5000L et de conserver les trois tests.

## Appliquer et vérifier

Après avoir relu le plan, saisir.
Applique le plan dans ShippingPolicy.kt. Garde les attentes des trois tests. Lance ./gradlew :shipping:test. Montre le diff et dis quels contrôles ont réellement été exécutés.

Commandes de contrôle

```sh
git diff -- shipping/src/main/kotlin/formation/shipping/ShippingPolicy.kt
git diff -- shipping/src/test/kotlin/formation/shipping/ShippingPolicyTest.kt
./gradlew :shipping:test
```


Le diff du service doit rendre le seuil inclus. Le diff des tests reste vide. Les résultats attendus sont payante à 49,99 €, offerte à 50,00 € et offerte à 50,01 €. Vérification Kotlin et JUnit du cours : 2 tests réussissent avant et 3 après. La correction de référence est dans exemples/correction-livraison/ShippingPolicy.kt.

## Skill, MCP et agent

Ouvrir .claude/skills/verifier-seuil/SKILL.md.
Dans Claude Code, saisir /verifier-seuil, puis la règle à vérifier. Contrôler l’unité et les trois cas de frontière.
Ouvrir .mcp.json, puis /mcp. Si le serveur local est activé, demander « Récupère CATALOGUE-12 avec lire_fiche et cite le résultat ». Comparer à docs/regle-livraison.txt.
Ouvrir .claude/agents/relecteur-seuil.md. Vérifier les outils, la mission et le point d’arrêt avant le lancement.


```sh
claude --bg --agent relecteur-seuil --name livraison "Relis le diff de ShippingPolicy.kt. Vérifie les trois cas du seuil et rends un rapport avec preuves et contrôles manquants." --allowedTools "Bash(./gradlew :shipping:test)"
claude agents
claude logs livraison
```


Le rapport doit citer le fichier, le cas exact et le statut du test. Si la session attend une permission, ouvrir la demande. Dans le workflow, le développeur lit le diff et le rapport avant de décider.

## Refaire le contrôle

Pour la note, dire ce qui reste à faire avant signature et ouvrir la pièce qui le démontre.
Pour le code, imaginer un seuil à 75 €. Tester 7 499, 7 500 et 7 501 centimes. Résultats : payante, offerte, offerte.

Les écrans d’interface reconstitués sont signalés dans la vidéo. Les valeurs de la note ont été comparées aux pièces du kit. Le diff et les résultats JUnit sont vérifiés localement.
