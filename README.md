## Layout technique

- Flexbox is used where the content is one-dimensional and linear: the top navigation (`nav`), the hero area (`.intro`) and the project list (`.project-cont`) rely on `display: flex` for horizontal alignment, alignment of the profile image next to the text, and vertical stacking/spacing of project cards. Flexbox simplifies alignment, spacing, and content-ordering for these components.

- CSS Grid is used for the About section (`.about-cont { display: grid; grid-template-columns: repeat(4, 1fr); }`) where a two-dimensional grid of cards is needed. Grid provides precise control of rows and columns and keeps the cards aligned in both axes without extra wrapper markup.

## Known Limitations

1. **Static Contact Form**

   * The contact form is currently front-end only and is not connected to a backend service. As a result, submitted messages are not sent or stored.

2. **Static Project Content**

   * The project section is manually maintained using HTML. Adding, editing, or removing projects requires modifying the source code, as the website is not connected to a database or content management system.
