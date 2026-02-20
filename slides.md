---
theme: ./
colorSchema: "auto"
layout: intro
highlighter: shiki
title: Pylowt - Présentation produit & entretien
#download: true
themeConfig:
  logoHeader: "/avatar.png"
---

# Pylowt

Orchestration du plan de formation — cockpit décisionnel RH

<div class="pt-12">
  <span @click="next" class="px-2 p-3 rounded cursor-pointer hover:bg-white hover:bg-opacity-10 neon-border">
    Appuyez sur espace pour la page suivante <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="absolute flex gap-x-2 bottom-0 left-0 p-4 z-50">
  <SlideCurrentNo
    class="dark:!text-white !text-[8px] p-1 w-5 h-5 items-center justify-center flex rounded-full bg-white/10 backdrop-blur-sm border border-gray-600 opacity-80"
  />
  <span class="text-gray-400">/</span>
  <SlideTotal
    class="dark:!text-white !text-[8px] p-1 w-5 h-5 items-center justify-center flex rounded-full bg-white/10 backdrop-blur-sm border border-gray-600 opacity-80"
  />
</div>

---
layout: default
routeAlias: 'comprehension-produit'
---

# Slide 1 — Compréhension produit

**Pylowt = orchestration complète du plan de formation**

- Centralisation des besoins (multi-sources)
- Arbitrage budgétaire assisté par IA
- Exécution (OF, convocations, documents, factures)
- Reporting KPI consolidé
- Intégration SIRH / LMS existants

**Positionnement :**

👉 pas un LMS  
👉 pas un simple outil administratif  
👉 **cockpit décisionnel RH + exécution**

---
layout: default
routeAlias: 'probleme-marche'
---

# Slide 2 — Problème marché

**Problèmes actuels RH formation :**

- Excel + mails + fichiers partagés
- Décisions budgétaires peu traçables
- Arbitrage manuel long
- Reporting CODIR chronophage
- Données éclatées (SIRH / LMS / OF)

**Conséquence :**

→ perte de temps  
→ manque de visibilité stratégique  
→ difficulté à démontrer le ROI formation

---
layout: default
routeAlias: 'proposition-valeur'
---

# Slide 3 — Proposition de valeur claire

**Ce que Pylowt apporte concrètement :**

1. Structuration automatique des besoins
2. Proposition de plans optimisés selon :
   - budget
   - priorités métiers
   - contraintes logistiques
3. Historique décisionnel traçable
4. Dashboard temps réel

**ROI mesurable :**

- Temps administratif réduit
- Meilleure allocation budgétaire
- Pilotage stratégique facilité

---
layout: default
routeAlias: 'vision-produit'
---

# Slide 4 — Vision produit

*Ce que tu peux challenger en entretien*

**Axes d’évolution forts :**

- IA plus prédictive (anticipation des besoins)
- Recommandations personnalisées par collaborateur
- Scoring ROI formation
- Benchmarks inter-entreprises anonymisés
- API ouverte pour écosystème EdTech

Tu montres que tu penses roadmap.

---
layout: default
routeAlias: 'questions-strategiques'
---

# Slide 5 — Questions stratégiques à poser

1. Quelle est votre cible principale aujourd’hui ? (PME / ETI / grands comptes)
2. Quel est votre cycle de vente moyen ?
3. Où est le plus gros frein actuellement ? (adoption / intégration / data quality)
4. L’IA est rule-based ou ML entraîné sur data interne ?
5. Quelle stack technique actuelle ?

*Ça te positionne senior direct.*

---
layout: default
routeAlias: 'positionnement-perso'
---

# Slide 6 — Positionnement perso

**Ce qui m’intéresse dans Pylowt**, c’est la couche décisionnelle augmentée par IA.

Beaucoup d’outils **exécutent**, peu **orchestrent** réellement le pilotage budgétaire formation.

Le vrai levier est dans la **donnée consolidée** + **explicabilité des recommandations**.

---
layout: default
routeAlias: 'architecture-technique'
---

# Slide 7 — Architecture technique actuelle

**Stack identifiée**

- Supabase (PostgreSQL, Auth, Storage)
- Vercel (hébergement serverless)
- Gemini (moteur IA)
- Cursor (développement assisté IA)

**Lecture stratégique**

- Stack moderne, orientée vélocité
- Infrastructure majoritairement managée
- Dépendance forte aux services tiers
- Time-to-market optimisé

---
layout: default
routeAlias: 'points-attention-techniques'
---

# Slide 8 — Points d’attention techniques

**Données & Multi-tenant**

- Implémentation du multi-tenant (logique vs schéma dédié)
- Maîtrise du Row Level Security (RLS)
- Isolation stricte des données RH

*Enjeu : sécurité et conformité RGPD irréprochable.*

**Hébergement & Scalabilité**

- Gestion des environnements (staging / prod)
- Observabilité (logs, monitoring, alerting)
- Cold starts serverless
- Limites éventuelles Vercel sur traitements lourds

*Enjeu : stabilité à mesure que le volume client augmente.*

---
layout: default
routeAlias: 'ia-architecture-gouvernance'
---

# Slide 9 — IA : Architecture et gouvernance

**Intégration Gemini**

- Appels via backend (jamais direct client)
- Versioning des prompts
- Logging des décisions générées
- Traçabilité des recommandations

**Questions critiques**

- Les recommandations sont-elles explicables ?
- Les décisions IA sont-elles auditables ?
- Existe-t-il un fallback en cas d’indisponibilité modèle ?

*Enjeu : fiabilité + maîtrise des coûts + auditabilité.*

---
layout: default
routeAlias: 'risques-techniques'
---

# Slide 10 — Risques techniques potentiels

1. Explosion des coûts IA sans contrôle token
2. Qualité des données insuffisante → recommandations biaisées
3. Complexité RLS mal maîtrisée
4. Dépendance forte à Gemini (pricing / évolution API)
5. Absence de monitoring spécifique IA

---
layout: default
routeAlias: 'axes-amelioration'
---

# Slide 11 — Axes d’amélioration structurants

- Encapsulation de la couche IA dans un service dédié
- Feature flags pour tester variantes modèles
- Monitoring des coûts par client
- Cache intelligent des recommandations
- Tests automatisés sur prompts critiques

*Objectif : rendre l’IA industrialisable et scalable.*

---
layout: default
routeAlias: 'positionnement-technique'
---

# Slide 12 — Positionnement technique

Le différenciateur long terme ne sera pas uniquement le modèle IA utilisé.

**Il sera dans :**

- La structuration des workflows
- La qualité et la normalisation des données
- L’architecture sécurisée multi-tenant
- L’auditabilité des décisions générées
- La maîtrise des coûts et de la scalabilité

*Vision : transformer l’IA en moteur décisionnel fiable, traçable et industrialisé.*
