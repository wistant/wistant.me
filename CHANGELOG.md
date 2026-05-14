# Changelog

## [1.7.0] - 2026-05-14 - [Neural Grid Stateless]

### Fonctionnalités
- **Routage Stateless i18n** : Migration complète vers une architecture sans préfixes d'URL (`/en`, `/fr`), utilisant exclusivement les cookies (`NEXT_LOCALE`) pour la résolution de la langue.
- **Sélecteur de Langue Premium** : Implémentation d'un menu déroulant "Popup" de luxe (Shadcn UI) pour une sélection délibérée et élégante.
- **Optimisation SEO Mondiale** : Enrichissement massif des dictionnaires avec des mots-clés stratégiques liés aux architectures de systèmes distribués et au cloud hybride.
- **Navigation Dock** : Intégration directe d'un point d'accès de contact et unification du sélecteur de langue.

### Corrections & Refactoring
- **Dé-congestion Analytique** : Suppression totale de la dépendance Upstash Redis et des compteurs de vues pour une fluidité d'exécution accrue.
- **Metadata Hardening** : Migration du système OpenGraph vers `metadataBase` pour une parité de preview absolue sur tous les canaux sociaux.
- **Cleanup Architectural** : Suppression des payloads JSON obsolètes (ar, wo, es) et typage strict des dictionnaires TypeScript.


### Fonctionnalités
- **Architecture "Industrial Supreme"** : refonte complète de la grille de présention des ProjectCards et Slideshows (100% de la largeur du WebLayout).
- **Galerie Intelligente** : Tri alphabétique automatique et badge de progression pour les sliders.
- **MDX & Markdown** : Intégration Native de l'analyse YAML (`remark-frontmatter`) et héritage direct du design "rounded-xl" pour les assets intégrés.

### Corrections & Refactoring
- **Dark Mode TechBadges** : Optimisation du Dark Mode par inversion dynamique des contrastes ciblés.
- **Clean Architecture** : Purge de code mort (suppression des layouts granulaires obsolètes).


## [1.5.0] - 2026-05-02 - [Cinematic Grid & Fluid Navigation]

### Fonctionnalités

- **Cinematic Projects Overhaul** : Refont complète de la section Projets avec une grille horizontale alternée (Gauche/Droite).
- **Expanding Mobile Navigation** : Implémentation d'un dock mobile extensible (style Aceternity) avec labels textuels et icônes.
- **Visual Depth Dynamics** : Ajout du système `peer/bg` pour l'élévation des couches d'images au survol dans les cartes projets.
- **Smart Adaptive Height** : Refactorisation de `ShowMore` avec détection automatique de la hauteur du contenu pour cacher les gradients/boutons inutiles.

### Corrections & Refactoring

- **Layout Integrity** : Correction des débordements horizontaux via `overflow-y-clip` permettant le "bleed" des médias sans scroll horizontal forcé.
- **Data Curation** : Mise à jour des informations personnelles et des liens sociaux pour une découverte fluide.

## [1.4.0] - 2026-04-20 - [Neural OG Synchronization]

### Fonctionnalités
- **Supreme OG Orchestration** : Portage de la primitive `OgResponse` pour une parité visuelle totale avec `jahir.dev`.
- **Edge Font Hardening** : Intégration du chargement binaire explicite pour `ClashDisplay` et `Inter` sur Vercel Edge.
- **Metadata Liberation** : Restauration du système automatique `opengraph-image.tsx` en supprimant les dépendances API codées en dur.

### Corrections & Refactoring
- **Universal Synchronization** : Refactorisation de 12 routes d'images sociales pour une cohérence absolue.
- **Layout Precision** : Correction des typos de ratio `aspect-video` et `aspect-[2/1]` dans les viewports critiques.

## [1.3.0] - 2026-04-20 - [Neural Credential Ignition]

### Features

- **Supreme Certifications Module**: Deployed a high-performance credential registry with MDX-based narrations and high-fidelity 16:9 rectangular showcases.
- **Dynamic OG System**: Implemented a universal Open Graph generation pipeline utilizing Next.js `opengraph-image.tsx` primitives and an Edge-ready orchestration route for social media excellence.
- **Narrated Professional Prose**: Re-engineered 5 core AWS certification descriptions with detailed architectural impact stories, matching the "About" page narrative depth.
- **Dock Navigation Refresh**: Integrated the Certifications experiential anchor into the global navigation, replacing legacy entry for enhanced professional discovery.

### Fixes & Refactoring

- **Security Proxy Hardening**: Sanitized `proxy.ts` middleware configuration to allow high-performance asset resolution for the certification badge pipeline.
- **Metadata Orchestration**: Synchronized bilingual dictionary keys and SEO primitives across all newly deployed module viewports.

## [1.2.0] - 2026-04-20 - [Analytical Sight & Sober Refinement]

### Features

- **Upstash Redis Analytics**: Integrated real-time view counting and like system with server-side pipelining (`redis.mget`) for zero-latency index rendering.
- **Premium Content Injection**: Automated injection of high-fidelity Unsplash thumbnails and metadata across the entire blog archive.
- **Elite Technical Articles**: Deployed 2 new deeply technical articles ("Mastering React 19") in both English and French.

### Fixes & Refactoring

- **MDX Engine Hardening**: Resolved Shiki static import conflicts for Turbopack compatibility and implemented a global registry proxy for legacy component stability.
- **Fluid UI Scaling**: Refactored `TechBadge` to use relative `em` units, ensuring consistent iconography scaling across standard body prose and large headers.
- **Project Build Stability**: Restored the missing `TagFilter` dependency preventing project index compilation after the blog system cleanup.
- **Codeblock Aesthetics**: Sanitized CSS overrides to preserve server-side syntax highlighting (one-dark-pro) while fixing inline code badge styling.
- **Layout Integrity**: Applied `pb-32` padding to blog slug containers to prevent navigation dock occlusion of interaction elements.
- **Cleanup**: Excised 9 legacy components and stale assets to achieve a 100% clean, sober codebase.

## [1.1.0] - 2026-04-19 - [Sober Engineering Awakening]

- **UI Refinement**: Deleted the heavy, blurry `Hero` background image in `src/app/[lang]/(web)/blog/[slug]/page.tsx` and replaced it with a sharp, standard image block (`aspect-video`).
- **Index Optimization**: Shrunk and sharpened the blog post index thumbnails by removing heavy rounded corners/zoom effects.
- **Real-time Analytics**: Integrated view counting using a custom API route connected to Upstash Redis.
- **Engagement**: Added a functional 'Like' button with optimistic UI state.
- **Alignment**: Standardized blog width to `max-w-2xl` to match project pages.
- **Routing**: Stripped `es`, `ar`, and `wo` from the site to strictly lock content to `.en` and `.fr`.
