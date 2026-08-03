# Design rationale and layout choices

This personal portfolio prioritizes clarity, visual hierarchy, and small-file simplicity. The intention is a clean, dark-themed single-page site that highlights key sections (Introduction, About, Projects, Contact) with fast, CSS-only interactions and subtle motion.

Layout technique

- Flexbox is used where the content is one-dimensional and linear: the top navigation (`nav`), the hero area (`.intro`) and the project list (`.project-cont`) rely on `display: flex` for horizontal alignment, alignment of the profile image next to the text, and vertical stacking/spacing of project cards. Flexbox simplifies alignment, spacing, and content-ordering for these components.

- CSS Grid is used for the About section (`.about-cont { display: grid; grid-template-columns: repeat(4, 1fr); }`) where a two-dimensional grid of cards is needed. Grid provides precise control of rows and columns and keeps the cards aligned in both axes without extra wrapper markup.

Known limitations

- Responsiveness: the stylesheet uses several fixed paddings and large gaps (for example, `padding-left: 200px` and `gap: 300px` in `.intro`) and currently lacks media queries. This causes layout breakage on narrow screens.
- Accessibility: keyboard focus styles are minimal and color-contrast should be audited (some subtle gray text on dark background). The contact form has no backend and the page lacks form validation and server handling.
- Performance: the root profile image is relatively large (`profile1.jpeg`) and could be optimized or swapped for responsive images (`srcset`) to save bandwidth on mobile.

Next steps / improvements

Add responsive breakpoints, replace fixed spacings with CSS variables, optimize images and add ARIA attributes + focus styles. Hook the contact form to a serverless endpoint or mail service if needed.