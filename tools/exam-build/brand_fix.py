"""One-off: remove the site address text from already-branded PDFs and add the light centre stamp.
Usage: python3 brand_fix.py file.pdf [...]   (run once per file)"""
import sys, pymupdf as fitz
sys.path.insert(0,__import__('os').path.dirname(__import__('os').path.abspath(__file__)))
import brand
for p in sys.argv[1:]:
    d=fitz.open(p)
    for pg in d:
        for r in pg.search_for(brand.SITE):
            pg.add_redact_annot(r)
        pg.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_LINE_ART_NONE)
        brand.watermark(pg)
    d.save(p+'.tmp',garbage=3,deflate=True); d.close(); __import__('os').replace(p+'.tmp',p)
