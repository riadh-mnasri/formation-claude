# Atelier Java · RAG et appel d’outil

Les deux intégrations travaillent sur le même corpus fictif et la même règle de livraison. La France doit produire la référence `LIV-01`. Pour le Canada, le corpus ne suffit pas. Les vecteurs et le modèle sont des doublures déterministes. Cet atelier vérifie la circulation du contexte dans Spring AI et LangChain4j. Il ne demande aucune clé API.

- **Spring AI** utilise `ChatClient`, un `QuestionAnswerAdvisor` et un `SimpleVectorStore`.
- **LangChain4j** relie une interface `Assistant` à un `ContentRetriever` avec `AiServices`.
- **MCP** consulte le statut d’une commande fictive avec un serveur local en lecture seule. L’outil traite une donnée de statut, tandis que le RAG s’appuie sur un document.

## Exécuter les deux intégrations

Depuis ce répertoire, avec Java 17 et Maven.

```sh
mkdir -p target/classes
mvn -q dependency:build-classpath -Dmdep.outputFile=target/classpath.txt
CP=$(cat target/classpath.txt)
javac -encoding UTF-8 -cp "$CP" -d target/classes src/main/java/AtelierRag.java
java -cp "target/classes:$CP" AtelierRag
```

Le programme vérifie les deux cas pour chaque framework et quitte en erreur si une réponse diffère de l’attendu. Consulter le [résultat vérifié](../../resultats/RAG-Java.txt).

## Interroger un statut via MCP

```sh
node mcp/verifier.mjs
```

Le test démarre le serveur MCP en local, vérifie la liste des outils et appelle `lire_statut_commande` sur `DEMO-103` puis `DEMO-999`. Il contrôle « expédiée » et « commande inconnue ». [Résultat vérifié](../../resultats/MCP-commandes.txt)

Pour découvrir le même outil dans Claude Code, ouvrir la session depuis ce répertoire. La configuration de projet se trouve dans `.mcp.json`. Après avoir contrôlé le serveur affiché dans `/mcp`, demander « Utilise l’outil lire_statut_commande pour DEMO-103 et cite l’identifiant retourné. »
