from pathlib import Path
from PIL import Image,ImageOps
import json,hashlib
root=Path(__file__).resolve().parents[2]/'docs'
s=(root/'content.js').read_text(encoding='utf-8');data=json.loads(s[s.index('{'):s.rfind('}')+1])
sources={'/portfolio/assets/amaan-avatar-original.webp','/portfolio/assets/work/happy-interior-mockup.webp'}
for p in data['projects']:
 sources.add(p['image']);sources.update(g['src'] for g in p['gallery'])
out=root/'assets/responsive';out.mkdir(exist_ok=True)
manifest={};original=thumbs=0
for src in sorted(sources):
 p=root/src.removeprefix('/portfolio/');im=ImageOps.exif_transpose(Image.open(p));im=im.convert('RGBA' if 'A' in im.getbands() else 'RGB');w,h=im.size;variants=[]
 for size in [320,640,960]:
  if size>=w:continue
  name=hashlib.sha1(src.encode()).hexdigest()[:12]+f'-{size}.webp';dest=out/name
  if not dest.exists() or im.mode=='RGBA':im.resize((size,round(h*size/w)),Image.Resampling.LANCZOS).save(dest,quality=87,method=6)
  variants.append({'src':'/portfolio/assets/responsive/'+name,'width':size})
 variants.append({'src':src,'width':w})
 manifest[src]={'width':w,'height':h,'variants':variants}
 original+=p.stat().st_size;thumbs+=(root/variants[0]['src'].removeprefix('/portfolio/')).stat().st_size
(root/'image-assets.js').write_text('window.ASSET_IMAGES='+json.dumps(manifest,separators=(',',':'))+';\n',encoding='utf-8')
print(json.dumps({'images':len(manifest),'original_bytes':original,'small_variant_bytes':thumbs,'reduction_percent':round((1-thumbs/original)*100)}))
