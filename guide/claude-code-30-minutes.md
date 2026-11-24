# Rejouer la formation Claude Code de 30 minutes

## 01:30 · Du prompt aux tests

Ouvrir [le projet Kotlin](../exemples/livraison-kotlin). La [règle](../exemples/livraison-kotlin/docs/regle-livraison.txt) utilise le sous-total. **50,00 € = 5 000 centimes**.

| Sous-total | Valeur dans le code | Livraison attendue |
| --- | ---: | --- |
| 49,99 € | 4 999 | Payante |
| 50,00 € | 5 000 | Offerte |
| 50,01 € | 5 001 | Offerte |

Depuis le projet Kotlin, démarrer `claude --permission-mode plan` et saisir cette demande.

> Inspecte seulement le module shipping et ses tests. La livraison est offerte à partir de 5 000 centimes. Repère le test existant exactThresholdIsFree et explique son échec. Propose un correctif minimal en gardant les trois tests. Donne la commande de vérification et attends mon accord avant de modifier le code.

Après revue du plan, vérifier le [diff attendu](../exemples/correction-livraison/ShippingPolicy.kt) et les [sorties avant](../resultats/JUnit-avant.txt) et [après](../resultats/JUnit-apres.txt). La commande du dépôt est `./gradlew :shipping:test`. Les sorties de la vidéo ont été obtenues directement avec Kotlin et JUnit.

## 06:00 · Instructions, mémoire et contexte

- Ouvrir [CLAUDE.md](../exemples/livraison-kotlin/CLAUDE.md), puis vérifier les instructions de la session avec `/memory`.
- Choisir un modèle avec `/model`. Comparer deux sessions avec `/context` en gardant le même modèle et la même question. La première explore le dépôt. La seconde cible le module et ses tests.
- Pour reprendre un travail long, saisir `/compact Conserve la règle, les trois résultats attendus et la dernière preuve de test`, puis demander de restituer ces éléments.

## 10:55 · Skill, MCP, sous-agent et workflow

1. Ouvrir [SKILL.md](../exemples/livraison-kotlin/.claude/skills/verifier-seuil/SKILL.md) et appeler `/verifier-seuil` pour retrouver les trois cas.
2. Vérifier la connexion avec `/mcp`, puis demander la fiche CATALOGUE-12 au [serveur catalogue](../exemples/livraison-kotlin/mcp/catalogue.mjs). [Réponse MCP vérifiée](../resultats/MCP-resultat.json)
3. Confier la lecture du diff au [sous-agent](../exemples/livraison-kotlin/.claude/agents/relecteur-seuil.md). Il dispose de Read, Glob et Grep. Lancer les tests depuis le terminal principal.
4. Si la règle manque ou si un test échoue, arrêter la revue et relever la preuve manquante. Quand les éléments sont réunis, remettre le rapport à la personne qui décide.

## 19:40 · RAG, Spring AI et LangChain4j

Ouvrir l’[atelier Java](../exemples/rag-java). Les deux frameworks traitent les mêmes questions avec le même corpus. LIV-01 est une fiche du corpus Java. CATALOGUE-12 est l’identifiant employé dans l’exemple MCP de la partie précédente.

| Question | Source | Résultat attendu |
| --- | --- | --- |
| Quelle est la règle standard en France ? | Fiche LIV-01 | Livraison offerte dès 50 € |
| Et au Canada ? | Aucune fiche applicable | Information insuffisante |
| Où en est DEMO-103 ? | Outil MCP de statut | Expédiée |
| Où en est DEMO-999 ? | Outil MCP de statut | Commande inconnue |

## 26:15 · Livrable à partir de notes

Utiliser les [trois notes fictives](../exemples/cowork) dans Claude avec les capacités issues de Cowork. Demander un tableau de décisions, responsables, échéances et sources. Pour chaque champ absent, indiquer « À confirmer ». Contrôler le devis dans la note 1. Dans la note 2, le fichier CSV est attendu avant la signature et le responsable est à confirmer.

## 28:10 · Deuxième projet et références

- [Terraform Change Review](terraform-change-review.md)
- [Bonnes pratiques Claude Code](https://code.claude.com/docs/en/best-practices)
- [Spring AI et RAG](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html)
- [LangChain4j et RAG](https://docs.langchain4j.dev/tutorials/rag/)
