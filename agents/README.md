# Adding Sprint 3 research to the Formly portal

This public guide explains how Edward's Hevy teardown is connected to the portal and how teammates can add their own documents. The public source is [`sprints/sprint-3/edward-puentes-teardown-1.md`](../sprints/sprint-3/edward-puentes-teardown-1.md).

## Files and roles

- [`sprints/sprint-3.html`](../sprints/sprint-3.html) summarizes one interview and the hands-on Hevy teardown. Each evidence row has its PDF download on the right.
- [`sprints/sprint-3/interview-x.html`](../sprints/sprint-3/interview-x.html) shows the full reviewed Interview X notes and Hevy teardown. Each section keeps its PDF download beside the heading.
- [`assets/styles.css`](../assets/styles.css) keeps the compact download button in the site's color and type styles. The evidence table scrolls horizontally on small screens.
- The team interview source is [`team-interview-x.md`](../sprints/sprint-3/team-interview-x.md), with [`team-interview-x.pdf`](../sprints/sprint-3/pdfs/team-interview-x.pdf) as its downloadable copy. The teardown source linked above has a separate [`teardown PDF`](../sprints/sprint-3/pdfs/edward-puentes-teardown-1.pdf).
- [`build_teardown_pdf.py`](build_teardown_pdf.py) converts headings, paragraphs, lists, links, and `---` page breaks from this Markdown format to a PDF using ReportLab. It does not change the web page.

## Repeat this for a teammate's document

1. Put reviewed public text in `sprints/sprint-3/`, using a descriptive filename. Do not copy private interview transcripts or coursework into the public repository without review.
2. Keep the overview summary short, then put the reviewed document text on the teammate's dedicated interview page. Add a row to the evidence log or competitor table only when the document supports it. In interview notes, tag specific events and actions as Behavior, and broader judgments or preferences as Opinion. Say whether another finding is an observation or a hypothesis.
3. Export a PDF to `sprints/sprint-3/pdfs/`. To use the included converter, install ReportLab and run `python agents/build_teardown_pdf.py path/to/source.md path/to/output.pdf --credit "Formly Team" --compact` from the repository root for a short team interview. Omit these options for Edward's teardown.
4. Link the PDF from the corresponding evidence row in `sprints/sprint-3.html` with a relative path such as `sprint-3/pdfs/example.pdf`. Add `download` to the link and include descriptive visible text. Reuse `document-download` and the SVG pattern for another teardown.
5. Update the contribution statement with simple descriptions of what the person owned and reviewed. Make only claims that the teammate confirms.
6. Preview the Sprint 3 overview and dedicated interview page locally. Open each PDF, test its download link, check the layout on a narrow screen, and confirm the Markdown, PDF, and page text agree.

The short overview helps readers scan the sprint. The dedicated page and PDF both hold the detailed record. Keeping a public Markdown source makes revisions reviewable and prevents the PDF from becoming an opaque final copy.
