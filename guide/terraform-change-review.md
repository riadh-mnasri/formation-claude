# Visite GitHub

Ouvrir le [dépôt public Terraform Change Review](https://github.com/riadh-mnasri/terraform-change-review). Lire le README et l’exemple de rapport dans `docs/example-review.md`. Avec le JAR construit selon les instructions du dépôt, lancer sa revue locale depuis ce dépôt.

```sh
java -jar build/libs/terraform-change-review.jar review \
  examples/gcp-risky.json --format markdown --fail-on none
```

Sur le fichier synthétique montré, `TF-REPLACE` identifie l’instance `orders` et les actions `delete` puis `create`. Ce constat justifie les questions de sauvegarde, de séquence et de reprise. Une interruption ne peut pas être établie à partir du plan seul.

[Extrait vérifié de la revue locale](../resultats/Terraform-extrait.md)

Prompt de lecture du rapport.

```text
Résume le constat TF-REPLACE. Cite la ressource, les actions et les limites du plan. Indique les questions à poser avant une décision.
```
