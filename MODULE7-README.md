# Module 7 - CI/CD avec GitLab 🚀

## Description

Ce module a été ajouté à la formation Vue.js 2025 pour couvrir l'intégration continue et le déploiement continu avec GitLab CI/CD.

## Contenu du module

### 1. Cours théorique (`module7-cicd-gitlab.md`)

Le cours complet couvre :
- **Concepts de base** : CI/CD, avantages, architecture
- **Configuration GitLab CI/CD** : `.gitlab-ci.yml`, pipelines, jobs, stages
- **Runners** : Types et configuration
- **Cache et Artifacts** : Optimisation des builds
- **Variables d'environnement** : Gestion des secrets
- **Déploiement multi-environnements** : Dev, Staging, Production
- **Review Apps** : Environnements éphémères pour les merge requests
- **Docker** : Build et déploiement d'images
- **Tests automatisés** : Unitaires et E2E
- **Sécurité** : Scans de dépendances, détection de secrets
- **Optimisations** : Cache, parallélisation, templates
- **Notifications** : Slack, email
- **Bonnes pratiques** : Workflows, nommage, gestion d'erreurs

### 2. QCM de validation (`module7-qcm.md`)

30 questions couvrant tous les aspects du module :
- Configuration et syntaxe GitLab CI/CD
- Concepts de stages, jobs, runners
- Cache vs Artifacts
- Variables et secrets
- Déploiement et environnements
- Review Apps et stratégies avancées
- Optimisations et bonnes pratiques

### 3. Exercices pratiques (`module7-exercices.md`)

12 exercices progressifs :
1. **Pipeline basique** : Install, lint, test
2. **Build et artifacts** : Configuration du build
3. **Variables d'environnement** : Gestion des variables
4. **Déploiement multi-environnements** : Dev/Staging/Prod
5. **Tests avec couverture** : Rapports de tests
6. **Optimisation du cache** : Cache intelligent
7. **Review Apps** : Environnements éphémères
8. **Tests E2E** : Cypress dans la pipeline
9. **Sécurité** : Scans et audits
10. **Notifications** : Slack et email
11. **Docker Build** : Création d'images Docker
12. **Pipeline complète TaskFlow** : Projet fil rouge

## Intégration dans la formation

Le module 7 a été intégré comme suit :

### Sommaire mis à jour
- Ajout du lien vers le module 7 dans le sommaire principal
- Création d'un nouveau jour 4 dans le programme

### Nouveau programme Jour 4
```
JOUR 4 - CI/CD ET PROJET FINAL 📅
├── Module 7 - CI/CD avec GitLab
│   ├── Concepts CI/CD
│   ├── Configuration GitLab CI/CD
│   ├── Pipelines et jobs
│   ├── Variables et secrets
│   ├── Déploiement multi-environnements
│   ├── Review Apps
│   ├── Optimisation des pipelines
│   └── Sécurité et bonnes pratiques
└── Projet Final & QCM
    ├── Projet fil rouge
    ├── Pipeline CI/CD complète
    ├── Bonnes pratiques 2025
    ├── Déploiement automatisé
    └── QCM de validation finale
```

## Fichiers créés

```
pages/
├── module7-cicd-gitlab.md    (34 KB - Cours complet)
├── module7-qcm.md            (13 KB - 30 questions)
└── module7-exercices.md      (15 KB - 12 exercices)
```

## Exemple de pipeline Vue.js incluse

Le module contient un exemple complet de pipeline GitLab CI/CD pour l'application TaskFlow (le fil rouge de la formation) avec :

```yaml
stages:
  - install
  - lint
  - test
  - security
  - build
  - deploy
  - notify

# Avec jobs pour :
- Installation des dépendances (avec cache)
- Lint ESLint et Prettier
- Tests unitaires avec couverture
- Tests E2E Cypress
- Scans de sécurité
- Build de l'application
- Déploiement Dev/Staging/Prod
- Review Apps pour les merge requests
- Notifications Slack
```

## Plateformes de déploiement couvertes

- Netlify
- Vercel
- AWS S3 + CloudFront
- Serveur SSH
- Docker + Registry GitLab

## Workflows avancés

- **Feature Branch** : Branche → Review App → Merge
- **GitFlow** : develop/release/hotfix/main
- **Trunk-Based Development** : Commits directs sur main
- **Blue-Green Deployment** : Basculement sans downtime
- **Canary Deployment** : Déploiement progressif

## Compétences acquises

À la fin de ce module, les apprenants sauront :

✅ Créer une pipeline CI/CD complète pour une application Vue.js
✅ Configurer le déploiement automatique multi-environnements
✅ Optimiser les temps de build avec le cache
✅ Sécuriser les secrets et variables sensibles
✅ Mettre en place des Review Apps automatiques
✅ Intégrer des tests automatisés dans la pipeline
✅ Créer des images Docker et les déployer
✅ Monitorer et recevoir des notifications
✅ Appliquer les bonnes pratiques DevOps 2025

## Technologies et outils couverts

- **GitLab CI/CD** : Pipelines, runners, environnements
- **Docker** : Build d'images, registres, déploiement
- **Vitest** : Tests unitaires avec couverture
- **Cypress** : Tests E2E automatisés
- **ESLint/Prettier** : Linting du code
- **npm audit** : Audit de sécurité
- **GitLab Security** : SAST, Dependency Scanning, Secret Detection
- **Slack API** : Notifications

## Pour les formateurs

### Durée estimée
- **Cours théorique** : 2-3 heures
- **Exercices pratiques** : 2-3 heures
- **Projet fil rouge** : 1-2 heures
- **Total** : 5-8 heures (1 journée complète)

### Prérequis
- Avoir complété les modules 1-6
- Avoir un compte GitLab (gratuit)
- Connaissances de base en Git
- Projet Vue.js fonctionnel (TaskFlow)

### Ressources nécessaires
- Compte GitLab avec Runner activé
- Variables configurées pour les déploiements
- (Optionnel) Compte Netlify/Vercel pour les démos
- (Optionnel) Webhook Slack pour les notifications

## Notes techniques

### Versions utilisées
- **GitLab CI/CD** : Dernière version 2025
- **Node.js** : 20
- **Docker** : 24
- **Cypress** : Dernière version avec Chrome 121

### Compatibilité
Le module est compatible avec :
- GitLab.com (SaaS)
- GitLab Self-Managed
- Tout projet Vue.js 3

## Mise à jour du projet TaskFlow

Pour intégrer la CI/CD dans TaskFlow, les apprenants devront :

1. Créer `.gitlab-ci.yml` à la racine
2. Configurer les variables dans GitLab
3. Ajouter les scripts de déploiement dans `package.json`
4. Créer un `Dockerfile` (optionnel)
5. Configurer nginx pour le déploiement (optionnel)

## Support et ressources

Les apprenants ont accès à :
- 📚 Documentation officielle GitLab CI/CD
- 🎥 Exemples commentés dans les slides
- 💻 Templates prêts à l'emploi
- 🔗 Liens vers les ressources externes
- 💬 Section FAQ dans le cours

## Évolutions futures

Possibilités d'extension du module :
- Kubernetes et Helm
- GitLab Auto DevOps
- Infrastructure as Code (Terraform)
- Monitoring avancé (Prometheus, Grafana)
- Feature Flags et Progressive Delivery
- Rollback automatique

---

**Module créé le : 27 janvier 2026**
**Langage : Français**
**Format : Slidev (Markdown)**
**Auteur : Formation Vue.js 2025**
