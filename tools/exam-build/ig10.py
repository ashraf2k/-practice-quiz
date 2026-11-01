import sys,glob,os,re,json
sys.path.insert(0,'/tmp/ex')
import pymupdf as f, seg2
R='/tmp/ig/x/'
def papers():
    seen={};out=[]
    for q in sorted(glob.glob(R+'20*/*/0478_[msw]2[3-5]_qp_1[123].pdf')+glob.glob(R+'2026/May_June/0478 Computer Science June 2026 Question Paper  1[123].pdf')):
        b=os.path.basename(q)
        if b in seen: continue
        seen[b]=1
        if b.startswith('0478_'):
            m=re.match(r'0478_([msw])(\d\d)_qp_(\d\d)',b); ses,yr,var=m.groups()
            ms=os.path.join(os.path.dirname(q),b.replace('qp','ms'))
            if not os.path.exists(ms):
                g=glob.glob(R+'20*/*/'+b.replace('qp','ms')); ms=g[0] if g else None
            series={'m':'Feb/March','s':'May/June','w':'Oct/Nov'}[ses]+' 20'+yr
            key=f"{ses}{yr}_{var}"
        else:
            var=b[-6:-4]; ms=q.replace('Question Paper','Mark Scheme'); series='May/June 2026'; key=f"s26_{var}"
        if not ms or not os.path.exists(ms): print('NO MS',b); continue
        out.append(dict(key=key,qp=q,ms=ms,series=series,code='0478/'+var))
    return out
if __name__=='__main__':
    els={}
    for p in papers():
        d=f.open(p['qp']);e=seg2.build(d)
        els[p['key']]=dict(meta=dict(course='10BR',code=p['code'],series=p['series'],qp=p['qp'],ms=p['ms']),els=e)
        print(p['key'],p['series'],p['code'],sum(x['marks'] for x in e))
    json.dump(els,open('/tmp/ig/els10.json','w'))
