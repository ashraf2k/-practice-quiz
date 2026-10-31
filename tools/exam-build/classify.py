import json,re
els=json.load(open('/tmp/ex/els.json'))
LEX={
'11BR':{
 1:r'binary|bit\b|bits\b|byte|kibibyte|mebibyte|gibibyte|denary|hexadecimal|character set|ascii|unicode|bitmap|resolution|colour depth|bit depth|sampl|compress|lossy|lossless|bcd|two.s complement|run.length|vector graphic|file size|image|video|sound|overflow|megabyte|nibble',
 2:r'network|\bLAN\b|\bWAN\b|topology|star|mesh|packet|router|switch|IP address|subnet|protocol|wireless|bluetooth|client|peer|thin|cloud|ethernet|transmission|wi-?fi|csma|hub|\bDNS\b|gateway|bus topology|\bMAC\b|public IP|private IP|ipv',
 3:r'embedded|\bRAM\b|\bROM\b|DRAM|SRAM|PROM|buffer|sensor|touchscreen|microphone|speaker|barcode|hard disk|solid.state|optical|flash|input device|output device|\bUSB\b|HDMI|logic gate|truth table|boolean|NAND|XOR|\bNOR\b|circuit|\bport\b|magnetic|virtual reality|headset|printer|\bLED\b|\bLCD\b|monitor|scanner|\bQR\b',
 4:r'processor|register|\bACC\b|\bMAR\b|\bMDR\b|fetch|assembly|\bLDD\b|\bLDM\b|instruction|address bus|data bus|control bus|clock speed|core|interrupt|bit manipulation|shift|addressing|opcode|\bALU\b|cache|\bIX\b|\bCIR\b|program counter|von neumann',
 5:r'operating system|utility|library|\bDLL\b|compiler|interpreter|\bIDE\b|translator|assembler|defrag|disk formatter|memory management|process management|multi-?tasking',
 6:r'security|privacy|integrity|validation|validate|verification|verify|malware|phishing|pharming|encrypt|firewall|hack|backup|virus|spyware|check digit|checksum|parity|biometric|password|digital signature|ddos|\bssl\b|\btls\b|presence check|range check|length check',
 7:r'ethic|copyright|licen[cs]e|\bBCS\b|\bIEEE\b|artificial intelligence|\bAI\b|professional|shareware|open source|freeware|plagiar',
 8:r'database|\bSQL\b|primary key|foreign key|entity|normalis|\bDBMS\b|relational|\bSELECT\b|tuple|attribute|referential|data dictionary|E-?R diagram|CREATE TABLE|file-based'},
'12BR':{
 13:r'user-defined|enumerated|\bTYPE\b|record|file organi|serial file|sequential|random file|floating|mantissa|exponent|normalis|hashing|pointer type|composite',
 14:r'protocol|TCP|IP\b|circuit switching|packet switching|bittorrent|peer-to-peer|\bP2P\b|routing|router|\bBGP\b|\bHTTP|\bFTP|\bSMTP|\bPOP|\bIMAP|\bVoIP|network|ethernet|wi-?fi|bandwidth|latency|\bDNS',
 15:r'parallel|\bSIMD\b|\bMISD\b|\bMIMD\b|\bSISD\b|virtual machine|boolean|logic circuit|karnaugh|k-map|flip-flop|half adder|full adder|truth table|RISC|CISC|pipelin|sum-of-products|de morgan|gate|processor architecture|massively|multicore',
 16:r'operating system|scheduling|\bpaging\b|memory management|process state|pre-?emptive|round robin|compiler|interpreter|lexical|syntax analy|code generation|optimis|BNF|backus|syntax diagram|reverse polish|\bRPN\b|translation|\bIDE\b|utility|virtual memory|segment',
 17:r'encrypt|\bTLS\b|\bSSL\b|digital signature|digital certificate|certificate|asymmetric|symmetric|cipher|public key|private key|quantum|security',
 18:r'artificial intelligence|\bAI\b|machine learning|neural|deep learning|supervised|reinforcement|dijkstra|A\*|graph|regression|expert system|heuristic|back-?propagation',
 19:r'big o|insertion sort|bubble sort|binary search|linear search|stack|queue|linked list|binary tree|abstract data|ADT|recurs|time complexity|algorithm|dictionary|hash table',
 20:r'class|object|inherit|polymorphism|encapsulation|OOP|object-oriented|declarative|prolog|imperative|low-level|exception|file processing|OPENFILE|GETRECORD|PUTRECORD|SEEK|WRITEFILE|READFILE|paradigm|fact|rule|predicate'},
'10BR':{
 1:r'binary|bit\b|bits\b|byte|kibibyte|mebibyte|gibibyte|denary|hexadecimal|character set|ascii|unicode|bitmap|resolution|colour depth|bit depth|sampl|compress|lossy|lossless|overflow|two.s complement|shift|file size|image|sound|nibble|megabyte|run length|data storage',
 2:r'packet|transmission|serial|parallel|simplex|duplex|\bUSB\b|error detection|parity|checksum|echo check|check digit|\bARQ\b|encrypt|symmetric|cipher|data transmission|bit rate|latency',
 3:r'\bCPU\b|fetch|core|cache|clock speed|embedded|input device|output device|sensor|\bRAM\b|\bROM\b|storage|\bSSD\b|magnetic|optical|virtual memory|\bNIC\b|MAC address|IP address|router|touchscreen|microphone|speaker|\bLCD\b|\bLED\b|barcode|\bQR\b|printer|scanner|hard disk|flash|logic gate|processor|von neumann|\bMAC\b|ipv',
 4:r'system software|application software|operating system|utility|interrupt|high-level|low-level|compiler|interpreter|assembler|\bIDE\b|translator|assembly|machine code|software',
 5:r'URL|web browser|HTTP|cookie|digital currency|cyber|hack|malware|phishing|pharming|\bDDoS\b|firewall|password|biometric|web server|\bDNS\b|internet|world wide web|\bISP\b|blockchain|bitcoin|spyware|virus|brute|social engineering|SSL',
 6:r'automated|sensor|microprocessor|actuator|robot|artificial intelligence|\bAI\b|expert system|machine learning|autonomous|drone|driverless|control system|feedback|self-driving|vehicle'}}
def score(text,pat):
    return len(re.findall(pat,text,re.I))
def propose(course,stem,part):
    best=None;bs=0
    sc={}
    for k,p in LEX[course].items():
        s=3*score(part,p)+score(stem,p)
        sc[k]=s
    k=max(sc,key=lambda x:sc[x]); return k,sc
def items(course):
    out=[]
    for key,v in els.items():
        if v['meta']['course']!=course: continue
        es=v['els']; stems={}
        for e in es:
            if e['kind']=='q': stems[e['no']]=e
        for e in es:
            if e['kind']=='q' and any(x['kind']=='p' and x['no']==e['no'] for x in es): continue
            stem=stems[e['no']]['text'] if e['kind']=='p' else ''
            out.append(dict(key=key,no=e['no'],label=e.get('label',''),marks=e['marks'],text=e['text'],stem=stem[:400],el=e))
    return out
if __name__=='__main__':
    import sys
    course=sys.argv[1]
    for it in items(course):
        k,sc=propose(course,it['stem'],it['text'])
        top=sorted(sc.items(),key=lambda x:-x[1])
        conf='' if top[0][1]>=2*max(1,top[1][1]) else '?'
        t=re.sub(r'^\(?[a-z]?\)?\s*','',it['text']) if it['label'] else it['text']
        print(f"{it['key']}|{it['no']}{it['label']}|{it['marks']}|{k}{conf}|{t[:100]}")
