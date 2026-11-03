import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {parseHTML} from 'linkedom';
import * as cssTree from 'css-tree';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../docs');
// Parse the actual stylesheets: malformed text before :root once disabled the entire light palette.
for(const name of ['style.css','fonts.css']){
 const source=fs.readFileSync(path.join(root,name),'utf8');
 cssTree.parse(source,{onParseError(error){throw new Error(`${name}: ${error.message}`);}});
}
const styles=fs.readFileSync(path.join(root,'style.css'),'utf8');
assert(styles.trimStart().startsWith(':root{'),'The light-mode palette must be the first valid rule.');
assert(!/\.reveal:not\([^}]+opacity:\s*0/.test(styles),'Content must remain visible if a reveal observer is delayed.');
const files=[];const walk=dir=>{for(const p of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,p.name);if(p.isDirectory())walk(file);else files.push(file);}};walk(root);
let links=0,images=0;const canonicals=new Set(),titles=new Set();
for(const file of files.filter(f=>f.endsWith('.html'))){
 const {document}=parseHTML(fs.readFileSync(file,'utf8'));assert.equal(document.querySelectorAll('h1').length,1,file);
 const canonical=document.querySelector('link[rel=canonical]').getAttribute('href');assert(!canonicals.has(canonical),`duplicate canonical ${canonical}`);canonicals.add(canonical);
 const title=document.querySelector('title').textContent;assert(!titles.has(title),`duplicate title ${title}`);titles.add(title);
 assert(document.querySelector('meta[name=description]').getAttribute('content').length>40);
 assert(document.querySelector('main').textContent.length>40,`missing prerendered content ${file}`);
 for(const json of document.querySelectorAll('script[type="application/ld+json"]'))JSON.parse(json.textContent);
 const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length,`duplicate IDs ${file}`);
 const resume=[...document.querySelectorAll('a[download]')];assert(resume.length>0);assert.equal(new Set(resume.map(a=>a.getAttribute('href'))).size,1);assert(resume.every(a=>a.getAttribute('download')==="Amaan's Resume.pdf"&&a.textContent.trim()==="Amaan's Resume"));
 for(const el of document.querySelectorAll('[src],[href],[srcset],meta[property="og:image"]')){
  const urls=[el.getAttribute('src'),el.getAttribute('href'),el.getAttribute('content'),...(el.getAttribute('srcset')||'').split(',').map(v=>v.trim().split(' ')[0])].filter(Boolean);
  for(let url of urls){
   if(url.startsWith('https://amaan-tacc.github.io/portfolio/'))url=url.slice('https://amaan-tacc.github.io'.length);
   if(!url.startsWith('/portfolio/'))continue;
   url=url.slice('/portfolio/'.length).split(/[?#]/)[0];let target=path.join(root,decodeURIComponent(url));if(!path.extname(target))target=path.join(target,'index.html');
   assert(fs.existsSync(target),`${file}: missing ${url}`);links++;
  }
  if(el.tagName==='IMG'){assert(el.hasAttribute('alt'),file);images++;}
 }
}
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');assert.equal(hash(path.join(root,'assets/resumes/Amaans-Resume.pdf')),hash(path.join(root,'assets/resumes/Muhammad_Amaan_Project_Coordinator_Resume.pdf')));
const script=fs.readFileSync(path.join(root,'app.js'),'utf8');assert(!script.includes('resumeDialog'));new vm.Script(script);new vm.Script(fs.readFileSync(path.join(root,'image-assets.js'),'utf8'));new vm.Script(fs.readFileSync(path.join(root,'content.js'),'utf8'));
const boot=fs.readFileSync(path.join(root,'index.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
for(const [saved,device,expected,blocked] of [[null,true,true,false],[null,false,false,false],['light',true,false,false],['dark',false,true,false],['invalid',true,true,false],[null,true,true,true]]){let actual;const context={document:{documentElement:{classList:{toggle(k,v){actual=v;}}},querySelector(){return {}; }},localStorage:{getItem(){if(blocked)throw Error('blocked');return saved;}},window:{matchMedia:()=>({matches:device})}};vm.runInNewContext(boot,context);assert.equal(actual,expected);}
console.log(JSON.stringify({html_pages:canonicals.size,checked_local_references:links,image_elements:images,theme_bootstrap_cases:6,resume:'byte-identical to supplied Project Coordinator PDF',result:'passed'}));
