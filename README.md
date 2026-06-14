# Shaheer Ahmed Siddiqui Portfolio

Premium portfolio website built with React, TypeScript, Vite, Tailwind CSS, GSAP, Lenis, and React Three Fiber.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- React Three Fiber + Drei

## Scripts

- `npm run dev` - start local development server
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript project checks
- `npm run test` - lightweight automated verification (`lint` + `typecheck`)
- `npm run build` - production build
- `npm run check` - full deployment readiness check (`test` + `build`)
- `npm run preview` - preview the production build locally

## Project Structure

- `src/` - application source
- `public/` - static favicon and manifest assets
- `resources/` - local source assets used by the site

## Deployment Notes

- The app is configured as a Vite production build.
- Email actions open Gmail compose directly.
- The heavier 3D surfaces are deferred to reduce first-load pressure.
- Run `npm run check` before pushing or deploying.

## Cleanup

This repository has been trimmed to keep only the files required for the live portfolio and its local development workflow.
