---
theme: ./
colorSchema: "auto"
layout: intro
highlighter: shiki
title: Pylowt - Présentation produit & entretien
download: true
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
