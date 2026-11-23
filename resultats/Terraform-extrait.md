# Extrait de la revue locale Terraform

Entrée : fichier synthétique `examples/gcp-risky.json` du dépôt public Terraform Change Review.

### HIGH · TF-REPLACE · Resource replacement planned

Resource: google\_sql\_database\_instance.orders

Continuity and data preservation require review; the plan alone does not prove downtime or data loss. Provider abandonment semantics may affect removal.

- /change/actions: null → \["delete","create"\]

Next check: Check provider deletion behavior, lifecycle ordering, backups and recovery procedures.
