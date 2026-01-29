---
layout: new-section
routeAlias: 'bonus-cicd-qcm'
---

<a name="bonus-cicd-qcm" id="bonus-cicd-qcm"></a>

# QCM Module Bonus
## CI/CD avec GitLab ✅

Validez vos connaissances !

---

# Question 1

**Que signifie CI/CD ?**

A) Configuration Integration / Code Deployment

B) Continuous Integration / Continuous Deployment

C) Code Integration / Continuous Delivery

D) Central Integration / Cloud Deployment

---

## Réponse : B

**Continuous Integration / Continuous Deployment**

CI/CD est l'ensemble des pratiques permettant :
- **CI** : Intégrer automatiquement le code et le tester
- **CD** : Déployer automatiquement vers les environnements

---

# Question 2

**Quel fichier configure la pipeline GitLab CI/CD ?**

A) `gitlab-pipeline.yml`

B) `.gitlab-ci.yml`

C) `ci-config.yml`

D) `.gitlab-pipeline.yaml`

---

## Réponse : B

**`.gitlab-ci.yml`**

C'est le fichier de configuration standard qui doit être placé à la racine du projet.

---

# Question 3

**Qu'est-ce qu'un Runner GitLab ?**

A) Un développeur qui gère les déploiements

B) Un script qui s'exécute dans la pipeline

C) Un agent qui exécute les jobs de la pipeline

D) Un serveur de déploiement

---

## Réponse : C

**Un agent qui exécute les jobs de la pipeline**

Les Runners sont des agents (machines physiques ou virtuelles) qui exécutent les jobs définis dans `.gitlab-ci.yml`.

---

# Question 4

**Quelle est la différence entre un stage et un job ?**

A) Un stage est une tâche, un job est un groupe de tâches

B) Un stage regroupe des jobs qui s'exécutent en parallèle

C) Il n'y a pas de différence

D) Un job contient plusieurs stages

---

## Réponse : B

**Un stage regroupe des jobs qui s'exécutent en parallèle**

```yaml
stages:
  - test        # Stage
  
test:unit:      # Job dans le stage test
  stage: test
  
test:e2e:       # Job dans le stage test (parallèle)
  stage: test
```

---

# Question 5

**À quoi sert le cache dans GitLab CI/CD ?**

A) À stocker les logs de la pipeline

B) À accélérer les builds en conservant les dépendances

C) À sauvegarder les résultats des tests

D) À créer des backups du code

---

## Réponse : B

**À accélérer les builds en conservant les dépendances**

Le cache permet de réutiliser `node_modules/` entre les pipelines pour éviter de tout réinstaller.

---

# Question 6

**Quelle est la différence entre cache et artifacts ?**

A) Il n'y a pas de différence

B) Le cache est pour les dépendances, les artifacts pour les résultats

C) Les artifacts sont plus rapides

D) Le cache est automatique, les artifacts sont manuels

---

## Réponse : B

**Le cache est pour les dépendances, les artifacts pour les résultats**

- **Cache** : Optimisation (node_modules, .npm)
- **Artifacts** : Résultats à partager entre jobs (dist/, coverage/)

---

# Question 7

**Comment limiter l'exécution d'un job à la branche main ?**

A) `branch: main`

B) `only: main`

C) `when: main`

D) `if: main`

---

## Réponse : B

**`only: main`**

```yaml
deploy:
  script:
    - npm run deploy
  only:
    - main
```

---

# Question 8

**Que fait le mot-clé `when: manual` ?**

A) Le job s'exécute automatiquement

B) Le job nécessite une action manuelle pour démarrer

C) Le job s'exécute seulement en cas d'erreur

D) Le job est désactivé

---

## Réponse : B

**Le job nécessite une action manuelle pour démarrer**

Utile pour les déploiements en production :

```yaml
deploy:production:
  when: manual
```

---

# Question 9

**Quelle est l'utilité des Review Apps ?**

A) Réviser le code avant merge

B) Créer un environnement éphémère pour tester les MR

C) Faire des revues de performance

D) Analyser les statistiques de l'application

---

## Réponse : B

**Créer un environnement éphémère pour tester les MR**

Chaque merge request obtient son propre environnement de test accessible via URL.

---

# Question 10

**Comment définir une variable d'environnement dans GitLab CI ?**

A) `env: NODE_ENV=production`

B) `variables: NODE_ENV: "production"`

C) `set: NODE_ENV=production`

D) `export NODE_ENV=production`

---

## Réponse : B

**`variables: NODE_ENV: "production"`**

```yaml
variables:
  NODE_ENV: "production"
  APP_NAME: "taskflow"
```

---

# Question 11

**Quel type de variable doit-on utiliser pour les secrets ?**

A) Variables publiques

B) Variables masked et protected

C) Variables cachées

D) Variables temporaires

---

## Réponse : B

**Variables masked et protected**

- **Masked** : Masquée dans les logs
- **Protected** : Accessible uniquement sur branches protégées

---

# Question 12

**Que signifie le mot-clé `dependencies` dans un job ?**

A) Liste les packages npm nécessaires

B) Spécifie les jobs dont on récupère les artifacts

C) Définit les jobs qui doivent s'exécuter avant

D) Liste les services Docker requis

---

## Réponse : B

**Spécifie les jobs dont on récupère les artifacts**

```yaml
build:
  artifacts:
    paths:
      - dist/

deploy:
  dependencies:
    - build  # Récupère dist/ du job build
```

---

# Question 13

**À quoi sert le stage `.post` ?**

A) C'est un stage qui s'exécute toujours en dernier

B) C'est un stage pour envoyer des emails

C) C'est un stage de nettoyage

D) Il n'existe pas

---

## Réponse : A

**C'est un stage qui s'exécute toujours en dernier**

Utile pour les notifications :

```yaml
notify:
  stage: .post
  when: on_success
```

---

# Question 14

**Quelle syntaxe permet d'extraire la couverture de code ?**

A) `code_coverage: '/(\d+)%/'`

B) `coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'`

C) `test_coverage: true`

D) `extract_coverage: yes`

---

## Réponse : B

**`coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'`**

Expression régulière pour extraire le pourcentage de couverture des logs.

---

# Question 15

**Comment créer un environnement dynamique pour les Review Apps ?**

A) `environment: review`

B) `environment: $CI_COMMIT_REF_SLUG`

C) `environment: name: review/$CI_COMMIT_REF_SLUG`

D) `dynamic_environment: true`

---

## Réponse : C

**`environment: name: review/$CI_COMMIT_REF_SLUG`**

```yaml
environment:
  name: review/$CI_COMMIT_REF_SLUG
  url: https://$CI_COMMIT_REF_SLUG.review.app.com
```

---

# Question 16

**Quelle image Docker utiliser pour les tests Cypress ?**

A) `node:20`

B) `cypress/base:20`

C) `cypress/browsers:node20.11.0-chrome121`

D) `docker:24`

---

## Réponse : C

**`cypress/browsers:node20.11.0-chrome121`**

Image officielle Cypress avec navigateurs pour tests E2E.

---

# Question 17

**Comment paralléliser des jobs dans le même stage ?**

A) Utiliser `parallel: true`

B) Les jobs du même stage s'exécutent automatiquement en parallèle

C) Utiliser `concurrent: true`

D) Ce n'est pas possible

---

## Réponse : B

**Les jobs du même stage s'exécutent automatiquement en parallèle**

```yaml
stages:
  - test

test:unit:    # S'exécutent
  stage: test # en

test:e2e:     # parallèle
  stage: test
```

---

# Question 18

**Que fait `allow_failure: true` ?**

A) Empêche le job de s'exécuter

B) Permet à la pipeline de continuer même si le job échoue

C) Relance automatiquement le job en cas d'échec

D) Cache les erreurs dans les logs

---

## Réponse : B

**Permet à la pipeline de continuer même si le job échoue**

Utile pour les tests E2E flaky ou les scans de sécurité non bloquants.

---

# Question 19

**Comment configurer un retry automatique ?**

A) `retry: 3`

B) `auto_retry: true`

C) `retry: { max: 2, when: runner_system_failure }`

D) `on_failure: retry`

---

## Réponse : C

**`retry: { max: 2, when: runner_system_failure }`**

```yaml
test:e2e:
  script:
    - npm run test:e2e
  retry:
    max: 2
    when:
      - runner_system_failure
      - stuck_or_timeout_failure
```

---

# Question 20

**Quelle est la meilleure pratique pour la clé de cache ?**

A) Utiliser une clé fixe : `key: cache`

B) Utiliser la branche : `key: ${CI_COMMIT_REF_SLUG}`

C) Utiliser le hash du fichier de dépendances : `key: {files: ['package-lock.json']}`

D) Ne pas définir de clé

---

## Réponse : C

**Utiliser le hash du fichier de dépendances**

Le cache est invalidé uniquement quand `package-lock.json` change.

```yaml
cache:
  key:
    files:
      - package-lock.json
```

---

# Question 21

**Comment inclure des templates GitLab officiels ?**

A) `import: template:Security/SAST.gitlab-ci.yml`

B) `include: - template: Security/SAST.gitlab-ci.yml`

C) `use: Security/SAST`

D) `template: SAST`

---

## Réponse : B

**`include: - template: Security/SAST.gitlab-ci.yml`**

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
```

---

# Question 22

**Quelle variable contient le SHA du commit actuel ?**

A) `$CI_COMMIT_ID`

B) `$CI_COMMIT_SHA`

C) `$GIT_COMMIT`

D) `$COMMIT_HASH`

---

## Réponse : B

**`$CI_COMMIT_SHA`**

Variables prédéfinies utiles :
- `$CI_COMMIT_SHA` : SHA complet
- `$CI_COMMIT_SHORT_SHA` : SHA court
- `$CI_COMMIT_BRANCH` : Nom de la branche

---

# Question 23

**Comment exécuter un job uniquement sur les tags ?**

A) `only: - tags`

B) `when: tag`

C) `if: $CI_COMMIT_TAG`

D) A et C sont correctes

---

## Réponse : D

**A et C sont correctes**

Deux syntaxes possibles :

```yaml
# Syntaxe classique
deploy:
  only:
    - tags

# Syntaxe rules (plus récente)
deploy:
  rules:
    - if: $CI_COMMIT_TAG
```

---

# Question 24

**Que fait `before_script` dans un job ?**

A) S'exécute avant tous les jobs de la pipeline

B) S'exécute avant le script principal du job

C) Définit les prérequis du job

D) Configure l'environnement

---

## Réponse : B

**S'exécute avant le script principal du job**

```yaml
deploy:
  before_script:
    - echo "Préparation..."
  script:
    - npm run deploy
  after_script:
    - echo "Nettoyage..."
```

---

# Question 25

**Quelle est la meilleure stratégie de déploiement pour minimiser le downtime ?**

A) Direct deployment

B) Blue-Green deployment

C) Big bang deployment

D) Manual deployment

---

## Réponse : B

**Blue-Green deployment**

Deux environnements identiques :
- **Blue** : Version actuelle en production
- **Green** : Nouvelle version testée
- Basculement instantané du trafic

---

# Question 26

**Comment sauvegarder des screenshots Cypress en cas d'échec ?**

A) `artifacts: paths: - cypress/screenshots/`

B) `artifacts: when: on_failure, paths: - cypress/screenshots/`

C) `save_screenshots: true`

D) C'est automatique

---

## Réponse : B

**`artifacts: when: on_failure, paths: - cypress/screenshots/`**

```yaml
test:e2e:
  artifacts:
    when: on_failure
    paths:
      - cypress/screenshots/
      - cypress/videos/
```

---

# Question 27

**Quel est l'ordre correct des stages pour une pipeline Vue.js ?**

A) build → test → lint → deploy

B) lint → test → build → deploy

C) test → lint → build → deploy

D) deploy → test → build → lint

---

## Réponse : B

**lint → test → build → deploy**

Ordre logique :
1. Vérifier le code (lint)
2. Tester (test)
3. Builder (build)
4. Déployer (deploy)

---

# Question 28

**Comment limiter un job aux changements sur certains fichiers ?**

A) `files: - src/**/*`

B) `only: changes: - src/**/*`

C) `watch: - src/**/*`

D) `on_change: src/`

---

## Réponse : B

**`only: changes: - src/**/*`**

```yaml
test:expensive:
  script:
    - npm run test:e2e
  only:
    changes:
      - src/**/*.vue
      - src/**/*.js
```

---

# Question 29

**Que signifie DIND dans GitLab CI ?**

A) Docker In Docker

B) Deploy In New Directory

C) Dynamic Instance Network Deployment

D) Docker Installation Node Dependency

---

## Réponse : A

**Docker In Docker**

Permet d'utiliser Docker à l'intérieur d'un conteneur Docker :

```yaml
build:docker:
  image: docker:24
  services:
    - docker:24-dind
```

---

# Question 30

**Comment arrêter automatiquement une Review App après 1 semaine ?**

A) `timeout: 1 week`

B) `auto_stop: 7 days`

C) `auto_stop_in: 1 week`

D) `expires_in: 1 week`

---

## Réponse : C

**`auto_stop_in: 1 week`**

```yaml
review:
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    auto_stop_in: 1 week
```

---

# Résultats 🎯

**Calculez votre score !**

- **25-30** : Excellent ! 🏆 Vous maîtrisez GitLab CI/CD
- **20-24** : Très bien ! 🎉 Quelques révisions mineures
- **15-19** : Bien ! 👍 Revoyez certains concepts
- **10-14** : Moyen 📚 Relisez le cours
- **< 10** : 💪 Continuez à pratiquer !

---

# Points clés à retenir 📝

---

## Configuration

✅ Fichier `.gitlab-ci.yml` à la racine

✅ Structure : stages → jobs → script

✅ Runners pour exécuter les jobs

✅ Variables pour la configuration

---

## Optimisation

✅ Cache pour les dépendances

✅ Artifacts pour les résultats

✅ Parallélisation des jobs

✅ Conditions d'exécution intelligentes

---

## Déploiement

✅ Environnements multiples

✅ Déploiements manuels/automatiques

✅ Review Apps pour les MR

✅ Stratégies Blue-Green, Canary

---

## Sécurité

✅ Variables masked et protected

✅ Scans de sécurité

✅ Détection de secrets

✅ Audit des dépendances

---

# Bravo ! 🎉

**Vous avez terminé le QCM du Module Bonus CI/CD !**

Vous êtes maintenant prêt à :
- ✅ Créer des pipelines CI/CD complètes
- ✅ Automatiser vos déploiements
- ✅ Optimiser vos workflows
- ✅ Sécuriser vos applications

**Passez aux exercices pratiques pour consolider vos acquis ! 💪**
