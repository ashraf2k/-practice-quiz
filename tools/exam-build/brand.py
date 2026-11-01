"""Branded footer (iLearnCS logo, stamp, QR to the site) drawn on every page of a generated PDF."""
import pymupdf as fitz, os
B=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..','brand')
SITE="ashraf2k.github.io/-practice-quiz"
def watermark(page):
    W,H=page.rect.width,page.rect.height; sz=min(W,H)*0.42
    page.insert_image(fitz.Rect((W-sz)/2,(H-sz)/2,(W+sz)/2,(H+sz)/2),filename=os.path.join(B,'stamp-light.png'),overlay=True)
def footer(page,num,total,band=40):
    watermark(page)
    W,H=page.rect.width,page.rect.height
    y0=H-band-2; m=36
    page.draw_line((m,y0),(W-m,y0),width=0.5,color=(0.7,0.7,0.75))
    lh=24; lw=lh*247/151
    page.insert_image(fitz.Rect(m,y0+8,m+lw,y0+8+lh),filename=os.path.join(B,'logo.png'))
    page.insert_text((m+lw+8,y0+16),"iLearnCS  ·  Learn  ·  Practice  ·  Master",fontname='hebo',fontsize=7,color=(0.2,0.25,0.45))
    q=band-4; qx=W-m-q
    page.insert_image(fitz.Rect(qx,y0+3,qx+q,y0+3+q),filename=os.path.join(B,'qr.png'))
    s=band-2; sx=qx-s-6
    page.insert_image(fitz.Rect(sx,y0+2,sx+s,y0+2+s),filename=os.path.join(B,'stamp.png'))
    t1,t2="Scan to open","the iLearnCS site"
    tx=sx-6
    page.insert_text((tx-fitz.get_text_length(t1,'helv',6.5),y0+16),t1,fontname='helv',fontsize=6.5,color=(0.35,0.37,0.45))
    page.insert_text((tx-fitz.get_text_length(t2,'helv',6.5),y0+25),t2,fontname='helv',fontsize=6.5,color=(0.35,0.37,0.45))
    if num:
        t=f"Page {num} of {total}"; page.insert_text((W/2-fitz.get_text_length(t,'helv',8)/2,y0+22),t,fontname='helv',fontsize=8,color=(0.3,0.3,0.3))
