# cosmos implementation plan

## Foundation and first milestone

- Establish a responsive React, Vite, and TypeScript app with a small, consistent design system.
- Set the visual direction around near-black and navy surfaces, off-white text, restrained cool-blue accents, serif editorial headlines, sans-serif interface text, and a spacing scale based on the page gutter.
- Deliver the editorial landing page as the entry point to the planet directory, with responsive navigation, accessible focus states, and reduced-motion support.
- Keep the initial frontend dependency set small; defer 3D and backend packages until the explorer interaction is scoped.

## Explorer milestone

- Add a dedicated `/explorer` route with an interactive Three.js system view, camera orbit/zoom, selectable planets, and play/pause motion controls.
- Complete: add guided planet journeys that focus the explorer camera at each stop and save completed visits to the learning field log.
- Complete: refine explorer hierarchy with a prominent guided-tour control, clearer selected-world marker, and a home-page resume link for saved journeys.
- Treat the view as a schematic: planetary distances and diameters are compressed, and orbital motion is accelerated. Keep the underlying distances, diameters, and periods sourced from NASA.
- Keep the landing page bundle independent from the 3D scene through a lazy-loaded explorer route.

## Next milestones

1. Complete: add planet detail pages using sourced NASA imagery and reviewed scientific facts.
2. Complete: add a dated, editorial field-notes page with NASA-sourced mission news, a skywatching essay, and upcoming astronomical events that roll out of the list after their dates.
3. Complete: add daily trivia, a five-question quiz, browser-saved learning progress, and guided planet journeys. Progress is stored locally in this browser; a backend can replace this when accounts or cross-device sync are introduced.

## Conventions

- Keep page sections and content data in small React components; use CSS custom properties for shared palette, typography, and spacing.
- Make every navigation destination meaningful, preserve visible focus, and honor `prefers-reduced-motion`.
- Use local loading, empty, and error patterns when data-backed features are introduced.

## Planet field guide milestone

- Add eight direct `/planet/:id` pages that share a common editorial template and NASA image credits.
- Connect planet rows and the explorer detail panel to the new pages, with previous/next world navigation.
- Keep orbital values in the shared planet data and story copy/image references together in `planetProfiles.ts`.
- Add a focused interactive 3D planet view with drag orbit, zoom, optional slow rotation, reset controls, reduced-motion handling, and a NASA image fallback.
