import base64,glob,os,json
d=os.path.dirname(os.path.abspath(__file__))
s=open(d+'/app.html').read()
b64=lambda p,m:'data:'+m+';base64,'+base64.b64encode(open(p,'rb').read()).decode()
imgs={os.path.basename(p)[:-5]:b64(p,'image/webp') for p in glob.glob(d+'/img/*.webp')}
s=s.replace('__IMGS__',json.dumps(imgs)).replace('__RMARK__',b64(d+'/img/rmark.png','image/png')).replace('__LOGO__',b64(d+'/img/logo.png','image/png'))
open(d+'/index.html','w').write(s); print(len(s))
