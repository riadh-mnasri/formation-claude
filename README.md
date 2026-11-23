# Formation Claude

**Claude web et Claude Code, de la demande à la preuve.**

Les fichiers de cette formation de **29 min 46** permettent de refaire deux démonstrations. Dans Claude web, vous comparez des offres et vous rédigez une note de décision sourcée. Dans Claude Code, vous préparez une correction Kotlin, relisez le diff et vérifiez trois tests de frontière.

## Refaire les démonstrations

| Démonstration | Ressources | Résultat à vérifier |
| --- | --- | --- |
| Note de décision dans Claude web | [Trois pièces et note de référence](exemples/decision-pilote), [prompts copiables](guide/prompts-et-commandes.md#claude-web) | L’option A respecte les contraintes. L’export CSV reste à tester. |
| Correction Kotlin dans Claude Code | [Projet Gradle](exemples/livraison-kotlin), [commandes et prompts](guide/prompts-et-commandes.md#claude-code), [correctif](exemples/correction-livraison) | La livraison est offerte dès 50 €. Les tests couvrent 49,99 €, 50 € et 50,01 €. |
| Cowork, skills, MCP et agent | [Notes de réunion](exemples/cowork), [skill](exemples/livraison-kotlin/.claude/skills/verifier-seuil/SKILL.md), [agent](exemples/livraison-kotlin/.claude/agents/relecteur-seuil.md), [guide](guide/prompts-et-commandes.md) | Ouvrir la source, contrôler la commande exécutée et relire le rapport. |

Les [fiches](guide/fiches.md) reprennent les vingt notions, avec une définition, un geste concret, un exemple et un contrôle. Les [chapitres](guide/chapitres.txt), les [sous-titres français](guide/formation-fr.srt) et les [références officielles](guide/references.md) permettent de retrouver un passage.

## Tester le projet Kotlin

Il faut Java 17. Depuis la racine du dépôt, lancer les commandes suivantes.

```sh
cd exemples/livraison-kotlin
./gradlew :shipping:test
```

L’état de départ contient volontairement le défaut du seuil exact. Le premier lancement du wrapper peut télécharger Gradle et ses dépendances. Sous Windows, utiliser `gradlew.bat :shipping:test`.

Le [résultat JUnit avant](resultats/JUnit-avant.txt) donne deux réussites et un échec. Le [résultat après](resultats/JUnit-apres.txt) donne trois réussites. Ces preuves ont été obtenues avec le compilateur Kotlin et JUnit, car Gradle ne démarrait pas dans la session de tournage. Les simulations d’interface sont indiquées dans la vidéo. Les données d’exercice sont fictives.

## À propos de Riadh MNASRI

Riadh MNASRI est tech lead et architecte. Il s’intéresse à l’intégration de l’intelligence artificielle dans les projets d’envergure et les startups. La formation se termine par une visite de **Terraform Change Review**, un projet Kotlin qui analyse des plans Terraform et structure les preuves d’une revue. [Profil GitHub](https://github.com/riadh-mnasri) · [Terraform Change Review](https://github.com/riadh-mnasri/terraform-change-review)
