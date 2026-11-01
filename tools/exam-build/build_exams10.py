import sys, json, re, random, os
sys.path.insert(0,'/tmp/ex'); sys.path.insert(0,'/tmp/ig')
import pymupdf as fitz
import classify10 as C, ig10
els=json.load(open('/tmp/ig/els10.json'))
PAP={p['key']:p for p in ig10.papers()}
OV={'s26_13|2(a)':0}
TITLES={
'10BR':{1:'Data Representation',2:'Data Transmission',3:'Hardware',4:'Software',5:'The Internet and its Uses',6:'Automated and Emerging Technologies'},
'11BR':{1:'Information Representation',2:'Communication',3:'Hardware',4:'Processor Fundamentals',5:'System Software',6:'Security, Privacy and Data Integrity',7:'Ethics and Ownership',8:'Databases'},
'12BR':{13:'Data Representation',14:'Communication and Internet Technologies',15:'Hardware',16:'System Software',17:'Security',18:'Artificial Intelligence',19:'Computational Thinking and Problem-solving',20:'Further Programming'}}
INFO={'10BR':('Cambridge IGCSE Computer Science 0478','Paper 1  Computer Systems','10BR'),
 '11BR':('Cambridge AS Level Computer Science 9618','Paper 1  Theory Fundamentals','11BR'),
 '12BR':('Cambridge A Level Computer Science 9618','Paper 3  Advanced Theory','12BR')}
XREF=re.compile(r'\b\d{1,2}\s?\([a-z]\)|\bpart\s*\(|\b(?:in|from|of|to)\s+\([a-z]\)|your answer|answer to|previous (?:part|question)|part [a-z]\b',re.I)
def stem_of(key,no):
    for e in els[key]['els']:
        if e['kind']=='q' and e['no']==no: return e
def conf_ch(course,it):
    k,sc=C.propose(course,it['stem'],it['text']); top=sorted(sc.items(),key=lambda x:-x[1])
    ok=top[0][1]>=2*max(1,top[1][1]) and top[0][1]>=2
    return k if ok else None
def units(course):
    its=C.items(course); out={}
    for it in its:
        id_=f"{it['key']}|{it['no']}{it['label']}"
        it['id']=id_; it['ch']=OV.get(id_,conf_ch(course,it))
        out.setdefault((it['key'],it['no']),[]).append(it)
    return out
def choose(course,ch,target=75):
    U=units(course); cands=[]
    for (key,no),parts in U.items():
        mine=[p for p in parts if p['ch']==ch]
        if not mine: continue
        has_parts=parts[0]['label']!=''
        if has_parts and len(mine)<len(parts):
            mine=[p for p in mine if not XREF.search(p['text'][:400])]
            if not mine: continue
        mk=sum(p['marks'] for p in mine)
        if mk<=0 or mk>16: continue
        cands.append(dict(key=key,no=no,parts=mine,marks=mk,whole=len(mine)==len(parts),has_parts=has_parts))
    rnd=random.Random(7000+ch); rnd.shuffle(cands)
    sel=[];tot=0;used={}
    while True:
        fit=[c for c in cands if tot+c['marks']<=target and c not in sel]
        if not fit: break
        c=min(fit,key=lambda c:(used.get(c['key'],0)*2+used.get(c['key'][:3],0)-(2 if c['whole'] else 0)-min(c['marks'],6)*0.3+rnd.random()))
        sel.append(c); tot+=c['marks']; used[c['key']]=used.get(c['key'],0)+1; used[c['key'][:3]]=used.get(c['key'][:3],0)+1
        if tot>=target: break
    order=list(PAP)
    sel.sort(key=lambda c:(order.index(c['key']),c['no']))
    return sel,tot,sum(c['marks'] for c in cands)

TOPY,BOTY=64,808
def numword(doc,pg,y0,nm):
    for w in doc[pg].get_text('words'):
        if 36<=w[0]<=64 and re.fullmatch(r'\d{1,2}',w[4]) and int(w[4])==nm and y0-3<=w[1]<=y0+14: return fitz.Rect(w[:4])
def labword(doc,pg,y0,lab):
    for w in doc[pg].get_text('words'):
        if 62<=w[0]<=88 and w[4]==lab and y0-3<=w[1]<=y0+14: return fitz.Rect(w[:4])
def build_one(course,ch):
    sel,tot,avail=choose(course,ch)
    docs={}
    def D(k):
        if k not in docs: docs[k]=fitz.open(PAP[k]['qp'])
        return docs[k]
    # blocks: list of (items) each item = dict(doc,slice,fixups)
    blocks=[];qn=0;source=[]
    for c in sel:
        qn+=1; key=c['key']; doc=D(key)
        stem=stem_of(key,c['no']); pe=[e for e in els[key]['els'] if e['kind']=='p' and e['no']==c['no']]
        items=[]
        selp=[ {p['label'] for p in c['parts']} ]
        labels=[p['label'] for p in c['parts']] if c['has_parts'] else []
        newlab={l:'(%s)'%chr(97+i) for i,l in enumerate(labels)}
        numdone=False
        if stem and c['has_parts']:
            for (pg,y0,y1) in stem['slices']:
                fx=[]
                if not numdone and abs(y0-stem['y'])<1:
                    r=numword(doc,pg,y0,c['no'])
                    if r: fx.append(('num',r)); numdone=True
                items.append(dict(doc=doc,pg=pg,y0=y0,y1=y1,fx=fx))
        elif stem and not c['has_parts']:
            for k,(pg,y0,y1) in enumerate(stem['slices']):
                fx=[]
                if k==0:
                    r=numword(doc,pg,y0,c['no'])
                    if r: fx.append(('num',r))
                items.append(dict(doc=doc,pg=pg,y0=y0,y1=y1,fx=fx))
        if c['has_parts']:
            for e in pe:
                if e['label'] not in labels: continue
                for k,(pg,y0,y1) in enumerate(e['slices']):
                    fx=[]
                    if k==0:
                        if e.get('withnum') and not numdone:
                            r=numword(doc,pg,y0,c['no'])
                            if r: fx.append(('num',r)); numdone=True
                        r=labword(doc,pg,y0,e['label'])
                        if r and newlab[e['label']]!=e['label']: fx.append(('lab',r,newlab[e['label']]))
                        elif e.get('withnum') and not numdone: pass
                    items.append(dict(doc=doc,pg=pg,y0=y0,y1=y1,fx=fx))
        # if number never shown in clips, draw it on first item
        if not numdone and not any(f[0]=='num' for it in items for f in it['fx']):
            items[0]['fx'].append(('newnum',))
        for it in items:
            it['qn']=qn
            it['y0']=max(it['y0'],61); it['y1']=min(it['y1'],783.2)
            if it['y0']<=62:
                rw=[w[1] for w in it['doc'][it['pg']].get_text('words') if w[1]>=61 and w[0]>28 and w[1]<it['y1'] and not (w[4]==',' and w[2]-w[0]>8) and not re.search('[\u0100-\u017f]',w[4])]
                if rw: it['y0']=max(it['y0'],min(rw)-1.5)
            elif it['y0']<69.6:
                rw=[w[1] for w in it['doc'][it['pg']].get_text('words') if w[1]>=it['y0'] and w[0]>28 and w[1]<it['y1'] and not (w[4]==',' and w[2]-w[0]>8) and not re.search('[\u0100-\u017f]',w[4])]
                if rw and min(rw)>=72: it['y0']=69.6
        items=[it for it in items if it['y1']-it['y0']>=8]
        if items and not any(f[0] in('num','newnum') for it in items for f in it['fx']): items[0]['fx'].append(('newnum',))
        blocks.append(dict(qn=qn,items=items,marks=c['marks']))
        lab=''.join(l for l in labels) if labels else ''
        p=PAP[key]
        source.append((qn,key,c['no'],labels,c['marks']))
    total=sum(b['marks'] for b in blocks)
    return blocks,total,source,avail
def srcname(key):
    return PAP[key]['series']+' Paper '+key.split('_')[1]
def render(course,ch,out,fname):
    blocks,total,source,avail=build_one(course,ch)
    title,paper,cls=INFO[course]; chn=TITLES[course][ch]
    mins=90 if total>=60 else max(15,int(round(total*1.2/5.0))*5)
    tstr='1 hour 30 minutes' if mins==90 else (f'{mins//60} hour {mins%60} minutes' if mins>=60 else f'{mins} minutes')
    out_doc=fitz.open()
    W,H=595,842
    def new_page():
        pg=out_doc.new_page(width=W,height=H); return pg
    cover=new_page()
    # cover
    cover.draw_rect(fitz.Rect(0,0,W,92),color=None,fill=(0.07,0.2,0.45))
    cover.insert_text((40,42),"iLearn Practice Exam",fontname='hebo',fontsize=22,color=(1,1,1))
    cover.insert_text((40,66),f"{cls} · Chapter / Topic {ch}",fontname='helv',fontsize=12,color=(0.85,0.9,1))
    cover.insert_text((40,150),title,fontname='hebo',fontsize=15)
    cover.insert_text((40,174),paper,fontname='helv',fontsize=13)
    cover.insert_text((40,215),f"Topic {ch}: {chn}" if course!='10BR' else f"Chapter {ch}: {chn}",fontname='hebo',fontsize=19,color=(0.07,0.2,0.45))
    for i,(l,v) in enumerate((('Name',''),('Class',''),('Date',''))):
        y=262+i*34
        cover.insert_text((40,y),l+':',fontname='hebo',fontsize=11)
        cover.draw_line((95,y+2),(555,y+2),width=0.7)
    cover.draw_rect(fitz.Rect(40,375,555,470),color=(0.07,0.2,0.45),width=1.5)
    cover.insert_text((60,405),"Time allowed:",fontname='hebo',fontsize=13); cover.insert_text((190,405),tstr,fontname='helv',fontsize=13)
    cover.insert_text((60,435),"TOTAL MARKS:",fontname='hebo',fontsize=16,color=(0.7,0.1,0.1)); cover.insert_text((190,435),f"{total}",fontname='hebo',fontsize=20,color=(0.7,0.1,0.1))
    cover.insert_text((60,458),"Marks obtained:  ........ / %d"%total,fontname='helv',fontsize=11)
    ins=["INSTRUCTIONS",
     "• Answer all questions.",
     "• Write your answers in the spaces provided on this paper, using a black or dark blue pen.",
     "• Do not use an erasable pen or correction fluid.",
     "• No calculators are allowed.",
     "• Do not write anything in the margins.",
     "INFORMATION",
     f"• The total mark for this paper is {total}.",
     "• The number of marks for each question or part question is shown in brackets [ ].",
     f"• This paper contains {len(blocks)} questions, all drawn from Cambridge past papers on this chapter.",
     "• After you finish, your teacher will mark your work against the official mark scheme."]
    if mins<90:
        ins.append(f"• Only {total} marks of past-paper questions are available for this chapter, so the recommended time is {tstr} (1 min 12 s per mark).")
    y=505
    for t in ins:
        hd=t in('INSTRUCTIONS','INFORMATION')
        if hd: y+=6
        cover.insert_text((40,y),t,fontname='hebo' if hd else 'helv',fontsize=10.5); y+=16
    cover.insert_text((40,812),"Questions reproduced from Cambridge International past papers © Cambridge University Press & Assessment, for classroom practice.",fontname='helv',fontsize=7.5,color=(0.4,0.4,0.4))
    # content flow
    pg=None;y=TOPY
    def start():
        nonlocal pg,y
        pg=new_page();y=TOPY
    start()
    def place(it):
        nonlocal y
        h=it['y1']-it['y0']
        src=it['doc']
        rect=fitz.Rect(24,y,572,y+h)
        clip=fitz.Rect(24,it['y0'],572,it['y1'])
        pg.show_pdf_page(rect,src,it['pg'],clip=clip)
        dy=y-it['y0']
        for f in it['fx']:
            if f[0]=='num':
                r=f[1]+(0,dy,0,dy)
                pg.draw_rect(fitz.Rect(r.x0-3,r.y0-1,r.x1+4,r.y1+1),color=None,fill=(1,1,1))
                pg.insert_text((r.x0,r.y1-2.4),str(it['qn']),fontname='helv',fontsize=11)
            elif f[0]=='lab':
                r=f[1]+(0,dy,0,dy)
                pg.draw_rect(fitz.Rect(r.x0-1,r.y0-1,r.x1+2,r.y1+1),color=None,fill=(1,1,1))
                pg.insert_text((r.x0,r.y1-2.4),f[2],fontname='helv',fontsize=11)
            elif f[0]=='newnum':
                pg.insert_text((38,y+13),str(it['qn']),fontname='helv',fontsize=11)
        y+=h
        for w in it['doc'][it['pg']].get_text('words'):
            if it['y0']<w[3] and w[1]<=it['y1'] and w[0]>28 and ((w[4]==',' and w[2]-w[0]>8) or re.search('[\u0100-\u017f]',w[4])):
                pg.draw_rect(fitz.Rect(w[0]-2,w[1]+dy-7,w[2]+2,w[1]+dy+3),color=None,fill=(1,1,1)) if w[4]==',' else pg.draw_rect(fitz.Rect(w[0]-1,w[1]+dy-1,w[2]+1,w[3]+dy+1),color=None,fill=(1,1,1))
    for b in blocks:
        its=b['items']
        # keep first two items together
        i=0
        while i<len(its):
            grp=its[i:i+2] if i==0 and len(its)>1 else its[i:i+1]
            need=sum(g['y1']-g['y0'] for g in grp)
            if y+need>BOTY and y>TOPY+1:
                start()
            for g in grp: place(g) if (y+(g['y1']-g['y0'])<=BOTY or y<=TOPY+1) else (start(),place(g))
            i+=len(grp)
        y+=6
    # end of paper
    if y+30>BOTY: start()
    pg.insert_text((W/2-60,y+20),"END OF QUESTION PAPER",fontname='hebo',fontsize=11)
    # headers/footers
    n=len(out_doc)
    for i,p in enumerate(out_doc):
        if i==0: continue
        p.insert_text((40,34),f"{cls} · {title.split(' Computer')[0]} · {'Topic' if course!='10BR' else 'Chapter'} {ch}: {chn}",fontname='helv',fontsize=8.5,color=(0.3,0.3,0.3))
        t=f"Total: {total} marks"; p.insert_text((555-fitz.get_text_length(t,'hebo',9),34),t,fontname='hebo',fontsize=9,color=(0.7,0.1,0.1))
        p.draw_line((40,42),(555,42),width=.5,color=(.6,.6,.6))
        p.insert_text((W/2-25,830),f"Page {i+1} of {n}",fontname='helv',fontsize=8.5,color=(0.3,0.3,0.3))
    out_doc.set_metadata({'title':f"{cls} {chn} exam ({total} marks)",'author':'iLearn'})
    out_doc.save(out,garbage=3,deflate=True)
    return dict(file=fname,course=course,ch=ch,title=chn,total=total,avail=avail,mins=mins,pages=n,nq=len(blocks))
if __name__=='__main__':
    out='/tmp/ig/out/exams'; os.makedirs(out,exist_ok=True); res=[]
    for ch in range(1,7):
        f=f"10BR-ch{ch}.pdf"; r=render('10BR',ch,out+'/'+f,f); res.append(r); print(r)
    json.dump(res,open('/tmp/ig/exams10.json','w'),indent=1)
