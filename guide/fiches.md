# Fiches de la formation

Les exemples utilisent des données fictives. Les sorties de référence restent vérifiables à partir des entrées.

## Le prompt et la réponse vérifiable

### Définition et usage

- Un prompt est la demande envoyée à Claude.
- Quand : comparer des documents et justifier un choix.
- Demander un résultat et la preuve qui le soutient.

### Mode d’emploi

- claude.ai → Nouveau chat → + → Importer.
- Ajouter Pilote-A.txt, Pilote-B.txt et Criteres.txt.
- Saisir la demande de comparaison et envoyer.

### Exemple commenté

- A : 8 000 €, 4 semaines, export CSV annoncé.
- B : 10 500 €, 3 semaines, format inconnu.
- Critères : 9 000 € et 5 semaines. Tester le CSV.

### Résultat et vérification

- Saisie : compare A et B. Cite les pièces et recommande sous condition.
- Sortie : retenir A, sous réserve d’un test CSV.
- Vérifier les chiffres dans les pièces. B dépasse de 1 500 €.

### À retenir

- La pièce établit le chiffre. La condition reste à vérifier.

## Les modèles Claude

### Définition et usage

- Le modèle est le moteur qui traite votre demande.
- Quand : adapter le choix à la difficulté de la tâche.

### Mode d’emploi

- Ouvrir le sélecteur de modèle dans le chat.
- Sélectionner un modèle disponible pour le type de tâche.
- Comparer sur les mêmes pièces.

### Exemple commenté

- Entrée : réunion le 12 ; décision le 18 ; délai 4 semaines.
- « Extrais les deux dates et cite les passages. »
- Sortie : réunion le 12, décision le 18.

### Résultat et vérification

- Sortie : liste des dates ou comparaison structurée.
- Contrôle : retrouver chaque date et condition dans la note.
- Ajuster l’effort si le modèle et la tâche le justifient.

### À retenir

- Choisir selon le travail et vérifier les mêmes faits.

## Le contexte

### Définition et usage

- Le contexte regroupe les informations utilisées pour répondre.
- Quand : poursuivre le même travail ou repartir sur une tâche ciblée.

### Mode d’emploi

- Même chat : rappeler les décisions encore valables.
- Nouveau chat : joindre les seules pièces utiles.
- Relire les données prises en compte.

### Exemple commenté

- Entrée : mardi ou jeudi. Réunion de 30 minutes, cinq personnes.
- Saisie : « Compare uniquement mardi et jeudi, en deux lignes. »
- Sortie : deux options, sans revenir aux dates écartées.

### Résultat et vérification

- Mardi : option 1 pour 5 personnes, 30 min.
- Jeudi : option 2 avec les mêmes paramètres.
- Vérifier qu’aucune date écartée ne réapparaît.

### À retenir

- Donner les informations qui comptent pour la tâche actuelle.

## Tokens et quota d’usage

### Définition et usage

- Les tokens sont les unités de texte traitées par le modèle.
- Le quota décrit l’usage disponible sur votre offre.
- Quand : une session s’allonge ou votre usage approche d’une limite.

### Mode d’emploi

- Pour une question précise, nommer les pages à lire.
- Consulter l’écran d’usage du compte pour le quota.
- Dans Claude Code, /context renseigne sur la session.

### Exemple commenté

- Calendrier, p. 4 : pilote le 3 déc. ; lancement le 17 déc.
- « Lis le calendrier. Donne les dates de livraison. »
- Pilote : 3 décembre. Lancement : 17 décembre. Source : p. 4.

### Résultat et vérification

- La réponse tient dans les pages demandées.
- L’écran d’usage indique ce qui est disponible avec l’offre.

### À retenir

- Le contexte est ce que Claude traite. Le quota relève de l’offre.

## Les Projets Claude

### Définition et usage

- Un Projet regroupe des chats, des documents et des consignes.
- Quand : plusieurs conversations utilisent les mêmes références.

### Mode d’emploi

- Projets → Créer « Pilote fournisseurs ».
- Ajouter A, B et Critères dans les connaissances.
- Ajouter l’instruction : « Cite le fichier et signale toute inconnue. »

### Exemple commenté

- Ouvrir un nouveau chat dans le Projet.
- Saisie : « Pourquoi B dépasse-t-il le budget ? Donne les sources. »
- Sortie : 10 500 € moins 9 000 €, soit 1 500 €.

### Résultat et vérification

- Ouvrir Pilote-B.txt pour le montant et Criteres.txt pour le plafond.
- Refaire la soustraction.

### À retenir

- Le Projet conserve les références communes à plusieurs conversations.

## La mémoire

### Définition et usage

- La mémoire aide Claude à reprendre des repères entre les échanges.
- Quand : une préférence revient d’une conversation à l’autre.

### Mode d’emploi

- Ouvrir les réglages de mémoire selon l’offre.
- Vérifier l’option de mémoire dans la conversation ou le Projet.
- Dans un nouveau chat, demander un compte rendu.

### Exemple commenté

- Entrée : « Je préfère décision, source et prochaine action. »
- Nouveau chat : « Rédige un compte rendu du pilote. »
- Sortie attendue : trois rubriques avec les faits du dossier.

### Résultat et vérification

- La forme répond à la préférence.
- Le montant doit venir de Criteres.txt.

### À retenir

- Une préférence peut être mémorisée. Une décision doit avoir une source.

## La recherche documentaire et le RAG

### Définition et usage

- Le RAG retrouve des passages utiles avant la rédaction.
- Quand : la réponse dépend de faits noyés dans de nombreux documents.

### Mode d’emploi

- Dans un Projet, ajouter les références.
- Poser une question précise et demander le passage source.
- Ouvrir la pièce citée pour vérifier son contexte.

### Exemple commenté

- Note du 4 : salle B envisagée. Note du 8 : salle B confirmée.
- Saisie : « Quand la nouvelle salle a-t-elle été confirmée ? Cite la note. »
- Sortie : le 8, d’après la note qui confirme la décision.

### Résultat et vérification

- Relire les deux extraits. « Envisagée » et « confirmée » diffèrent.
- Le RAG dépend du volume et de la configuration du Projet.

### À retenir

- Retrouver un passage est utile si on peut vérifier ce qu’il établit.

## La recherche web et les citations

### Définition et usage

- La recherche web retrouve des sources externes citables.
- Quand : le fait peut évoluer ou dépend d’une documentation publique.

### Mode d’emploi

- Dans le chat, demander explicitement une recherche web.
- Choisir l’option si elle est proposée.
- Ouvrir la citation et vérifier le titre et le passage.

### Exemple commenté

- Saisie : « Cherche les conditions de bagages TGV INOUI sur SNCF Voyageurs. »
- Sortie : lien officiel et conditions du train.
- Contrôle : comparer le type de train et les exceptions.

### Résultat et vérification

- La page « Vos bagages et consignes » concerne le TGV INOUI.
- Lire la règle utile pour le trajet avant de prendre une décision.

### À retenir

- Une citation permet de retrouver et de vérifier la règle.

## Les artefacts

### Définition et usage

- Un artefact est un résultat que l’on ouvre à côté du chat.
- Quand : une personne doit lire, manipuler ou vérifier un résultat.

### Mode d’emploi

- Dans un chat, demander un artefact interactif.
- Ouvrir l’aperçu. Saisir deux entrées et observer le résultat.
- Décrire une correction et refaire les essais si besoin.

### Exemple commenté

- Saisie : « Fais un calculateur d’addition. Refuse zéro personne. »
- Entrée : 48 € et 4 personnes.
- Sortie : 12 € par personne.

### Résultat et vérification

- 48 € ÷ 4 = 12 €.
- À zéro personne, afficher un message d’erreur.

### À retenir

- Essayer une entrée normale et une entrée invalide.

## Les connecteurs

### Définition et usage

- Un connecteur relie Claude à un service auquel vous avez accès.
- Quand : retrouver une information dans un espace de travail connecté.

### Mode d’emploi

- Ouvrir le menu + ou la gestion des connecteurs.
- Sélectionner un service autorisé. Contrôler le compte et les droits.
- Demander de lire un document précis.

### Exemple commenté

- Source fictive : Lancement produit, 12 novembre.
- « Relève les décisions et donne le lien. Lis seulement. »
- Réponse : pilote le 3 décembre ; Léa prépare le devis.

### Résultat et vérification

- Ouvrir le lien renvoyé et contrôler le titre et la date.
- Relire « pilote le 3 décembre » et « Léa prépare le devis ».

### À retenir

- Le connecteur donne accès au service. Le document reste la preuve.

## Cowork

### Définition et usage

- Cowork permet de confier une tâche qui produit un livrable.
- Quand : assembler des sources dans un fichier à relire.

### Mode d’emploi

- Ouvrir une tâche Cowork si disponible.
- Joindre les pièces ou sélectionner un dossier accessible.
- Indiquer le nom de fichier, le public et les sources.

### Exemple commenté

- Réunion 1 : Léa prépare le devis pour le 12 décembre.
- « Crée plan-actions.md. Action, responsable, échéance et source. »
- Sortie : Devis · Léa · 12 décembre · Réunion 1.

### Résultat et vérification

- Relire la ligne du livrable et retrouver la note.
- Si aucun responsable n’est désigné, écrire « à confirmer ».

### À retenir

- Confier un livrable précis et relire les décisions dans les sources.

## Claude Code et le mode plan

### Définition et usage

- Claude Code travaille avec les fichiers et les outils du dépôt.
- Le mode plan sert à examiner l’approche avant une modification.

### Mode d’emploi

- Ouvrir un terminal à la racine du projet.
- Lancer ./gradlew :shipping:test puis claude --permission-mode plan.
- Lire le plan avant d’autoriser l’édition.

### Exemple commenté

- ShippingPolicy.kt retourne subtotalCents > 5000L.
- Règle : livraison offerte dès 50 €.
- Saisie : « Explique l’échec à 5 000 centimes et propose un plan. »

### Résultat et vérification

- Plan attendu : modifier la comparaison et garder les tests.
- Avant correction, le test du seuil exact échoue avec JUnit.

### À retenir

- Valider le fichier, la portée et le contrôle.

## CLAUDE.md

### Définition et usage

- CLAUDE.md contient les instructions de travail du projet.
- Quand : une convention doit s’appliquer à plusieurs sessions et personnes.

### Mode d’emploi

- À la racine, écrire les conventions et la commande du module.
- Démarrer Claude Code et inspecter /memory si disponible.
- Vérifier la consigne chargée avant la demande.

### Exemple commenté

- CLAUDE.md : montants en centimes. Tests via ./gradlew :shipping:test.
- Saisie : « À 5 000 centimes, la livraison doit être offerte. »
- Plan : ouvrir ShippingPolicy.kt et remplacer > par >=.

### Résultat et vérification

- Contrôler que Claude cite le bon fichier et garde les trois tests.
- La règle métier se lit dans docs/regle-livraison.txt.

### À retenir

- CLAUDE.md garde les conventions que l’équipe peut relire.

## Les permissions

### Définition et usage

- Les permissions contrôlent les actions des outils de Claude Code.
- Quand : Claude doit modifier un fichier ou exécuter une commande.

### Mode d’emploi

- Revenir au plan si le périmètre change.
- Lire le nom de l’outil, la commande et le dossier proposés.
- Autoriser l’action qui correspond à la mission.

### Exemple commenté

- Tâche : appliquer le seuil dans ShippingPolicy.kt.
- Action de test proposée : ./gradlew :shipping:test.
- Vérifier le module et relire ensuite le diff.

### Résultat et vérification

- La commande vise le module shipping.
- Si un autre module est touché, demander pourquoi avant d’approuver.

### À retenir

- Une consigne décrit le travail. Une permission autorise une action.

## Le diff et les tests

### Définition et usage

- Le diff montre les lignes modifiées. Un test vérifie le comportement.
- Quand : avant de valider un changement de code.

### Mode d’emploi

- Saisie : « Applique le plan et garde les trois attentes. »
- git diff -- shipping/src/main/kotlin/formation/shipping/ShippingPolicy.kt
- ./gradlew :shipping:test

### Exemple commenté

- Avant : return subtotalCents > 5000L
- Après : return subtotalCents >= 5000L
- Test : assertTrue(policy.isFree(5000L))

### Résultat et vérification

- 49,99 € payante ; 50 € et 50,01 € offertes.
- Kotlin et JUnit : 2 réussites avant, 3 après.
- Gradle est la commande du projet. La vérification locale a été directe.

### À retenir

- Relire le changement et la preuve, puis décider.

## Reprendre une session

### Définition et usage

- Un résumé de reprise fixe l’état du travail et les preuves.
- Quand : une longue session touche sa limite de contexte.

### Mode d’emploi

- Ouvrir /context dans Claude Code si disponible.
- Demander un résumé de reprise ou utiliser /compact.
- Repartir avec la règle, le diff et la dernière sortie de test.

### Exemple commenté

- Saisie : « Récapitule règle, fichier, tests exécutés et décision restante. »
- Sortie : 50 €, ShippingPolicy.kt, test de frontière, revue à faire.
- Vérifier que la reprise garde le bon module et le bon seuil.

### Résultat et vérification

- Demander : « Quel est le test exact à relancer ? »
- Attendre la commande du module shipping ou vérifier les fichiers.

### À retenir

- Reprendre avec des décisions et des preuves déjà vérifiées.

## Les skills

### Définition et usage

- Un skill enregistre une méthode que Claude peut réutiliser.
- Quand : plusieurs tâches demandent le même contrôle.

### Mode d’emploi

- Créer .claude/skills/verifier-seuil/SKILL.md.
- Écrire le nom, la description et les étapes.
- Dans Claude Code : /verifier-seuil Vérifie la règle de livraison.

### Exemple commenté

- Entrée : seuil de 5 000 centimes.
- Étapes : lire la règle puis contrôler 4 999, 5 000 et 5 001.
- Sortie : payante, offerte, offerte, avec source et statut des tests.

### Résultat et vérification

- Vérifier les trois valeurs et l’unité.
- Chercher la preuve d’un test réellement exécuté.

### À retenir

- Le skill conserve la procédure, avec un résultat à contrôler.

## Le protocole MCP

### Définition et usage

- MCP permet à un outil d’exposer des capacités à Claude.
- Quand : Claude doit lire une information dans un système ou un outil.

### Mode d’emploi

- Configurer ou sélectionner le serveur autorisé.
- Dans Claude Code, ouvrir /mcp pour vérifier la connexion.
- Demander l’action et l’identifiant précis.

### Exemple commenté

- Saisie : « Appelle lire_fiche avec CATALOGUE-12. »
- Entrée de l’outil : CATALOGUE-12.
- Sortie : livraison offerte dès 50 €. Relire la fiche.

### Résultat et vérification

- Contrôler le nom de l’outil, l’identifiant et la source.
- L’appel local de démonstration renvoie la règle attendue.

### À retenir

- MCP donne accès à un outil. La source justifie la donnée.

## Les agents de relecture

### Définition et usage

- Un agent reçoit une mission et utilise des outils pour la mener.
- Quand : déléguer une tâche avec un résultat et un point d’arrêt clairs.

### Mode d’emploi

- Créer .claude/agents/relecteur-seuil.md avec mission et outils.
- claude --bg --agent relecteur-seuil --name livraison "Relis le diff et rends le rapport."
- claude agents ; puis claude logs livraison

### Exemple commenté

- Entrée : règle, diff et trois cas de frontière.
- Mission : lire, vérifier le seuil exact et rendre un rapport.
- Sortie : résultat, preuve et vérifications manquantes.

### Résultat et vérification

- Ouvrir le rapport et comparer avec le diff et la sortie du test.
- Si une permission est en attente, relire la demande.

### À retenir

- L’agent porte une mission. Le skill décrit une méthode.

## Le workflow agentique

### Définition et usage

- Un workflow organise les étapes et la transmission des preuves.
- Quand : enchaîner plusieurs actions avec un contrôle entre elles.

### Mode d’emploi

- Session 1 : appliquer la correction et remettre le diff.
- Agent de revue : contrôler la règle et les tests.
- Développeur : lire les preuves puis décider.

### Exemple commenté

- Entrée : seuil et test de frontière.
- Sortie intermédiaire : diff et résultat des tests.
- Sortie de revue : preuve et contrôles restants.

### Résultat et vérification

- Si le test exact échoue, revenir à la correction avec le cas et les valeurs.
- Le développeur valide après lecture.

### À retenir

- Chaque étape transmet une preuve exploitable à la suivante.
