import pymupdf as fitz, glob, re, json, sys, os
A='/mnt/user-data/attachments/3e7309bb-a3f4-573e-a952-b13ef58d3ede/'
P1='/tmp/as1/AS papers/'
def papers():
    out=[]
    # 11BR: 9618 paper 1 variants 12,13
    for f in sorted(glob.glob(P1+'*Question*  1[23].pdf')):
        m=re.search(r'(June|November) (20\d\d) Question [Pp]aper  (\d\d)',f); ses,yr,var=m.groups()
        out.append(dict(course='11BR',qp=f,ms=f.replace('Question paper','Mark Scheme').replace('Question Paper','Mark Scheme'),code=f"9618/{var}",series=("May/June" if ses=="June" else "October/November")+" "+yr,key=f"as{'j' if ses=='June' else 'n'}{yr}_{var}"))
    # 12BR: 9618 paper 3
    for f in sorted(glob.glob(A+'*9618*qp_3[123].pdf')+glob.glob(A+'*9618_Computer_Science_June_2026_Question_Paper__3[123].pdf')):
        b=os.path.basename(f)
        if 'qp' in b: var=b[-6:-4]; yr='2025'; ms=A+b.replace('qp','ms')
        else: var=b[-6:-4]; yr='2026'; ms=f.replace('Question_Paper','Mark_Scheme')
        out.append(dict(course='12BR',qp=f,ms=ms,code=f"9618/{var}",series="May/June "+yr,key=f"a{'j' if yr=='2026' else 's'}{yr}_{var}"))
    # 10BR: 0478 paper 1
    for b,code,series,key in [('0478_s24_qp_12.pdf','0478/12','May/June 2024','i24_12'),('0478_s25_qp_12.pdf','0478/12','May/June 2025','i25_12'),('0478_Computer_Science_June_2026_Question_Paper__11.pdf','0478/11','May/June 2026','i26_11'),('0478_Computer_Science_June_2026_Question_Paper__12.pdf','0478/12','May/June 2026','i26_12')]:
        fs=glob.glob(A+'*'+b); 
        if fs: out.append(dict(course='10BR',qp=fs[0],ms=fs[0].replace('qp','ms').replace('Question_Paper','Mark_Scheme'),code=code,series=series,key=key))
    seen=set(); o2=[]
    for x in out:
        if x['key'] in seen: continue
        seen.add(x['key']); o2.append(x)
    return o2
def segment(path):
    doc=fitz.open(path); marks=[]
    for pn,p in enumerate(doc):
        ws=p.get_text("words"); t=p.get_text()
        if 'Permission to reproduce' in t or 'BLANK PAGE' in t and len(ws)<60: 
            marks.append(('stop' if 'Permission' in t else 'blank',pn,0)); 
            if 'Permission' in t: break
            continue
        for w in ws:
            if 38<=w[0]<=62 and re.fullmatch(r'\d{1,2}',w[4]) and 58<w[1]<780:
                if any(abs(v[1]-w[1])<3.5 and v[0]>=66 and v[0]<120 for v in ws if v is not w):
                    marks.append(('q',pn,int(w[4]),w[1],w[0],w[2]))
    qs=[]; last=0
    cands=[m for m in marks if m[0]=='q']
    seq=[]
    for m in cands:
        if m[2]==last+1: seq.append(m); last=m[2]
    return doc,seq
if __name__=='__main__':
    res=[]
    for pp in papers():
        doc,seq=segment(pp['qp']); 
        print(pp['key'],pp['course'],len(doc),'pages',len(seq),'questions',[ (s[2],s[1]) for s in seq][:30])
