# Formly — Living Project Portal

A static course-project website for four team members. Built with HTML and one shared CSS file; no installation, build step, JavaScript, or external services are required.

## Pages

- `index.html`: project name, business-problem description, and sprint links.
- `about.html`: four profiles with name, bio, role, and project ownership.
- `sprints/sprint-1.html` and `sprints/sprint-2.html`: initial sprint placeholders.
- `sprints/sprint-template.html`: reusable scaffold for later sprints.
- `assets/styles.css`: shared layout and styling.
- `.nojekyll`: serves the site as plain static files on GitHub Pages.

Bracketed text is a placeholder. No team biographies, progress, or completed deliverables have been invented. The provided requirements excerpt did not include the detailed Sprint 1 and Sprint 2 requirements; adapt those pages when those requirements are available.

## Preview locally

Open `index.html` in your browser. All pages and styles work without a server.

## Publish on GitHub Pages

1. Review the template, then commit and push these files to the repository's `main` branch.
2. Open [the repository's Pages settings](https://github.com/cristiala/Formly--SPM/settings/pages).
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose **main**, **/(root)**, and click **Save**.
5. Wait for the Pages deployment to finish. The expected URL is:
   [https://cristiala.github.io/Formly--SPM/](https://cristiala.github.io/Formly--SPM/).

These local files do not change GitHub repository settings or publish the site by themselves. Repository administration access is required to configure Pages. Repository visibility and plan must support GitHub Pages.

See [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Customize the template

1. Replace the homepage business-problem placeholder.
2. Fill in the four profiles in `about.html`.
3. Fill in sprint content, dates, and status. Remove the scaffold notice once a page is ready.
4. Keep roles and ownership current as the team changes responsibilities.
5. Edit colors and layout centrally in `assets/styles.css`.

## Add a sprint

1. Copy `sprints/sprint-template.html` to `sprints/sprint-3.html` (or the appropriate sprint number).
2. Replace `Sprint N` in the page title and heading, then fill in the content.
3. Add a card linking to the new page in `index.html`.
4. Update main navigation on all pages, including the reusable template, if the new sprint should appear there. Mark only the active page with `aria-current="page"`.
5. Add previous/next sprint links as appropriate. Keep all earlier sprint pages and links available.

Use relative links: `assets/styles.css` from a root page and `../assets/styles.css` from a sprint page. Leading-slash links would point outside the `/Formly--SPM/` project path on GitHub Pages.

Navigation is intentionally repeated in the HTML so pages remain readable and functional without a build system or JavaScript. For a much larger portal, a static-site generator could remove that duplication.

## Before publishing changes

- Open every page and follow its navigation links.
- Check the layout on a narrow window and navigate with the keyboard.
- Check that new assets and evidence links resolve.
- Confirm placeholders are intentional and completed claims have supporting evidence.
