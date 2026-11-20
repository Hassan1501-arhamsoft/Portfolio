# Hassan Maqbool Portfolio

A responsive personal portfolio for Hassan Maqbool, a Full-Stack MERN and AI Engineer. The site presents engineering services, technical skills, work experience, selected projects, and contact information through an interactive single-page interface.

## Overview

- React 19 single-page application built with Vite
- Tailwind CSS 4 styling with a dark, electric-mint visual system
- Feature-based source organization
- Data-driven navigation, hero, skills, services, experience, projects, and contact sections
- Responsive desktop and mobile layouts
- Interactive orbiting cards, particle effects, spider-nest dialogs, filters, and scroll-aware navigation
- Browser-native canvas effects with reduced-motion and lifecycle considerations
- Downloadable CV and direct GitHub/LinkedIn links

## Main Sections

| Section | Purpose |
| --- | --- |
| Hero | Introduces the developer, primary calls to action, profile card, and key metrics |
| Skills | Displays categorized frontend, backend, AI/RAG, and DevOps technologies |
| Services | Presents engineering capabilities in an animated orbital layout |
| Experience | Shows roles, organizations, dates, and measurable technical impact |
| Projects | Provides category filtering and project architecture, stack, demo, and source links |
| Contact | Offers direct contact details and a validated inquiry form |

## Technology Stack

### Application

- React 19
- React DOM 19
- React Router DOM 7
- Vite 8
- JavaScript and JSX

### Styling and UI

- Tailwind CSS 4
- `@tailwindcss/vite`
- Lucide React icons
- Custom CSS variables, keyframes, masks, and surface styles
- CSS backdrop filters and radial/linear gradients

### Forms and HTTP

- React Hook Form
- Axios

### Development

- ESLint 10
- `@vitejs/plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`

## Project Structure

```text
client/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── assets/
│   │   ├── HassanResume.pdf
│   │   └── images/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ParticleCanvas.jsx
│   │   │   ├── SectionHeader.jsx
│   │   │   ├── SocialIcons.jsx
│   │   │   ├── TechBadge.jsx
│   │   │   └── TiltCard.jsx
│   │   ├── hooks/
│   │   │   └── useScrollSpy.js
│   │   └── styles/
│   │       └── index.css
│   └── features/
│       ├── navigation/
│       │   ├── components/
│       │   │   ├── Navbar.jsx
│       │   │   └── MobileDrawer.jsx
│       │   └── data/
│       │       └── nav.data.js
│       ├── hero/
│       │   ├── components/
│       │   │   ├── HeroSection.jsx
│       │   │   └── ProfileCard.jsx
│       │   └── data/
│       │       └── hero.data.js
│       ├── skills/
│       │   ├── components/
│       │   │   ├── SkillsSection.jsx
│       │   │   └── SkillGroupCard.jsx
│       │   └── data/
│       │       └── skills.data.js
│       ├── services/
│       │   ├── components/
│       │   │   ├── ServicesSection.jsx
│       │   │   └── ServiceCard.jsx
│       │   └── data/
│       │       └── services.data.js
│       ├── experience/
│       │   ├── components/
│       │   │   ├── ExperienceSection.jsx
│       │   │   └── TimelineItem.jsx
│       │   └── data/
│       │       └── experience.data.js
│       ├── projects/
│       │   ├── components/
│       │   ├── ProjectsSection.jsx
│       │   ├── ProjectFilter.jsx
│       │   └── ProjectCard.jsx
│       │   └── data/
│       │       └── projects.data.js
│       └── contact/
│           ├── components/
│           │   ├── ContactSection.jsx
│           │   ├── ContactForm.jsx
│           │   └── Footer.jsx
│           └── data/
│               └── contact.data.js
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install

```bash
cd client
npm install
```

### Development

```bash
npm run dev
```

Vite prints the local URL in the terminal, normally `http://localhost:5173`.

### Production Build

```bash
npm run build
```

The generated site is written to `dist/`.

### Preview a Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Content Management

Portfolio content is kept separate from presentation components in feature-level `data/*.js` modules.

| File | Content |
| --- | --- |
| `src/features/navigation/data/nav.data.js` | Brand, navigation labels, routes, and social destinations |
| `src/features/hero/data/hero.data.js` | Headline, description, CTAs, profile image, metrics, and availability |
| `src/features/skills/data/skills.data.js` | Skill category names and grouped technology lists |
| `src/features/services/data/services.data.js` | Service cards, descriptions, icons, and deliverables |
| `src/features/experience/data/experience.data.js` | Roles, organizations, dates, and technical impact |
| `src/features/projects/data/projects.data.js` | Project categories, descriptions, stacks, images, and links |
| `src/features/contact/data/contact.data.js` | Email, location, availability, and social links |

Update these exports to change portfolio content without editing section markup.

## Assets

- Place project thumbnails and profile images in `src/assets/images/`.
- Prefer optimized WebP or appropriately compressed PNG assets.
- Replace `src/assets/HassanResume.pdf` with the final downloadable CV.
- Keep public browser icons in `public/`.

## Component and Interaction Guidelines

- `SectionHeader` provides consistent semantic section headings and eyebrow labels.
- `TiltCard` is intended for reusable pointer-tilt interactions.
- `TechBadge` is intended for consistent technology pills.
- `ParticleCanvas` owns its canvas render and animation lifecycle.
- `useScrollSpy` tracks the active section for navigation highlighting.
- Feature components should import their content from their matching `data/*.js` module.
- Interactive dialog and drawer components should preserve keyboard focus and `aria-*` state.
- Animation-heavy sections should honor `prefers-reduced-motion`.

## Contact Form

The contact form currently provides frontend validation and a confirmation state. Before deploying, connect submission handling to EmailJS, Formspree, or a custom API endpoint in `src/features/contact/components/ContactForm.jsx`, and keep API keys or secrets outside browser source code.

## Deployment

1. Run `npm run lint`.
2. Run `npm run build`.
3. Deploy the contents of `dist/`.
4. Configure the hosting service to serve `index.html` for client-side routes if React Router routes are added later.
5. Verify images, the CV download, external links, mobile navigation, and form submission after deployment.
