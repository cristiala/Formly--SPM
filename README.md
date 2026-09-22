# Formly — Living Project Portal

A static course-project website for four team members. Built with HTML and one shared CSS file; no installation, build step, JavaScript, or external services are required.

## Pages

- `index.html`: project name, business-problem description, and sprint links.
- `about.html`: four profiles with name, bio, role, and project ownership.
- `sprints/sprint-1.html`: Sprint 1 document hub and four-member contribution statement with AI disclosure.
- `sprints/sprint-1/`: Market Research, Business Strategy, and Project Charter subpages.
- `sprints/sprint-2.html`: generic Sprint 2 placeholder; its detailed requirements are not implemented yet.
- `sprints/sprint-template.html`: reusable scaffold for later sprints.
- `assets/styles.css`: shared layout and styling.
- `.nojekyll`: serves the site as plain static files on GitHub Pages.

Bracketed text is a placeholder. No team biographies, progress, or completed deliverables have been invented. Sprint 1 now follows the structure in Living Portal Guidelines, Sections 3, 5, 9, and 10. The PM content and matching PDFs are still pending. This scaffold is not a completed submission.

## Preview locally

Open `index.html` in your browser. All pages and styles work without a server.

## Publish on GitHub Pages

1. Review and commit the changes on your working branch, push it, and merge a pull request into `main`.
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

## Complete Sprint 1

- Fill in the three required document subpages with reviewed, readable HTML content.
- Complete the four-member contribution statement: each person must identify what they owned and what they reviewed. Include the AI use disclosure.
- Export each public document, including the contribution statement, to a matching PDF. Store public PDFs under `sprints/sprint-1/pdfs/` when they are ready.
- Replace each PDF availability message with a real link only after adding the file. For example, from the Market Research page: `<a href="pdfs/market-research.pdf" download>Download Market Research (PDF)</a>`. From the Sprint 1 hub, use `sprint-1/pdfs/contribution-statement.pdf`.
- Keep the web text and downloadable PDF synchronized. Upload those same PDFs to Blackboard.
- Retrospectives and peer evaluations are private Blackboard submissions. Keep their files and content out of this website repository; removing a navigation link does not make an uploaded file private.
- The retrospective must have separate team and project halves. It does not belong on any public sprint page.
- A change-log subpage is required starting with Sprint 2. This Sprint 1 structure update does not implement Sprint 2's full structure.
- Publish by the required deadline, share the repository link with the instructor, and post the live URL to the course site.

## Export the Business Strategy PDF manually

1. Open `sprints/sprint-1/business-strategy.html` in your browser.
2. Press Ctrl+P and choose Save as PDF. Turn off browser headers and footers, and inspect every page in the print preview. Shared print styles hide navigation and download controls while retaining the document owner.
3. Save the file as `sprints/sprint-1/pdfs/business-strategy.pdf` (create the `pdfs` folder if needed).
4. In `business-strategy.html`, replace the disabled Download PDF button with the link provided in the HTML comment, and remove the PDF availability message.
5. Open the link to verify the PDF, then commit and publish both the HTML and PDF. Upload the same PDF to Blackboard.

Repeat the export after content changes so the hosted PDF matches the page. Other document pages can reuse the `document-actions` styling and their own PDF link.
