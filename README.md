# Rick and Morty

A small React application for browsing characters, locations, and episodes from the Rick and Morty universe.

[![React](https://img.shields.io/badge/React-19-20232a?style=flat-square&logo=react&logoColor=61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-ff4154?style=flat-square&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![React Router](https://img.shields.io/badge/React_Router-7-ca4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  <a href="https://rick-and-morty-six-plum.vercel.app/">
    <img src="./public/assets/big-logo.webp" width="600" alt="Rick and Morty title artwork" />
  </a>
</p>

<p align="center"><a href="https://rick-and-morty-six-plum.vercel.app/">Open the live demo</a></p>

## Features

- Browse paginated character, location, and episode collections.
- Search each collection by name with debounced API requests.
- Keep searches in the URL so results can be refreshed, shared, and restored with browser navigation.
- Open character, location, and episode detail pages.
- Follow related characters, episodes, and locations without unnecessary per-item requests.
- See explicit loading, empty, and error states.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React and TypeScript | Component UI and static type checking |
| Vite | Development server and production build |
| TanStack Query | Server-state caching, pagination, and request lifecycle |
| React Router | Client-side routes and URL search state |
| Axios | Typed requests to the external REST API |
| Tailwind CSS | Utility-first styling |

## Technical notes

- Paginated API resources share a small `PaginatedResponse<T>` type and a single infinite-query hook.
- TanStack Query passes its abort signal through Axios, so obsolete searches and unmounted requests can be cancelled.
- Related resources use the API's multi-ID endpoints, reducing detail pages from many requests to one batch request.
- Search terms are URL-driven while requests use a debounced value, avoiding duplicate React/router state.

## Getting started

The project requires Node.js 22.12 or newer and npm.

```bash
git clone https://github.com/Teamofeyy/rick-and-morty.git
cd rick-and-morty
npm install
npm run dev
```

Vite prints the local development URL after startup. Other useful commands are:

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Nix development environment

An optional Nix flake provides Node.js 24 and npm without requiring a global Node installation:

```bash
nix develop
npm install
npm run dev
```

## API

Data is provided by the public [Rick and Morty API](https://rickandmortyapi.com/). This project is an independent client and is not affiliated with the API or the television series.

## Project status

This pet project is feature-complete and is maintained only for occasional dependency or compatibility fixes.
