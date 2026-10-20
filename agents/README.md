# Adding Sprint 3 research to the Formly portal

This public guide explains how Edward's Hevy teardown is connected to the portal and how teammates can add their own documents. The public source is [`sprints/sprint-3/edward-puentes-teardown-1.md`](../sprints/sprint-3/edward-puentes-teardown-1.md).

## Files and roles

- [`sprints/sprint-3.html`](../sprints/sprint-3.html) summarizes one interview and the hands-on Hevy teardown. Each evidence row has its PDF download on the right.
- [`assets/styles.css`](../assets/styles.css) keeps the compact download button in the site's color and type styles. The evidence table scrolls horizontally on small screens.
- The team interview source is [`team-interview-x.md`](../sprints/sprint-3/team-interview-x.md), with [`team-interview-x.pdf`](../sprints/sprint-3/pdfs/team-interview-x.pdf) as its downloadable copy. The teardown source linked above has a separate [`teardown PDF`](../sprints/sprint-3/pdfs/edward-puentes-teardown-1.pdf).
- [`build_teardown_pdf.py`](build_teardown_pdf.py) converts headings, paragraphs, lists, links, and `---` page breaks from this Markdown format to a PDF using ReportLab. It does not change the web page.

## Repeat this for a teammate's document

1. Put reviewed public text in `sprints/sprint-3/`, using a descriptive filename. Do not copy private interview transcripts or coursework into the public repository without review.
2. Keep the portal summary short. Add a row to the evidence log or competitor table only when the document supports it. Say whether a finding is an observation, an interview note, or a hypothesis.
3. Export a PDF to `sprints/sprint-3/pdfs/`. To use the included converter, install ReportLab and run `python agents/build_teardown_pdf.py path/to/source.md path/to/output.pdf --credit "Formly Team"` from the repository root for a team document. Omit `--credit` for Edward's teardown.
4. Link the PDF from the corresponding evidence row in `sprints/sprint-3.html` with a relative path such as `sprint-3/pdfs/example.pdf`. Add `download` to the link and include descriptive visible text. Reuse `document-download` and the SVG pattern for another teardown.
5. Update the contribution statement with simple descriptions of what the person owned and reviewed. Make only claims that the teammate confirms.
6. Preview `sprints/sprint-3.html` locally. Open the PDF, test its download link, check the layout on a narrow screen, and confirm the Markdown, PDF, and portal summary agree.

The short web summary helps readers scan the sprint; the PDF holds the detailed record. Keeping a public Markdown source makes revisions reviewable and prevents the PDF from becoming an opaque final copy.
