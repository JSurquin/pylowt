---
layout: section
---

# Exercices pratiques
## Module Bonus - CI/CD avec GitLab 🎯

Mettons en pratique !

---

# Exercice 1 : Pipeline basique 🚀

---

## Objectif

Créer une pipeline CI/CD simple pour TaskFlow avec installation, lint et tests.

---

## Étapes

1. À la racine de votre projet, créer `.gitlab-ci.yml`
2. Configurer 3 stages : `install`, `lint`, `test`
3. Créer un job pour installer les dépendances
4. Créer un job pour linter le code
5. Créer un job pour exécuter les tests unitaires

---

## Code de départ

```yaml
image: node:20

stages:
  # TODO: Définir les stages

# TODO: Configurer le cache

# TODO: Job d'installation

# TODO: Job de lint

# TODO: Job de tests
```

---

## Solution - Configuration

```yaml
image: node:20

stages:
  - install
  - lint
  - test

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/
```

---

## Solution - Job d'installation

```yaml
install:dependencies:
  stage: install
  script:
    - npm ci --prefer-offline
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 day
```

---

## Solution - Job de lint

```yaml
lint:eslint:
  stage: lint
  dependencies:
    - install:dependencies
  script:
    - npm run lint
```

---

## Solution - Job de tests

```yaml
test:unit:
  stage: test
  dependencies:
    - install:dependencies
  script:
    - npm run test:unit -- --run
```

---

# Exercice 2 : Build et artifacts 📦

---

## Objectif

Ajouter un stage de build et gérer les artifacts correctement.

---

## Étapes

1. Ajouter un stage `build` après `test`
2. Créer un job qui build l'application
3. Configurer les artifacts pour sauvegarder le dossier `dist/`
4. Définir une expiration de 1 semaine
5. Le job ne doit s'exécuter que sur `main` et `develop`

---

## Solution

```yaml
build:app:
  stage: build
  dependencies:
    - install:dependencies
  script:
    - echo "Building application..."
    - npm run build
    - echo "Build size:"
    - du -sh dist/
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main
    - develop
```

---

# Exercice 3 : Variables d'environnement 🔐

---

## Objectif

Utiliser des variables pour différencier les environnements.

---

## Étapes

1. Définir des variables globales (`NODE_ENV`, `APP_NAME`)
2. Créer un job qui affiche les variables GitLab CI/CD
3. Utiliser des variables spécifiques à un job
4. Configurer des variables dans l'interface GitLab

---

## Solution - Variables globales

```yaml
variables:
  NODE_ENV: "production"
  APP_NAME: "taskflow"
  npm_config_cache: "$CI_PROJECT_DIR/.npm"

show:variables:
  stage: test
  script:
    - echo "Node Environment: $NODE_ENV"
    - echo "App Name: $APP_NAME"
    - echo "Branch: $CI_COMMIT_BRANCH"
    - echo "Commit: $CI_COMMIT_SHA"
    - echo "Pipeline ID: $CI_PIPELINE_ID"
```

---

## Solution - Variables spécifiques

```yaml
deploy:staging:
  stage: deploy
  variables:
    DEPLOY_ENV: "staging"
    API_URL: "https://api-staging.taskflow.com"
  script:
    - echo "Deploying to $DEPLOY_ENV"
    - echo "API URL: $API_URL"
  only:
    - develop
```

---

# Exercice 4 : Déploiement multi-environnements 🌐

---

## Objectif

Configurer des déploiements vers différents environnements.

---

## Étapes

1. Ajouter un stage `deploy`
2. Créer 3 jobs de déploiement :
   - `deploy:development` (automatique sur `develop`)
   - `deploy:staging` (automatique sur `main`)
   - `deploy:production` (manuel sur `tags`)
3. Configurer les environnements GitLab
4. Définir les URLs des environnements

---

## Solution - Deploy Development

```yaml
deploy:development:
  stage: deploy
  dependencies:
    - build:app
  environment:
    name: development
    url: https://dev.taskflow.com
  script:
    - echo "Deploying to Development..."
    - npm run deploy:dev
  only:
    - develop
```

---

## Solution - Deploy Staging

```yaml
deploy:staging:
  stage: deploy
  dependencies:
    - build:app
  environment:
    name: staging
    url: https://staging.taskflow.com
  script:
    - echo "Deploying to Staging..."
    - npm run deploy:staging
  only:
    - main
```

---

## Solution - Deploy Production

```yaml
deploy:production:
  stage: deploy
  dependencies:
    - build:app
  environment:
    name: production
    url: https://taskflow.com
  script:
    - echo "Deploying to Production..."
    - npm run deploy:prod
  only:
    - tags
  when: manual
```

---

# Exercice 5 : Tests avec couverture 🧪

---

## Objectif

Configurer les tests unitaires avec rapport de couverture.

---

## Étapes

1. Modifier le job `test:unit` pour générer la couverture
2. Extraire le pourcentage de couverture
3. Générer un rapport Cobertura
4. Configurer les artifacts pour les rapports
5. Afficher la couverture dans GitLab

---

## Solution

```yaml
test:unit:
  stage: test
  dependencies:
    - install:dependencies
  script:
    - npm run test:unit -- --run --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      junit: coverage/junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
    expire_in: 30 days
```

---

# Exercice 6 : Optimisation du cache 💨

---

## Objectif

Optimiser les temps de build avec un cache intelligent.

---

## Étapes

1. Configurer le cache basé sur `package-lock.json`
2. Utiliser différentes politiques de cache
3. Optimiser le cache pour les jobs de build
4. Mesurer l'amélioration des temps d'exécution

---

## Solution - Cache global

```yaml
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
    - .npm/
  policy: pull-push
```

---

## Solution - Optimisation par job

```yaml
install:dependencies:
  stage: install
  cache:
    policy: pull-push
  script:
    - npm ci --prefer-offline

build:app:
  stage: build
  cache:
    policy: pull
  script:
    - npm run build
```

---

# Exercice 7 : Review Apps 🔍

---

## Objectif

Créer des Review Apps automatiques pour les merge requests.

---

## Étapes

1. Créer un job `review` qui s'exécute sur les merge requests
2. Configurer un environnement dynamique
3. Ajouter un job pour arrêter la Review App
4. Configurer l'auto-stop après 1 semaine

---

## Solution - Review App

```yaml
review:
  stage: deploy
  dependencies:
    - build:app
  script:
    - echo "Creating Review App for MR..."
    - npm run deploy:review
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.review.taskflow.com
    on_stop: stop_review
    auto_stop_in: 1 week
  only:
    - merge_requests
```

---

## Solution - Stop Review App

```yaml
stop_review:
  stage: deploy
  script:
    - echo "Stopping Review App..."
    - npm run destroy:review
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  when: manual
  only:
    - merge_requests
```

---

# Exercice 8 : Tests E2E 🎭

---

## Objectif

Ajouter des tests end-to-end avec Cypress.

---

## Étapes

1. Créer un job `test:e2e` dans le stage `test`
2. Utiliser l'image Docker Cypress
3. Sauvegarder les screenshots et vidéos en cas d'échec
4. Configurer le job pour qu'il puisse échouer sans bloquer

---

## Solution

```yaml
test:e2e:
  stage: test
  image: cypress/browsers:node20.11.0-chrome121.0.6167.85-1
  dependencies:
    - install:dependencies
  script:
    - npm run build
    - npm run test:e2e:ci
  artifacts:
    when: on_failure
    paths:
      - cypress/screenshots/
      - cypress/videos/
    expire_in: 7 days
  allow_failure: true
  only:
    - merge_requests
    - main
```

---

# Exercice 9 : Sécurité 🔒

---

## Objectif

Ajouter des scans de sécurité à la pipeline.

---

## Étapes

1. Ajouter un stage `security`
2. Créer un job pour l'audit npm
3. Ajouter un scan de dépendances GitLab
4. Configurer la détection de secrets
5. Les jobs de sécurité peuvent échouer sans bloquer

---

## Solution - Audit npm

```yaml
security:audit:
  stage: security
  script:
    - echo "Running security audit..."
    - npm audit --audit-level=moderate
  allow_failure: true
  only:
    - merge_requests
    - main
```

---

## Solution - GitLab Security Scans

```yaml
include:
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml

dependency_scanning:
  stage: security
  allow_failure: true

sast:
  stage: security
  allow_failure: true

secret_detection:
  stage: security
  allow_failure: false
```

---

# Exercice 10 : Notifications 📢

---

## Objectif

Ajouter des notifications Slack en cas de succès ou d'échec.

---

## Étapes

1. Ajouter un stage `.post` (stage spécial qui s'exécute toujours)
2. Créer un job `notify:success`
3. Créer un job `notify:failure`
4. Configurer les conditions d'exécution
5. Ajouter une variable `SLACK_WEBHOOK_URL` dans GitLab

---

## Solution - Notification succès

```yaml
notify:success:
  stage: .post
  script:
    - |
      curl -X POST -H 'Content-type: application/json' \
      --data "{
        \"text\":\"✅ Pipeline réussie pour TaskFlow\",
        \"blocks\":[{
          \"type\":\"section\",
          \"text\":{
            \"type\":\"mrkdwn\",
            \"text\":\"*Pipeline réussie*\n• Branch: $CI_COMMIT_BRANCH\n• Commit: $CI_COMMIT_SHORT_SHA\n• Auteur: $CI_COMMIT_AUTHOR\"
          }
        }]
      }" \
      $SLACK_WEBHOOK_URL
  when: on_success
  only:
    - main
    - develop
```

---

## Solution - Notification échec

```yaml
notify:failure:
  stage: .post
  script:
    - |
      curl -X POST -H 'Content-type: application/json' \
      --data "{
        \"text\":\"❌ Pipeline échouée pour TaskFlow\",
        \"blocks\":[{
          \"type\":\"section\",
          \"text\":{
            \"type\":\"mrkdwn\",
            \"text\":\"*Pipeline échouée*\n• Branch: $CI_COMMIT_BRANCH\n• Job: $CI_JOB_NAME\n• Pipeline: $CI_PIPELINE_URL\"
          }
        }]
      }" \
      $SLACK_WEBHOOK_URL
  when: on_failure
  only:
    - main
    - develop
```

---

# Exercice 11 : Docker Build 🐳

---

## Objectif

Créer une image Docker de l'application Vue.js.

---

## Étapes

1. Créer un `Dockerfile` multi-stage
2. Ajouter un job `build:docker` qui build l'image
3. Pusher l'image sur le registry GitLab
4. Utiliser les variables GitLab pour l'authentification

---

## Solution - Dockerfile Partie 1

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .
```

---

## Solution - Dockerfile Partie 2

```dockerfile
# Build application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## Solution - Job Docker Build

```yaml
build:docker:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG .
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG
    - docker push $CI_REGISTRY_IMAGE:latest
  only:
    - main
    - develop
```

---

# Exercice 12 : Pipeline complète TaskFlow 🎯

---

## Objectif

Assembler tous les éléments pour créer la pipeline complète de TaskFlow.

---

## Fonctionnalités requises

1. ✅ Installation avec cache optimisé
2. ✅ Lint (ESLint + Prettier)
3. ✅ Tests unitaires avec couverture
4. ✅ Tests E2E
5. ✅ Scans de sécurité
6. ✅ Build de l'application
7. ✅ Déploiement multi-environnements
8. ✅ Review Apps
9. ✅ Notifications

---

## Solution - Structure Partie 1

```yaml
image: node:20-alpine

stages:
  - install
  - lint
  - test
  - security
  - build
  - deploy
  - notify

variables:
  NODE_ENV: "production"
  npm_config_cache: "$CI_PROJECT_DIR/.npm"
  CYPRESS_CACHE_FOLDER: "$CI_PROJECT_DIR/.cypress"
```

---

## Solution - Structure Partie 2

```yaml
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
    - .npm/
    - .cypress/
  policy: pull-push

.test_template: &test_template
  stage: test
  dependencies:
    - install:dependencies
  only:
    - merge_requests
    - main
    - develop
```

---

## Conseil final 💡

**Testez votre pipeline progressivement !**

1. Commencer simple (install + lint)
2. Ajouter les tests
3. Intégrer le build
4. Configurer les déploiements
5. Optimiser et ajouter les fonctionnalités avancées

---

# Projet fil rouge : TaskFlow 🎯

---

## Défi final

Créer une pipeline CI/CD complète pour TaskFlow avec :

1. **Branches** :
   - `develop` → Déploiement automatique sur Development
   - `main` → Déploiement automatique sur Staging
   - `tags` → Déploiement manuel sur Production

---

2. **Tests** :
   - Tests unitaires (min 80% de couverture)
   - Tests E2E Cypress
   - Lint du code

---

3. **Sécurité** :
   - Audit npm
   - Scan de dépendances
   - Détection de secrets

---

4. **Review Apps** :
   - Environnement éphémère par merge request
   - Auto-stop après 1 semaine

---

5. **Notifications** :
   - Slack sur succès/échec
   - Email pour les déploiements en production

---

6. **Docker** (bonus) :
   - Build d'une image Docker
   - Push sur le registry GitLab
   - Déploiement via Docker Compose

---

## Critères de réussite

✅ Pipeline verte sur `main`

✅ Déploiement automatique fonctionnel

✅ Tests passants avec bonne couverture

✅ Review Apps créées sur MR

✅ Notifications configurées

✅ Documentation du workflow

---

# Ressources supplémentaires 📚

---

## Documentation

- **GitLab CI/CD** : https://docs.gitlab.com/ee/ci/
- **GitLab Runner** : https://docs.gitlab.com/runner/
- **Docker** : https://docs.docker.com/
- **Cypress CI** : https://docs.cypress.io/guides/continuous-integration

---

## Templates utiles

```yaml
# Import de templates GitLab
include:
  - template: Jobs/Code-Quality.gitlab-ci.yml
  - template: Jobs/SAST.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml
  - template: Jobs/Browser-Performance-Testing.gitlab-ci.yml
```

---

## Outils de validation

- **GitLab CI Lint** : https://gitlab.com/ci/lint
- **YAML Validator** : https://www.yamllint.com/
- **Pipeline Editor** : Intégré dans GitLab

---

# Bravo ! 🎉

**Vous avez complété les exercices du Module Bonus CI/CD !**

Vous maîtrisez maintenant :
- ✅ La création de pipelines CI/CD
- ✅ Le déploiement multi-environnements
- ✅ Les bonnes pratiques DevOps
- ✅ L'intégration continue avec GitLab

**Continuez vers le QCM pour valider vos connaissances ! 📝**
