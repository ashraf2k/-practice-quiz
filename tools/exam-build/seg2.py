import pymupdf as fitz, re, json
import seg
TOP,BOT=54,795
def markers(doc):
    ms=[]; stop=len(doc)
    for pn,p in enumerate(doc):
        t=p.get_text()
        if 'Permission to reproduce' in t: stop=pn; break
    qlast=0
    for pn in range(min(stop+1,len(doc))):
        p=doc[pn]; ws=p.get_text("words")
        for w in sorted(ws,key=lambda w:(w[1],w[0])):
            if not (TOP<w[1]<780): continue
            if 38<=w[0]<=62 and re.fullmatch(r'\d{1,2}',w[4]) and int(w[4])==qlast+1 and any(abs(v[1]-w[1])<3.5 and 66<=v[0]<120 for v in ws if v is not w):
                qlast=int(w[4]); ms.append(dict(kind='q',no=qlast,page=pn,y=w[1]-6,x=w[0]))
            elif 64<=w[0]<=84 and re.fullmatch(r'\([a-z]\)',w[4]) and qlast>0 and w[1]>TOP-6:
                # level-1 part label: first word on its line
                left=[v for v in ws if abs(v[1]-w[1])<3.5 and v[0]<w[0]-3 and v[0]>30]
                if not left:
                    ms.append(dict(kind='p',no=qlast,label=w[4],page=pn,y=w[1]-5,x=w[0]))
                elif len(left)==1 and re.fullmatch(r'\d{1,2}',left[0][4]) and int(left[0][4])==qlast and left[0][0]<62 and ms and ms[-1]['kind']=='q' and ms[-1]['no']==qlast:
                    ms.append(dict(kind='p',no=qlast,label=w[4],page=pn,y=w[1]-5,x=w[0],withnum=True))
    return ms,stop
def permy(doc,stop):
    if stop>=len(doc): return {}
    for w in doc[stop].get_text('words'):
        if w[4]=='Permission': return {stop:w[1]-4}
    return {}
def build(doc):
    ms,stop=markers(doc); PY=permy(doc,stop)
    # slices between consecutive markers
    els=[]
    for i,m in enumerate(ms):
        nxt=ms[i+1] if i+1<len(ms) else None
        sl=[]
        pg=m['page']; y=m['y']
        while True:
            if nxt and nxt['page']==pg:
                sl.append((pg,max(y,TOP),nxt['y']-0)); break
            if pg==stop: sl.append((pg,max(y,TOP),PY.get(pg,BOT))); break
            sl.append((pg,max(y,TOP),BOT))
            pg+=1
            if nxt is None and pg>stop: break
            if nxt and pg>nxt['page']: break
            y=TOP
        # drop empty slices (no words)
        keep=[]
        for (pg,y0,y1) in sl:
            if y1-y0<8: continue
            p=doc[pg]; txt=[w for w in p.get_text("words") if y0-1<=w[1]<=y1 and w[0]>28 and w[0]<575 and w[4] not in('BLANK','PAGE')]
            tx=" ".join(w[4] for w in txt)
            if 'BLANK PAGE' in p.get_text() and len(p.get_text("words"))<70: continue
            if len(txt)==0 : continue
            keep.append((pg,y0,y1))
        m=dict(m); m['slices']=keep
        words=[]
        for (pg,y0,y1) in keep:
            p=doc[pg]
            for w in sorted(p.get_text("words"),key=lambda w:(round(w[1]/3),w[0])):
                if y0-1<=w[1]<=y1 and 28<w[0]<575: words.append(w[4])
        text=" ".join(words)
        text=re.sub(r'(\.\s*){5,}',' ... ',text); text=re.sub(r'DO NOT WRITE IN THIS MARGIN|\[Turn over\]|©.*?9618/\d+/\w/\w/\d+|\* \d+ \*','',text)
        m['text']=re.sub(r'\s+',' ',text).strip()
        mk=0
        for (pg,y0,y1) in keep:
            allw=doc[pg].get_text('words')
            for w in allw:
                if y0-1<=w[1]<=y1 and w[0]>470 and re.fullmatch(r'\[\d+\]',w[4]):
                    if sum(1 for v in allw if abs(v[1]-w[1])<3 and re.fullmatch(r'\[\d+\]',v[4]))>=3: continue
                    mk+=int(w[4][1:-1])
        m['marks']=mk
        els.append(m)
    return els
if __name__=='__main__':
    out={}
    for pp in seg.papers():
        doc=fitz.open(pp['qp']); els=build(doc)
        tot=sum(e['marks'] for e in els)
        qs={}
        for e in els: qs.setdefault(e['no'],[]).append(e['marks'])
        print(pp['key'],'total',tot,{k:v for k,v in qs.items()})
        out[pp['key']]=dict(meta={k:pp[k] for k in('course','code','series','qp','ms')},els=els)
    json.dump(out,open('/tmp/ex/els.json','w'))
