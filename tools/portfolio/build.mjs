import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {parseHTML} from 'linkedom';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../docs');
const origin='https://amaan-tacc.github.io';
const base='/portfolio/';
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const dataContext={window:{}};vm.runInNewContext(read('content.js'),dataContext);
const C=dataContext.window.PORTFOLIO;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bootstrap=read('index.html').match(/<script>([\s\S]*?)<\/script>/)[1];
const skeleton='<!doctype html><html lang="en"><head><meta name="theme-color" content="#ffffff"></head><body><header id="header"></header><main id="main"></main><footer id="footer"></footer></body></html>';
const person={'@type':'Person','@id':origin+base+'#amaan',name:'Muhammad Amaan',alternateName:'Amaanity',url:origin+base,jobTitle:['Designer','Creative lead','Project coordinator'],sameAs:[C.linkedin,'https://www.instagram.com/amaanity._/reels/']};
const pages=[
 {path:'',title:'Muhammad Amaan — Creative Lead & Project Coordinator',description:'Explore Muhammad Amaan’s portfolio: brand identities, educational publishing, technical communication and digital project coordination. Meet the person behind Amaanity.'},
 {path:'work/',title:'Selected Design & Project Work — Amaanity',description:'Explore ten projects by Muhammad Amaan, from identity systems and educational publishing to café menus, technical guides and QuickGrade product coordination.'},
 {path:'about/',title:'About Muhammad Amaan — Designer & Creative Lead | Amaanity',description:'Meet Muhammad Amaan: designer, creative lead and project coordinator. Discover his design experience, team responsibilities, process and technology content.'},
 {path:'contact/',title:'Contact Muhammad Amaan — Projects & Opportunities | Amaanity',description:'Contact Muhammad Amaan for freelance design, creative lead and project coordinator opportunities. Email amaanityofficial@gmail.com or connect on LinkedIn.'},
 ...C.projects.map(p=>({path:'projects/'+p.id+'/',title:p.title+' — '+p.type+' | Amaanity',description:p.caseStudy.summary,project:p})),
 {path:'project/',title:'Portfolio Project — Amaanity',description:'Explore Amaanity’s selected projects and the design decisions, responsibilities and people behind the work.',legacy:true},
 {path:'404.html',title:'Page Not Found — Amaanity',description:'This page could not be found. Explore Muhammad Amaan’s portfolio or get in touch.',notFound:true}
];
for(const page of pages){
 const {document,HTMLElement}=parseHTML(skeleton);
 HTMLElement.prototype.getAnimations=()=>[];
 HTMLElement.prototype.animate=()=>({cancel(){}});
 const url=new URL(origin+base+page.path);
 const win={document,addEventListener(){},scrollTo(){}};
 const context={window:win,document,location:url,URLSearchParams,NodeFilter:{SHOW_TEXT:4},history:{replaceState(){}},navigator:{},innerHeight:800,scrollY:0,requestAnimationFrame(){},matchMedia:()=>({matches:false,addEventListener(){},addListener(){}}),localStorage:{getItem(){return 'off';},setItem(){}}};
 vm.createContext(context);
 for(const script of ['image-assets.js','content.js','app.js'])vm.runInContext(read(script),context,{filename:script});
 const canonical=origin+base+page.path;
 const preview=origin+base+'assets/seo/'+(page.project?page.project.id:'amaanity')+'.jpg';
 const json={'@context':'https://schema.org','@graph':[person,{'@type':'WebSite','@id':origin+base+'#website',url:origin+base,name:'Amaanity',inLanguage:'en',publisher:{'@id':person['@id']}},{'@type':page.project?'CreativeWork':page.path==='about/'?'AboutPage':page.path==='contact/'?'ContactPage':'WebPage','@id':canonical+'#page',url:canonical,name:page.title,description:page.description,inLanguage:'en',isPartOf:{'@id':origin+base+'#website'},...(page.project?{contributor:{'@id':person['@id']},image:preview}:{about:{'@id':person['@id']}})}]};
 if(page.project)json['@graph'].push({'@type':'BreadcrumbList',itemListElement:[['Home',origin+base],['Work',origin+base+'work/'],[page.project.title,canonical]].map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item}))});
 const head=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"><meta name="theme-color" content="#ffffff"><meta name="author" content="Muhammad Amaan"><meta name="robots" content="${page.notFound?'noindex,follow':'index,follow,max-image-preview:large'}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Amaanity"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${preview}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escape(page.project?page.project.title+' — design presentation':'Amaanity — Muhammad Amaan, design and creative direction')}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(page.title)}"><meta name="twitter:description" content="${escape(page.description)}"><meta name="twitter:image" content="${preview}"><link rel="icon" type="image/svg+xml" href="${base}assets/favicon-round-v4.svg"><link rel="alternate icon" type="image/png" sizes="32x32" href="${base}assets/favicon-round-v4-32.png"><link rel="apple-touch-icon" sizes="180x180" href="${base}assets/favicon-round-v4-180.png"><script>${bootstrap}</script><link rel="preload" href="${base}assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="${base}assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${base}fonts.css?v=16"><link rel="stylesheet" href="${base}style.css?v=16"><script src="${base}image-assets.js?v=16" defer></script><script src="${base}content.js?v=16" defer></script><script src="${base}app.js?v=16" defer></script><script type="application/ld+json">${JSON.stringify(json).replaceAll('<','\\u003c')}</script>`;
 const file=page.path.endsWith('.html')?page.path:page.path+'index.html';
 const target=path.join(root,file);fs.mkdirSync(path.dirname(target),{recursive:true});
 const markup='<!doctype html><html lang="en"><head>'+head+'</head><body><a class="skip" href="#main">Skip to content</a>'+['header','main','footer'].map(id=>document.getElementById(id).outerHTML).join('')+'<noscript><style>.theme,.menu,.motion-switch,.filters,.gallery-selector-controls,.screen-tabs,.gallery-hint{display:none!important}#header nav{display:flex!important;position:static;flex-wrap:wrap}.nav-wrap{height:auto;min-height:94px;flex-wrap:wrap;padding-top:12px;padding-bottom:12px}.screen-explorer [role="tabpanel"][hidden]{display:block!important;margin-top:24px}</style></noscript></body></html>';
 fs.writeFileSync(target,markup);
}
const urls=pages.filter(p=>!p.legacy&&!p.notFound).map(p=>origin+base+p.path);
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(url=>'<url><loc>'+url+'</loc></url>').join('')+'</urlset>');
// A project subdirectory cannot control the host-level robots.txt; the sitemap is linked here and in the documentation.
fs.writeFileSync(path.join(root,'robots.txt'),'User-agent: *\nAllow: /portfolio/\nSitemap: '+origin+base+'sitemap.xml\n');
console.log(`Rendered ${pages.length} complete HTML documents; sitemap contains ${urls.length} canonical pages.`);
