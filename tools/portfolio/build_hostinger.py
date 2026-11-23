"""Package the current GitHub Pages build for amaanity.com root hosting."""
from pathlib import Path
import argparse, shutil, zipfile, re
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

parser=argparse.ArgumentParser()
parser.add_argument('--output',required=True,type=Path)
args=parser.parse_args()
source=Path(__file__).resolve().parents[2]/'docs'
dest=args.output.resolve()
if dest.exists(): raise SystemExit('Choose a new output directory; existing files are preserved.')
shutil.copytree(source,dest)
for file in dest.rglob('*'):
 if file.is_file() and file.suffix in {'.html','.js','.css','.json','.xml','.txt','.svg'}:
  text=file.read_text(encoding='utf-8')
  text=text.replace('https://amaan-tacc.github.io/portfolio/','https://amaanity.com/')
  text=text.replace('https://amaan-tacc.github.io','https://amaanity.com')
  text=text.replace('/portfolio/','/')
  file.write_text(text,encoding='utf-8')
(dest/'.htaccess').write_text('DirectoryIndex index.html index.php\nErrorDocument 404 /404.html\n<IfModule mod_rewrite.c>\nRewriteEngine On\nRewriteCond %{HTTPS} !=on [OR]\nRewriteCond %{HTTP_HOST} ^www\\.amaanity\\.com$ [NC]\nRewriteRule ^ https://amaanity.com%{REQUEST_URI} [R=301,L]\n</IfModule>\n<IfModule mod_expires.c>\nExpiresActive On\nExpiresByType image/webp "access plus 1 month"\nExpiresByType image/png "access plus 1 month"\nExpiresByType image/jpeg "access plus 1 month"\nExpiresByType font/woff2 "access plus 1 year"\n</IfModule>\n',encoding='utf-8')
class LinkCheck(HTMLParser):
 def handle_starttag(self,tag,attrs):
  for key,value in attrs:
   if key in {'src','href'} and value and value.startswith('/'):
    target=dest/unquote(urlsplit(value).path.lstrip('/'))
    if target.is_dir(): target=target/'index.html'
    assert target.exists(), str(target)
for html in dest.rglob('*.html'):
 text=html.read_text(encoding='utf-8');LinkCheck().feed(text)
 assert 'https://amaan-tacc.github.io' not in text
 assert '/portfolio/' not in text
archive=dest.with_suffix('.zip')
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for file in dest.rglob('*'):
  if file.is_file(): z.write(file,file.relative_to(dest))
print(f'Validated and packaged {len(list(dest.rglob("*.html")))} pages: {archive}')
