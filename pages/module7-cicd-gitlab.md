---
layout: new-section
routeAlias: 'bonus-cicd'
---

# Module 7
## CI/CD avec GitLab 🚀

Intégration Continue et Déploiement Continu

---

# Qu'est-ce que le CI/CD ? 🔄

**CI/CD = Continuous Integration / Continuous Deployment**

---

## Continuous Integration (CI) 🔨

- **Intégration automatique** du code dans la branche principale
- **Tests automatiques** à chaque commit/merge
- **Détection précoce** des bugs et conflits
- **Build automatique** de l'application

---

## Continuous Deployment (CD) 📦

- **Déploiement automatique** vers différents environnements
- **Livraison continue** des fonctionnalités
- **Réduction des erreurs** humaines
- **Mises en production rapides**

---

# Avantages du CI/CD 💡

- ✅ **Qualité du code** : Tests automatiques à chaque changement
- ✅ **Rapidité** : Déploiements plus fréquents et rapides
- ✅ **Fiabilité** : Processus reproductible et standardisé
- ✅ **Traçabilité** : Historique complet des déploiements
- ✅ **Feedback rapide** : Détection immédiate des problèmes
- ✅ **Collaboration** : Facilite le travail en équipe

---

# GitLab CI/CD 🦊

**GitLab CI/CD** est intégré nativement dans GitLab

---

## Caractéristiques principales

- Configuration via fichier `.gitlab-ci.yml`
- Pipelines visuels dans l'interface
- Runners pour exécuter les jobs
- Variables d'environnement sécurisées
- Intégration avec Docker
- Déploiement vers multiples environnements

---

# Architecture GitLab CI/CD 🏗️

```
┌─────────────┐
│   Git Push  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  GitLab Server      │
│  (.gitlab-ci.yml)   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  GitLab Runner      │
│  (Exécute les jobs) │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Environnements     │
│  (Dev/Staging/Prod) │
└─────────────────────┘
```

---

# Concepts clés 📚

---

## Pipeline

Une **pipeline** est une séquence de stages qui s'exécutent automatiquement

```yaml
stages:
  - build
  - test
  - deploy
```

---

## Job

Un **job** est une tâche unitaire à exécuter

```yaml
build-job:
  stage: build
  script:
    - npm install
    - npm run build
```

---

## Stage

Un **stage** regroupe plusieurs jobs qui s'exécutent en parallèle

```yaml
test:unit:
  stage: test
  script:
    - npm run test:unit

test:e2e:
  stage: test
  script:
    - npm run test:e2e
```

---

## Runner

Un **runner** est un agent qui exécute les jobs de la pipeline

Types de runners :
- **Shared runners** : Fournis par GitLab
- **Specific runners** : Dédiés à un projet
- **Group runners** : Partagés dans un groupe de projets

---

# Fichier .gitlab-ci.yml 📄

Le fichier `.gitlab-ci.yml` à la racine du projet définit la pipeline

---

## Structure de base

```yaml
image: node:20

stages:
  - build
  - test
  - deploy

before_script:
  - echo "Début du job"

after_script:
  - echo "Fin du job"
```

---

## Variables globales

```yaml
variables:
  NODE_ENV: "production"
  APP_NAME: "taskflow"
  DEPLOY_SERVER: "prod.example.com"
```

---

## Cache et Artifacts

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/
```

---

```yaml
artifacts:
  paths:
    - dist/
    - coverage/
  expire_in: 1 week
```

---

# Pipeline pour Vue.js 🎯

---

## Configuration complète - Partie 1

```yaml
image: node:20

stages:
  - install
  - lint
  - test
  - build
  - deploy
```

---

## Configuration complète - Partie 2

```yaml
variables:
  NODE_ENV: "production"
  npm_config_cache: "$CI_PROJECT_DIR/.npm"
  CYPRESS_CACHE_FOLDER: "$CI_PROJECT_DIR/.cypress"

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/
    - .cypress/
```

---

## Job : Installation des dépendances

```yaml
install_dependencies:
  stage: install
  script:
    - npm ci --prefer-offline
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 day
  only:
    - merge_requests
    - main
    - develop
```

---

## Job : Linting du code

```yaml
lint:code:
  stage: lint
  dependencies:
    - install_dependencies
  script:
    - npm run lint
  only:
    - merge_requests
    - main
    - develop
```

---

## Job : Tests unitaires

```yaml
test:unit:
  stage: test
  dependencies:
    - install_dependencies
  script:
    - npm run test:unit -- --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
    expire_in: 30 days
```

---

## Job : Tests E2E

```yaml
test:e2e:
  stage: test
  dependencies:
    - install_dependencies
  script:
    - npm run test:e2e:ci
  artifacts:
    when: on_failure
    paths:
      - cypress/screenshots/
      - cypress/videos/
    expire_in: 7 days
  only:
    - merge_requests
    - main
```

---

## Job : Build de l'application

```yaml
build:app:
  stage: build
  dependencies:
    - install_dependencies
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main
    - develop
    - tags
```

---

## Job : Déploiement en staging

```yaml
deploy:staging:
  stage: deploy
  dependencies:
    - build:app
  environment:
    name: staging
    url: https://staging.taskflow.com
  script:
    - echo "Déploiement sur staging"
    - npm run deploy:staging
  only:
    - develop
```

---

## Job : Déploiement en production

```yaml
deploy:production:
  stage: deploy
  dependencies:
    - build:app
  environment:
    name: production
    url: https://taskflow.com
  script:
    - echo "Déploiement en production"
    - npm run deploy:prod
  only:
    - tags
  when: manual
```

---

# Variables d'environnement 🔐

---

## Types de variables

GitLab CI/CD supporte plusieurs types de variables :

- **Variables de projet** : Spécifiques à un projet
- **Variables de groupe** : Partagées dans un groupe
- **Variables d'instance** : Globales à l'instance GitLab
- **Variables prédéfinies** : Fournies par GitLab

---

## Variables prédéfinies utiles

```yaml
deploy:
  script:
    - echo "Branch: $CI_COMMIT_BRANCH"
    - echo "Commit: $CI_COMMIT_SHA"
    - echo "Job ID: $CI_JOB_ID"
    - echo "Pipeline ID: $CI_PIPELINE_ID"
    - echo "Project: $CI_PROJECT_NAME"
    - echo "URL: $CI_PROJECT_URL"
```

---

## Ajouter des variables protégées

Dans GitLab :
1. **Settings** → **CI/CD** → **Variables**
2. Cliquer sur **Add variable**
3. Définir la clé et la valeur
4. Cocher **Protected** pour les branches protégées
5. Cocher **Masked** pour masquer dans les logs

---

## Utilisation des variables

```yaml
deploy:production:
  script:
    - echo "Deploying to $DEPLOY_SERVER"
    - scp -i $SSH_PRIVATE_KEY dist/* user@$DEPLOY_SERVER:/var/www/
  variables:
    DEPLOY_SERVER: "prod.example.com"
  only:
    - tags
```

---

# Stratégies de déploiement 🎯

---

## 1. Déploiement manuel

```yaml
deploy:production:
  stage: deploy
  script:
    - npm run deploy:prod
  when: manual
  only:
    - main
```

Le job nécessite une action manuelle pour s'exécuter

---

## 2. Déploiement automatique

```yaml
deploy:staging:
  stage: deploy
  script:
    - npm run deploy:staging
  only:
    - develop
```

Le job s'exécute automatiquement

---

## 3. Déploiement par tags

```yaml
deploy:production:
  stage: deploy
  script:
    - npm run deploy:prod
  only:
    - tags
  except:
    - branches
```

Déploiement uniquement lors de la création d'un tag

---

## 4. Environnements multiples - Template

```yaml
# Définition du template de déploiement
.deploy_template:
  stage: deploy
  script:
    - npm run build
    - echo "Deploying to $ENVIRONMENT"
```

---

## 4. Environnements multiples - Development

```yaml
# Utilisation du template pour dev
deploy:dev:
  extends: .deploy_template
  variables:
    ENVIRONMENT: "development"
  environment:
    name: development
  only:
    - develop
```

---

## 4. Environnements multiples - Staging

```yaml
# Utilisation du template pour staging
deploy:staging:
  extends: .deploy_template
  variables:
    ENVIRONMENT: "staging"
  environment:
    name: staging
  only:
    - main
```

---

## 4. Environnements multiples - Production

```yaml
# Utilisation du template pour production
deploy:prod:
  extends: .deploy_template
  variables:
    ENVIRONMENT: "production"
  environment:
    name: production
  when: manual
  only:
    - tags
```

---

# Docker et GitLab CI/CD 🐳

---

## Utiliser une image Docker personnalisée

```yaml
image: node:20-alpine

variables:
  NODE_ENV: production

build:
  script:
    - apk add --no-cache git
    - npm ci
    - npm run build
```

---

## Build d'une image Docker

```yaml
build:docker:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG
```

---

## Dockerfile pour Vue.js - Partie 1

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
```

---

## Dockerfile pour Vue.js - Partie 2

```dockerfile
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

# Tests automatisés 🧪

---

## Configuration Vitest pour CI

```yaml
test:unit:
  stage: test
  script:
    - npm run test:unit -- --run --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      junit: coverage/junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

---

## Configuration package.json

```json
{
  "scripts": {
    "test:unit": "vitest",
    "test:unit:ci": "vitest run --coverage --reporter=junit --reporter=default",
    "test:e2e": "cypress open",
    "test:e2e:ci": "cypress run"
  }
}
```

---

## Tests E2E avec Cypress

```yaml
test:e2e:
  stage: test
  image: cypress/browsers:node20.11.0-chrome121.0.6167.85-1
  script:
    - npm ci
    - npm run build
    - npm run test:e2e:ci
  artifacts:
    when: on_failure
    paths:
      - cypress/screenshots/
      - cypress/videos/
    expire_in: 7 days
```

---

# Optimisations des pipelines ⚡

---

## 1. Utiliser le cache efficacement

```yaml
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
    - .npm/
  policy: pull-push

build:
  cache:
    policy: pull
  script:
    - npm run build
```

---

## 2. Paralléliser les jobs

```yaml
test:unit:
  stage: test
  script:
    - npm run test:unit

test:e2e:
  stage: test
  script:
    - npm run test:e2e

lint:code:
  stage: test
  script:
    - npm run lint
```

Les 3 jobs s'exécutent en parallèle

---

## 3. Utiliser des règles intelligentes

```yaml
build:
  script:
    - npm run build
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: always
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: always
    - when: never
```

---

## 4. Limiter l'exécution des jobs

```yaml
test:expensive:
  script:
    - npm run test:e2e
  only:
    changes:
      - src/**/*.vue
      - src/**/*.js
      - tests/**/*
  except:
    - README.md
    - docs/**/*
```

---

## 5. Utiliser des templates - Définition

```yaml
# Définition du template
.test_template:
  stage: test
  image: node:20
  before_script:
    - npm ci
  only:
    - merge_requests
    - main
```

---

## 5. Utiliser des templates - Utilisation

```yaml
# Utilisation du template
test:unit:
  extends: .test_template
  script:
    - npm run test:unit

test:integration:
  extends: .test_template
  script:
    - npm run test:integration
```

---

# Déploiement sur différentes plateformes 🌐

---

## Déploiement sur Netlify

```yaml
deploy:netlify:
  stage: deploy
  image: node:20
  script:
    - npm install -g netlify-cli
    - npm run build
    - netlify deploy --prod --dir=dist --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
  only:
    - main
  environment:
    name: production
    url: https://taskflow.netlify.app
```

---

## Déploiement sur Vercel

```yaml
deploy:vercel:
  stage: deploy
  image: node:20
  script:
    - npm install -g vercel
    - vercel --prod --token=$VERCEL_TOKEN --confirm
  only:
    - main
  environment:
    name: production
    url: https://taskflow.vercel.app
```

---

## Déploiement sur serveur SSH

```yaml
deploy:ssh:
  stage: deploy
  before_script:
    - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - ssh -o StrictHostKeyChecking=no user@$DEPLOY_SERVER "cd /var/www && git pull"
    - ssh user@$DEPLOY_SERVER "cd /var/www && npm install && npm run build"
  only:
    - main
```

---

## Déploiement sur AWS S3

```yaml
deploy:aws:
  stage: deploy
  image: python:3.12
  before_script:
    - pip install awscli
  script:
    - npm run build
    - aws s3 sync dist/ s3://$S3_BUCKET --delete
    - aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
  only:
    - main
  environment:
    name: production
    url: https://taskflow.com
```

---

# Monitoring et notifications 📊

---

## Notifications Slack

```yaml
notify:slack:
  stage: .post
  script:
    - |
      curl -X POST -H 'Content-type: application/json' \
      --data "{\"text\":\"✅ Pipeline réussie pour $CI_PROJECT_NAME ($CI_COMMIT_BRANCH)\"}" \
      $SLACK_WEBHOOK_URL
  when: on_success
  only:
    - main

notify:slack:failure:
  stage: .post
  script:
    - |
      curl -X POST -H 'Content-type: application/json' \
      --data "{\"text\":\"❌ Pipeline échouée pour $CI_PROJECT_NAME ($CI_COMMIT_BRANCH)\"}" \
      $SLACK_WEBHOOK_URL
  when: on_failure
```

---

## Notifications par email

Dans GitLab : **Settings** → **Integrations** → **Emails on push**

Configuration :
- Recipients : emails des destinataires
- Disable code diffs : masquer les diffs
- Send from committer : envoyer depuis l'auteur du commit
- Push events : notifications sur push
- Tag push events : notifications sur tags

---

## Métriques de pipeline

GitLab fournit automatiquement :
- **Durée d'exécution** de la pipeline
- **Taux de succès** des pipelines
- **Temps d'exécution** par job
- **Historique** des déploiements
- **Couverture de code**

Accessible via : **CI/CD** → **Pipelines** → **Charts**

---

# Sécurité dans les pipelines 🔒

---

## 1. Scan de dépendances

```yaml
security:dependencies:
  stage: test
  script:
    - npm audit --audit-level=high
  allow_failure: true
```

---

## 2. Scan de vulnérabilités

```yaml
include:
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml

dependency_scanning:
  stage: test

sast:
  stage: test

secret_detection:
  stage: test
```

---

## 3. Analyse de code statique

```yaml
code_quality:
  stage: test
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_DRIVER: overlay2
  script:
    - docker run --rm --volume "$PWD":/code codeclimate/codeclimate analyze
  artifacts:
    reports:
      codequality: gl-code-quality-report.json
```

---

## 4. Vérification des secrets

```yaml
secrets:check:
  stage: test
  image: trufflesecurity/trufflehog:latest
  script:
    - trufflehog filesystem . --json --fail
  allow_failure: false
```

---

# Bonnes pratiques CI/CD 💎

---

## 1. Organisation des stages

✅ **Ordre logique** :
```yaml
stages:
  - install      # Installation des dépendances
  - lint         # Vérification du code
  - test         # Tests automatisés
  - build        # Build de l'application
  - security     # Scans de sécurité
  - deploy       # Déploiement
```

---

## 2. Nommage des jobs

✅ **Noms explicites** :
```yaml
install:dependencies:     # ✅ Clair
lint:eslint:             # ✅ Précis
test:unit:vitest:        # ✅ Détaillé
build:production:        # ✅ Contexte

install:                 # ❌ Trop vague
check:                   # ❌ Ambigu
run:                     # ❌ Pas informatif
```

---

## 3. Gestion des artifacts

✅ **Conserver uniquement le nécessaire** :
```yaml
build:
  artifacts:
    paths:
      - dist/              # ✅ Résultat du build
    expire_in: 1 week      # ✅ Nettoyage auto
    
test:
  artifacts:
    paths:
      - coverage/          # ✅ Rapport de couverture
      - node_modules/      # ❌ Trop lourd, utiliser cache
    expire_in: 30 days     # ❌ Trop long pour des tests
```

---

## 4. Utilisation du cache

✅ **Cache intelligent** :
```yaml
cache:
  key:
    files:
      - package-lock.json  # ✅ Clé basée sur les dépendances
  paths:
    - node_modules/        # ✅ Cache des modules
    - .npm/                # ✅ Cache npm
  policy: pull-push        # ✅ Mise à jour si nécessaire
```

---

## 5. Variables sensibles

✅ **Sécurité des secrets** :
- Utiliser les variables GitLab (masked + protected)
- Ne jamais commiter de secrets dans le code
- Utiliser des outils comme HashiCorp Vault
- Limiter l'accès aux variables sensibles

❌ **À éviter** :
```yaml
deploy:
  script:
    - echo "API_KEY=abc123"  # ❌ Visible dans les logs
    - export PASSWORD=secret # ❌ Exposé
```

---

## 6. Feedback rapide

✅ **Pipeline efficace** :
```yaml
stages:
  - quick-checks  # Lint, format (30s)
  - test          # Tests unitaires (2min)
  - build         # Build (1min)
  - slow-tests    # Tests E2E (10min)
  - deploy        # Déploiement
```

Placer les tests rapides en premier pour un feedback immédiat

---

## 7. Documentation

✅ **Commenter le .gitlab-ci.yml** :
```yaml
# Installation des dépendances
# Cache les node_modules pour accélérer les builds suivants
install:dependencies:
  stage: install
  script:
    - npm ci --prefer-offline
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
```

---

## 8. Gestion des erreurs

✅ **Anticiper les échecs** :
```yaml
test:flaky:
  script:
    - npm run test:e2e
  retry:
    max: 2                          # ✅ Retry en cas d'échec
    when:
      - runner_system_failure
      - stuck_or_timeout_failure
  allow_failure: true               # ✅ N'empêche pas la suite
```

---

# Exemple complet : Pipeline TaskFlow 🎯

---

## Configuration complète - Partie 1

```yaml
# Pipeline CI/CD pour TaskFlow (Application Vue.js 3)
# Auteur: Formation Vue.js 2025
# Description: Pipeline complète avec tests, build et déploiement multi-environnements

image: node:20-alpine

stages:
  - install
  - lint
  - test
  - security
  - build
  - deploy
  - notify
```

---

## Configuration complète - Partie 2

```yaml
# Variables globales
variables:
  NODE_ENV: "production"
  npm_config_cache: "$CI_PROJECT_DIR/.npm"
  CYPRESS_CACHE_FOLDER: "$CI_PROJECT_DIR/.cypress"
  FF_USE_FASTZIP: "true"
  ARTIFACT_COMPRESSION_LEVEL: "fast"
  CACHE_COMPRESSION_LEVEL: "fast"
```

---

## Configuration complète - Partie 3

```yaml
# Cache global
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
    - .npm/
    - .cypress/
  policy: pull-push
```

---

## Configuration complète - Partie 4

```yaml
# Template pour les jobs de test
.test_template:
  stage: test
  dependencies:
    - install:dependencies
  only:
    - merge_requests
    - main
    - develop
  except:
    changes:
      - "*.md"
      - docs/**/*
```

---

## Job : Installation

```yaml
install:dependencies:
  stage: install
  script:
    - echo "📦 Installation des dépendances..."
    - npm ci --prefer-offline --no-audit
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 day
  cache:
    policy: pull-push
  only:
    - merge_requests
    - main
    - develop
```

---

## Job : Lint ESLint

```yaml
lint:eslint:
  stage: lint
  dependencies:
    - install:dependencies
  script:
    - echo "🔍 Analyse ESLint..."
    - npm run lint
  cache:
    policy: pull
  only:
    - merge_requests
    - main
    - develop
```

---

## Job : Lint Prettier

```yaml
lint:prettier:
  stage: lint
  dependencies:
    - install:dependencies
  script:
    - echo "💅 Vérification du formatage..."
    - npx prettier --check "src/**/*.{js,vue,css,json}"
  cache:
    policy: pull
  only:
    - merge_requests
    - main
    - develop
```

---

## Job : Tests unitaires

```yaml
test:unit:
  extends: .test_template
  script:
    - echo "🧪 Exécution des tests unitaires..."
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

## Job : Tests E2E

```yaml
test:e2e:
  extends: .test_template
  image: cypress/browsers:node20.11.0-chrome121.0.6167.85-1
  script:
    - echo "🎭 Exécution des tests E2E..."
    - npm run build
    - npm run test:e2e:ci
  artifacts:
    when: on_failure
    paths:
      - cypress/screenshots/
      - cypress/videos/
    expire_in: 7 days
  allow_failure: true
```

---

## Job : Audit de sécurité

```yaml
security:audit:
  stage: security
  script:
    - echo "🔒 Audit de sécurité des dépendances..."
    - npm audit --audit-level=moderate
  allow_failure: true
  only:
    - merge_requests
    - main
```

---

## Job : Scan de secrets

```yaml
security:secrets:
  stage: security
  image: trufflesecurity/trufflehog:latest
  script:
    - echo "🕵️ Recherche de secrets exposés..."
    - trufflehog filesystem . --json
  allow_failure: true
  only:
    - merge_requests
    - main
```

---

## Job : Build

```yaml
build:app:
  stage: build
  dependencies:
    - install:dependencies
  script:
    - echo "🏗️ Build de l'application..."
    - npm run build
    - echo "📊 Taille du build:"
    - du -sh dist/
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  cache:
    policy: pull
  only:
    - main
    - develop
    - tags
```

---

## Job : Déploiement Development

```yaml
deploy:development:
  stage: deploy
  dependencies:
    - build:app
  environment:
    name: development
    url: https://dev.taskflow.com
    on_stop: stop:development
  script:
    - echo "🚀 Déploiement sur Development..."
    - npm run deploy:dev
  only:
    - develop
```

---

## Job : Déploiement Staging

```yaml
deploy:staging:
  stage: deploy
  dependencies:
    - build:app
  environment:
    name: staging
    url: https://staging.taskflow.com
    on_stop: stop:staging
  script:
    - echo "🚀 Déploiement sur Staging..."
    - npm run deploy:staging
  only:
    - main
```

---

## Job : Déploiement Production

```yaml
deploy:production:
  stage: deploy
  dependencies:
    - build:app
  environment:
    name: production
    url: https://taskflow.com
  script:
    - echo "🚀 Déploiement en Production..."
    - npm run deploy:prod
    - echo "✅ Application déployée avec succès!"
  only:
    - tags
  when: manual
```

---

## Job : Arrêt environnement Dev

```yaml
stop:development:
  stage: deploy
  environment:
    name: development
    action: stop
  script:
    - echo "🛑 Arrêt de l'environnement Development..."
    - npm run stop:dev
  when: manual
  only:
    - develop
```

---

## Job : Arrêt environnement Staging

```yaml
stop:staging:
  stage: deploy
  environment:
    name: staging
    action: stop
  script:
    - echo "🛑 Arrêt de l'environnement Staging..."
    - npm run stop:staging
  when: manual
  only:
    - main
```

---

## Job : Notification succès

```yaml
notify:success:
  stage: notify
  script:
    - |
      curl -X POST -H 'Content-type: application/json' \
      --data "{\"text\":\"✅ Pipeline réussie pour TaskFlow\n• Branch: $CI_COMMIT_BRANCH\n• Commit: $CI_COMMIT_SHORT_SHA\n• Auteur: $CI_COMMIT_AUTHOR\"}" \
      $SLACK_WEBHOOK_URL
  when: on_success
  only:
    - main
    - develop
```

---

## Job : Notification échec

```yaml
notify:failure:
  stage: notify
  script:
    - |
      curl -X POST -H 'Content-type: application/json' \
      --data "{\"text\":\"❌ Pipeline échouée pour TaskFlow\n• Branch: $CI_COMMIT_BRANCH\n• Commit: $CI_COMMIT_SHORT_SHA\n• Job: $CI_JOB_NAME\"}" \
      $SLACK_WEBHOOK_URL
  when: on_failure
  only:
    - main
    - develop
```

---

# Workflows avancés 🔀

---

## Workflow 1 : Feature Branch

```yaml
workflow:
  rules:
    # Pipelines pour merge requests
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      variables:
        ENVIRONMENT: "review"
    # Pipelines pour develop
    - if: '$CI_COMMIT_BRANCH == "develop"'
      variables:
        ENVIRONMENT: "development"
    # Pipelines pour main
    - if: '$CI_COMMIT_BRANCH == "main"'
      variables:
        ENVIRONMENT: "staging"
```

---

```yaml
    # Pipelines pour tags
    - if: '$CI_COMMIT_TAG'
      variables:
        ENVIRONMENT: "production"
```

---

## Workflow 2 : GitFlow

```yaml
# Développement
develop:
  only:
    - develop
  script:
    - npm run deploy:dev
  environment:
    name: development

# Release candidates
release:
  only:
    - /^release\/.*$/
  script:
    - npm run deploy:staging
  environment:
    name: staging
```

---

```yaml
# Hotfixes
hotfix:
  only:
    - /^hotfix\/.*$/
  script:
    - npm run deploy:staging
  environment:
    name: staging-hotfix

# Production
production:
  only:
    - tags
  script:
    - npm run deploy:prod
  environment:
    name: production
  when: manual
```

---

## Workflow 3 : Trunk-Based Development

```yaml
workflow:
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      
# Tous les commits sur main déclenchent:
# 1. Tests complets
# 2. Build
# 3. Déploiement automatique en staging
# 4. Déploiement manuel en production

deploy:staging:
  when: on_success  # Automatique

deploy:production:
  when: manual      # Manuel après validation
```

---

# Review Apps 🔍

---

## Qu'est-ce qu'une Review App ?

Une **Review App** est un environnement éphémère créé automatiquement pour chaque merge request

**Avantages** :
- Tester les changements avant le merge
- Partager facilement avec l'équipe
- Détection précoce des problèmes
- Feedback visuel immédiat

---

## Configuration Review App

```yaml
review:
  stage: deploy
  script:
    - echo "🔍 Création de la Review App..."
    - npm run build
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

## Arrêt automatique Review App

```yaml
stop_review:
  stage: deploy
  script:
    - echo "🧹 Suppression de la Review App..."
    - npm run destroy:review
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  when: manual
  only:
    - merge_requests
```

---

# Déploiement progressif 📈

---

## Blue-Green Deployment

```yaml
deploy:blue:
  stage: deploy
  script:
    - npm run deploy:blue
  environment:
    name: production-blue
    url: https://blue.taskflow.com

deploy:green:
  stage: deploy
  script:
    - npm run deploy:green
  environment:
    name: production-green
    url: https://green.taskflow.com
  when: manual
```

---

```yaml
switch:traffic:
  stage: deploy
  script:
    - echo "🔄 Basculement du trafic vers Green..."
    - npm run switch:green
  when: manual
  needs:
    - deploy:green
```

---

## Canary Deployment

```yaml
deploy:canary:
  stage: deploy
  script:
    - echo "🐤 Déploiement Canary (10% du trafic)..."
    - npm run deploy:canary --percentage=10
  environment:
    name: production-canary
  when: manual

deploy:full:
  stage: deploy
  script:
    - echo "🚀 Déploiement complet (100%)..."
    - npm run deploy:full
  environment:
    name: production
  when: manual
  needs:
    - deploy:canary
```

---

# Rollback et gestion d'incidents 🔙

---

## Rollback automatique

```yaml
deploy:production:
  stage: deploy
  script:
    - npm run deploy:prod
    - npm run health:check || npm run rollback:prod
  environment:
    name: production
  only:
    - tags
```

---

## Rollback manuel

```yaml
rollback:production:
  stage: deploy
  script:
    - echo "⏮️ Rollback vers la version précédente..."
    - git checkout HEAD~1
    - npm run build
    - npm run deploy:prod
  environment:
    name: production
  when: manual
  only:
    - main
```

---

## Gestion des incidents

```yaml
hotfix:emergency:
  stage: deploy
  script:
    - echo "🚨 Déploiement d'urgence..."
    - npm run build
    - npm run deploy:prod --force
  environment:
    name: production
  when: manual
  only:
    - hotfix/*
```

---

# Exercice pratique : Pipeline Vue.js 🎯

---

## Objectif

Créer une pipeline CI/CD complète pour l'application TaskFlow avec :
1. Installation et cache des dépendances
2. Lint du code (ESLint)
3. Tests unitaires avec couverture
4. Build de l'application
5. Déploiement sur Netlify (staging et production)

---

## Étape 1 : Créer le fichier .gitlab-ci.yml

À la racine du projet TaskFlow, créer `.gitlab-ci.yml`

---

## Étape 2 : Configuration de base

```yaml
image: node:20

stages:
  - install
  - lint
  - test
  - build
  - deploy

variables:
  npm_config_cache: "$CI_PROJECT_DIR/.npm"

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/
```

---

## Étape 3 : Job d'installation

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

## Étape 4 : Job de lint

```yaml
lint:code:
  stage: lint
  dependencies:
    - install:dependencies
  script:
    - npm run lint
```

---

## Étape 5 : Job de tests

```yaml
test:unit:
  stage: test
  dependencies:
    - install:dependencies
  script:
    - npm run test:unit -- --run --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    paths:
      - coverage/
    expire_in: 30 days
```

---

## Étape 6 : Job de build

```yaml
build:app:
  stage: build
  dependencies:
    - install:dependencies
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main
    - develop
```

---

## Étape 7 : Déploiement Staging

```yaml
deploy:staging:
  stage: deploy
  dependencies:
    - build:app
  script:
    - npm install -g netlify-cli
    - netlify deploy --dir=dist --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
  environment:
    name: staging
    url: https://staging--taskflow.netlify.app
  only:
    - develop
```

---

## Étape 8 : Déploiement Production

```yaml
deploy:production:
  stage: deploy
  dependencies:
    - build:app
  script:
    - npm install -g netlify-cli
    - netlify deploy --prod --dir=dist --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
  environment:
    name: production
    url: https://taskflow.netlify.app
  only:
    - main
  when: manual
```

---

## Étape 9 : Configuration des variables

Dans GitLab :
1. Aller dans **Settings** → **CI/CD** → **Variables**
2. Ajouter les variables :
   - `NETLIFY_AUTH_TOKEN` (masked)
   - `NETLIFY_SITE_ID` (masked)

---

## Étape 10 : Test de la pipeline

1. Commit et push du fichier `.gitlab-ci.yml`
2. Vérifier l'exécution dans **CI/CD** → **Pipelines**
3. Observer les logs de chaque job
4. Vérifier le déploiement sur Netlify

---

# Ressources et documentation 📚

---

## Documentation officielle

- **GitLab CI/CD** : https://docs.gitlab.com/ee/ci/
- **GitLab Runner** : https://docs.gitlab.com/runner/
- **Variables CI/CD** : https://docs.gitlab.com/ee/ci/variables/
- **YAML Syntax** : https://docs.gitlab.com/ee/ci/yaml/

---

## Templates GitLab CI/CD

GitLab fournit des templates prêts à l'emploi :

```yaml
include:
  - template: Jobs/Code-Quality.gitlab-ci.yml
  - template: Jobs/SAST.gitlab-ci.yml
  - template: Jobs/Dependency-Scanning.gitlab-ci.yml
  - template: Jobs/Secret-Detection.gitlab-ci.yml
```

Disponibles sur : https://gitlab.com/gitlab-org/gitlab/-/tree/master/lib/gitlab/ci/templates

---

## Outils complémentaires

- **GitLab Runner** : https://docs.gitlab.com/runner/install/
- **Docker** : https://docs.docker.com/
- **Kubernetes** : https://kubernetes.io/docs/
- **Helm** : https://helm.sh/docs/
- **Terraform** : https://www.terraform.io/docs/

---

## Communauté et support

- **GitLab Forum** : https://forum.gitlab.com/
- **GitLab Discord** : https://discord.gg/gitlab
- **Stack Overflow** : Tag `gitlab-ci`
- **GitLab Issues** : https://gitlab.com/gitlab-org/gitlab/-/issues

---

# Points clés à retenir 🎯

---

## CI/CD avec GitLab

✅ **Configuration via .gitlab-ci.yml**

✅ **Stages pour organiser la pipeline**

✅ **Jobs pour les tâches unitaires**

✅ **Cache pour optimiser les builds**

✅ **Artifacts pour partager entre jobs**

---

## Bonnes pratiques

✅ **Tests automatiques à chaque commit**

✅ **Déploiements progressifs**

✅ **Variables sécurisées pour les secrets**

✅ **Review Apps pour les merge requests**

✅ **Monitoring et notifications**

---

## Sécurité

✅ **Scan de dépendances**

✅ **Détection de secrets**

✅ **Analyse de code statique**

✅ **Variables masked et protected**

---

# Conclusion 🎉

---

## Ce que vous avez appris

- ✅ Concepts du CI/CD
- ✅ Configuration GitLab CI/CD
- ✅ Création de pipelines complètes
- ✅ Déploiement multi-environnements
- ✅ Optimisation et bonnes pratiques
- ✅ Sécurité dans les pipelines

---

## Prochaines étapes

1. 🎯 **Pratiquer** : Créer des pipelines pour vos projets
2. 📖 **Approfondir** : Explorer les fonctionnalités avancées
3. 🔒 **Sécuriser** : Intégrer les scans de sécurité
4. 📊 **Monitorer** : Suivre les métriques des pipelines
5. 🚀 **Automatiser** : Aller plus loin dans l'automatisation

---

## Ressources finales

- 📚 Documentation GitLab CI/CD
- 🎥 Tutoriels vidéo
- 💬 Communauté GitLab
- 🛠️ Templates officiels
- 📝 Exemples de projets

---

# Questions ? 🤔

**Merci d'avoir suivi ce module !**

N'hésitez pas à poser vos questions sur :
- La configuration des pipelines
- Les déploiements
- Les bonnes pratiques
- Les cas d'usage spécifiques

---

# À vous de jouer ! 🚀

**Passez maintenant à l'exercice pratique !**

Créez votre première pipeline CI/CD pour TaskFlow et déployez automatiquement votre application.

**Bon courage ! 💪**
