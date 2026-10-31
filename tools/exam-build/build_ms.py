import sys,re,glob,os,json
sys.path.insert(0,'/tmp/ex')
import pymupdf as fitz
import build_exams as B
LAB=re.compile(r'^(\d{1,2})((?:\([a-z]\))?)((?:\((?:i|ii|iii|iv|v|vi|vii|viii|ix|x)\))*)$')
def msfile(p):
    b=os.path.basename(p['qp'])
    m=re.search(r'(0478|9618).*$',b); suf=m.group(0) if m else b
    suf=re.sub(r'qp','ms',suf) if 'qp' in suf else suf.replace('Question_Paper','Mark_Scheme').replace('Question Paper','Mark Scheme').replace('Question paper','Mark Scheme')
    g=glob.glob(os.path.dirname(p['qp'])+'/*'+suf)
    return g[0] if g else None
_cache={}
def rows_of(key):
    if key in _cache: return _cache[key]
    path=msfile(B.PAP[key]); doc=fitz.open(path); rows=[];owner=None;header=None
    for pn,pg in enumerate(doc):
        M=pg.rotation_matrix; R=pg.rect
        ys=[]; xs=[]
        for r in pg.get_drawings():
            rr=r['rect']*M
            if rr.height<1.6 and rr.width>60: ys.append(rr.y0); xs.append(rr.x0)
        if not ys: continue
        ys=sorted(ys); bs=[ys[0]]
        for y in ys[1:]:
            if y-bs[-1]>2.5: bs.append(y)
        colx=0.2*R.width
        words=[(fitz.Rect(w[:4])*M,w[4]) for w in pg.get_text('words')]
        for i in range(len(bs)-1):
            y0,y1=bs[i],bs[i+1]
            if y1-y0<8: continue
            inrow=[(r,t) for r,t in words if y0-1<=(r.y0+r.y1)/2<=y1 and r.x1<=colx+3]
            lab=None
            inrow.sort(key=lambda a:a[0].x0)
            cand=[(r,t) for r,t in inrow if r.x0>20]
            if cand:
                jt=''.join(t for r,t in cand[:3]); 
                for k in range(min(3,len(cand)),0,-1):
                    jt=''.join(t for r,t in cand[:k])
                    if LAB.match(jt) and (k==1 or cand[k-1][0].x1-cand[0][0].x0<45):
                        rr0=fitz.Rect(cand[0][0]);
                        for r,t in cand[1:k]: rr0|=r
                        lab=(jt,rr0); break
            alltxt=' '.join(t for r,t in words if y0<=(r.y0+r.y1)/2<=y1)
            tw_=set(alltxt.split())
            if 'Question' in tw_ and ('Answer' in tw_ or 'Marks' in tw_) and 'Not' not in tw_ and lab is None:
                if header is None: header=dict(pn=pn,y0=y0,y1=y1,doc=doc)
                continue
            if lab: owner=lab[0]
            if owner is None: continue
            rows.append(dict(pn=pn,y0=y0,y1=y1,owner=owner,lab=lab,w=R.width,colx=colx))
    _cache[key]=(doc,rows,header); return _cache[key]
def render_ms(course,ch,out):
    blocks,total,source,avail=B.build_one(course,ch)
    title,paper,cls=B.INFO[course]; chn=B.TITLES[course][ch]
    od=fitz.open(); W,H=842,595
    def newp(): return od.new_page(width=W,height=H)
    cov=newp()
    cov.draw_rect(fitz.Rect(0,0,W,80),color=None,fill=(0.45,0.08,0.08))
    cov.insert_text((40,40),"MARK SCHEME — TEACHER COPY",fontname='hebo',fontsize=22,color=(1,1,1))
    cov.insert_text((40,64),f"{cls} · {'Chapter' if course=='10BR' else 'Topic'} {ch}: {chn}",fontname='helv',fontsize=12,color=(1,.9,.9))
    cov.insert_text((40,130),title,fontname='hebo',fontsize=15);cov.insert_text((40,152),paper,fontname='helv',fontsize=13)
    cov.insert_text((40,200),f"Total marks: {total}",fontname='hebo',fontsize=18,color=(0.7,0.1,0.1))
    notes=["Official Cambridge mark scheme extracts for each question in the matching exam paper, with question numbers",
      "changed to match the exam. Source of each question is shown above its rows.",
      "For teacher / admin use only. Do not give to students before they have attempted the paper.",
      "Mark scheme extracts © Cambridge University Press & Assessment."]
    for i,t in enumerate(notes): cov.insert_text((40,240+i*18),t,fontname='helv',fontsize=11)
    y=H  # force new page
    pg=None;top,bot=48,565
    def start():
        nonlocal pg,y
        pg=newp();y=top
    y=bot+1
    missing=[]
    for qn,key,no,labels,mk in source:
        doc,rows,header=rows_of(key)
        has=bool(labels); newlab={l:'(%s)'%chr(97+i) for i,l in enumerate(labels)}
        sel=[]
        for r in rows:
            m=LAB.match(r['owner']);
            if not m or int(m.group(1))!=no: continue
            part=m.group(2)
            if has and part and part not in labels: continue
            sel.append(r)
        if not sel: missing.append((qn,key,no)); continue
        # heading
        if y+16+40>bot: start()
        pg.insert_text((30,y+12),f"Question {qn}  —  {B.srcname(key)}, original Q{no}"+(' '+','.join(labels) if labels else '')+f"   [{mk} marks]",fontname='hebo',fontsize=10,color=(0.45,0.08,0.08)); y+=18
        items=([header] if header else [])
        def put(pn,y0,y1,d,rw,labfix=None):
            nonlocal y
            sc=min(1.25,(W-60)/rw); h=(y1-y0)*sc
            if y+h>bot: start()
            pgobj=d[pn]; clip=fitz.Rect(0,y0-0.5,rw,y1+0.5)
            pm=pgobj.get_pixmap(clip=clip,dpi=int(150*sc),colorspace=fitz.csGRAY)
            x0=(W-rw*sc)/2
            pg.insert_image(fitz.Rect(x0,y,x0+rw*sc,y+h+1*sc),pixmap=pm)
            if labfix:
                t,r,newt=labfix
                rr=fitz.Rect(x0+r.x0*sc-5,y+(r.y0-y0+0.5)*sc-2,x0+r.x1*sc+5,y+(r.y1-y0+0.5)*sc+2)
                pg.draw_rect(rr,color=None,fill=(1,1,1))
                tw=fitz.get_text_length(newt,'helv',9.5)
                pg.insert_text(((rr.x0+rr.x1)/2-tw/2,rr.y1-3),newt,fontname='helv',fontsize=9.5)
            y+=h
        if header:
            hd=header['doc']; hp=hd[header['pn']]; put(header['pn'],header['y0'],header['y1'],hd,hp.rect.width)
        for r in sel:
            lf=None
            if r['lab']:
                t,rect=r['lab']; m=LAB.match(t)
                newpart=newlab.get('('+m.group(2)[1:-1]+')','') if (has and m.group(2)) else m.group(2)
                lf=(t,rect,f"{qn}{newpart}{m.group(3)}")
            put(r['pn'],r['y0'],r['y1'],doc,r['w'],lf)
        y+=8
    n=len(od)
    for i,p in enumerate(od):
        if i==0: continue
        p.insert_text((30,28),f"MARK SCHEME (teacher) · {cls} · {'Chapter' if course=='10BR' else 'Topic'} {ch}: {chn}",fontname='helv',fontsize=8.5,color=(0.3,0.3,0.3))
        t=f"Total: {total} marks"; p.insert_text((W-30-fitz.get_text_length(t,'hebo',9),28),t,fontname='hebo',fontsize=9,color=(0.7,0.1,0.1))
        p.insert_text((W/2-25,585),f"Page {i+1} of {n}",fontname='helv',fontsize=8.5,color=(0.3,0.3,0.3))
    od.save(out,garbage=3,deflate=True)
    return dict(course=course,ch=ch,pages=n,missing=missing,total=total)
if __name__=='__main__':
    os.makedirs('/home/claude/-practice-quiz/exams-ms',exist_ok=True)
    only=sys.argv[1:];res=[]
    for course,chs in (('10BR',range(1,7)),('11BR',range(1,9)),('12BR',range(13,21))):
        for ch in chs:
            if only and f"{course}{ch}" not in only: continue
            f=f"{course}-{'ch' if course=='10BR' else 't'}{ch}-MS.pdf"
            r=render_ms(course,ch,'/home/claude/-practice-quiz/exams-ms/'+f); r['file']=f; res.append(r); print(r)
    if not only: json.dump(res,open('/tmp/ex/ms.json','w'))
