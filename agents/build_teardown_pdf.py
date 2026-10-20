"""Render a Sprint 3 Markdown document as a site-ready PDF.

Usage: python agents/build_teardown_pdf.py SOURCE.md OUTPUT.pdf
Supports headings, paragraphs, and unordered list items used by sprint documents.
"""

from __future__ import annotations

import argparse
import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate


INK = colors.HexColor("#17212b")
MUTED = colors.HexColor("#45515d")
ACCENT = colors.HexColor("#087e9c")


def inline_markup(value: str) -> str:
    """Escape text, then translate the document's links and bold markers."""
    escaped = html.escape(value)
    linked = re.sub(
        r"\[([^\]]+)\]\((https?://[^)]+)\)",
        r'<link href="\2" color="#087e9c">\1</link>',
        escaped,
    )
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", linked)


def styles() -> dict[str, ParagraphStyle]:
    base = dict(fontName="Helvetica", textColor=INK, alignment=TA_LEFT)
    return {
        "title": ParagraphStyle("Title", **base, fontSize=22, leading=26, spaceAfter=12),
        "heading": ParagraphStyle("Heading", **base, fontSize=13, leading=17, spaceBefore=15, spaceAfter=7, keepWithNext=True),
        "subheading": ParagraphStyle("Subheading", **base, fontSize=11, leading=15, spaceBefore=10, spaceAfter=5, keepWithNext=True),
        "body": ParagraphStyle("Body", **base, fontSize=9.5, leading=14, spaceAfter=7),
        "bullet": ParagraphStyle("Bullet", **base, fontSize=9.5, leading=14, leftIndent=18, firstLineIndent=-11, spaceAfter=4),
    }


def story_from_markdown(source: Path) -> list:
    text = source.read_text(encoding="utf-8")
    document_styles = styles()
    story = []
    paragraph_lines: list[str] = []

    def flush_paragraph() -> None:
        if paragraph_lines:
            story.append(Paragraph(inline_markup(" ".join(paragraph_lines)), document_styles["body"]))
            paragraph_lines.clear()

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            flush_paragraph()
        elif line == "---":
            flush_paragraph()
            story.append(PageBreak())
        elif line.startswith("# "):
            flush_paragraph()
            story.append(Paragraph(inline_markup(line[2:]), document_styles["title"]))
        elif line.startswith("## "):
            flush_paragraph()
            story.append(Paragraph(inline_markup(line[3:]), document_styles["heading"]))
        elif line.startswith("### "):
            flush_paragraph()
            story.append(Paragraph(inline_markup(line[4:]), document_styles["subheading"]))
        elif line.startswith("- "):
            flush_paragraph()
            story.append(Paragraph("&#8226; " + inline_markup(line[2:]), document_styles["bullet"]))
        else:
            paragraph_lines.append(line)
    flush_paragraph()
    return story


def add_page_frame(canvas, document, credit: str) -> None:
    canvas.saveState()
    width, height = letter
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(2)
    canvas.line(0.7 * inch, height - 0.56 * inch, width - 0.7 * inch, height - 0.56 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.7 * inch, 0.48 * inch, f"FORMLY  /  SPRINT 3  /  {credit.upper()}")
    canvas.drawRightString(width - 0.7 * inch, 0.48 * inch, str(document.page))
    canvas.restoreState()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--credit", default="Edward Puentes", help="PDF author and footer credit")
    args = parser.parse_args()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    pdf = SimpleDocTemplate(
        str(args.output),
        pagesize=letter,
        topMargin=0.72 * inch,
        bottomMargin=0.68 * inch,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        title=args.source.read_text(encoding="utf-8").splitlines()[0].removeprefix("# "),
        author=args.credit,
    )

    def draw_frame(canvas, document) -> None:
        add_page_frame(canvas, document, args.credit)

    pdf.build(story_from_markdown(args.source), onFirstPage=draw_frame, onLaterPages=draw_frame)


if __name__ == "__main__":
    main()
