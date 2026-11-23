import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {parseHTML, Event} from 'linkedom';
import * as cssTree from 'css-tree';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../docs');
const origin='https://amaan-tacc.github.io';
const base='/portfolio/';
const publicRoot='https://amaanity.com/';
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
for(const name of ['style.css','fonts.css'])cssTree.parse(read(name),{onParseError(error){throw new Error(`${name}: ${error.message}`);}});
if(!read('style.css').trimStart().startsWith(':root{'))throw new Error('The light-mode palette must be the first valid CSS rule.');
const dataContext={window:{}};vm.runInNewContext(read('content.js'),dataContext);
const C=dataContext.window.PORTFOLIO;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bootstrap=read('index.html').match(/<script>([\s\S]*?)<\/script>/)[1];
const skeleton='<!doctype html><html lang="en"><head><meta name="theme-color" content="#ffffff"></head><body><header id="header"></header><main id="main"></main><footer id="footer"></footer></body></html>';
const person={'@type':'Person','@id':publicRoot+'#amaan',name:'Muhammad Amaan',url:publicRoot+'about/',jobTitle:'Founder and Creative Lead',sameAs:[C.linkedin,C.github,'https://www.instagram.com/amaanity._/reels/']};
const studio={'@type':'Organization','@id':publicRoot+'#studio',name:'Amaanity',url:publicRoot,email:C.email,logo:publicRoot+'assets/amaanity-logo-original.webp',founder:{'@id':person['@id']},sameAs:[C.github,'https://www.instagram.com/amaanity._/reels/'],description:'Independent design studio for brand identity, books and educational design, print design, game art and illustration.'};
const pages=[
 {path:'',title:'Amaanity — Design Studio for Brands, Books & Game Art',description:'Amaanity is an independent design studio for brand identity, books and educational materials, print design, game art and illustration. Explore our work and start a project.'},
 {path:'work/',title:'Selected Design & Project Work — Amaanity',description:'Explore ten projects by Muhammad Amaan, from identity systems and educational publishing to café menus, technical guides and QuickGrade product coordination.'},
 {path:'about/',title:'About Amaanity — Muhammad Amaan & the Design Team',description:'Meet Muhammad Amaan, founder and creative lead at Amaanity. Learn how our design team handles briefs, creative direction, reviews and delivery.'},
 {path:'contact/',title:'Start a Design Project — Contact Amaanity',description:'Discuss branding, books, educational materials, print design, game art or illustration with Amaanity. Email amaan@amaanity.com with your brief and timeline.'},
 {path:'services/',title:'Design Services — Branding, Books, Print & Game Art | Amaanity',description:'Explore Amaanity’s design services: brand identity, books and educational design, print design, 2D and 3D game art, and illustration.'},
 ...C.services.map(s=>({path:'services/'+s.id+'/',title:s.title+' Services | Amaanity Design Studio',description:s.description,service:s})),
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
 const context={Event,window:win,document,location:url,URLSearchParams,NodeFilter:{SHOW_TEXT:4},history:{replaceState(){}},navigator:{},innerHeight:800,scrollY:0,requestAnimationFrame(){},matchMedia:()=>({matches:false,addEventListener(){},addListener(){}}),localStorage:{getItem(){return 'off';},setItem(){}}};
 vm.createContext(context);
 for(const script of ['image-assets.js','content.js','app.js'])vm.runInContext(read(script),context,{filename:script});
 const canonical=publicRoot+page.path;
 const preview=publicRoot+'assets/seo/'+(page.project?page.project.id:'amaanity')+'.jpg';
 const json={'@context':'https://schema.org','@graph':[person,{'@type':'WebSite','@id':origin+base+'#website',url:origin+base,name:'Amaanity',inLanguage:'en',publisher:{'@id':person['@id']}},{'@type':page.project?'CreativeWork':page.path==='about/'?'AboutPage':page.path==='contact/'?'ContactPage':'WebPage','@id':canonical+'#page',url:canonical,name:page.title,description:page.description,inLanguage:'en',isPartOf:{'@id':origin+base+'#website'},...(page.project?{contributor:{'@id':person['@id']},image:preview}:{about:{'@id':person['@id']}})}]};
 // All mirrors identify the Hostinger domain as the primary website.
 json['@graph'].push(studio);
 const website=json['@graph'].find(n=>n['@type']==='WebSite');website['@id']=publicRoot+'#website';website.url=publicRoot;website.publisher={'@id':studio['@id']};
 const pageNode=json['@graph'].find(n=>n['@id']===canonical+'#page');pageNode.isPartOf={'@id':website['@id']};
 if(!page.project)pageNode.about={'@id':studio['@id']};
 if(page.service){pageNode.mainEntity={'@id':canonical+'#service'};json['@graph'].push({'@type':'Service','@id':canonical+'#service',name:page.service.title,serviceType:page.service.title,description:page.description,url:canonical,provider:{'@id':studio['@id']}});}
 if(page.path==='services/')pageNode.mainEntity={'@type':'ItemList',itemListElement:C.services.map((s,i)=>({'@type':'ListItem',position:i+1,name:s.title,url:publicRoot+'services/'+s.id+'/'}))};
 if(page.path&&!page.notFound&&!page.legacy){const crumbs=[['Home',publicRoot]];if(page.project)crumbs.push(['Work',publicRoot+'work/']);if(page.service)crumbs.push(['Services',publicRoot+'services/']);crumbs.push([page.project?.title||page.service?.title||page.path.split('/')[0],canonical]);json['@graph'].push({'@type':'BreadcrumbList',itemListElement:crumbs.map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item}))});}
 const head=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"><meta name="theme-color" content="#ffffff"><meta name="author" content="Muhammad Amaan"><meta name="robots" content="${(page.notFound||page.legacy)?'noindex,follow':'index,follow,max-image-preview:large'}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Amaanity"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${preview}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escape(page.project?page.project.title+' — design presentation':'Amaanity — Muhammad Amaan, design and creative direction')}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(page.title)}"><meta name="twitter:description" content="${escape(page.description)}"><meta name="twitter:image" content="${preview}"><link rel="icon" type="image/svg+xml" href="${base}assets/favicon-round-v4.svg"><link rel="alternate icon" type="image/png" sizes="32x32" href="${base}assets/favicon-round-v4-32.png"><link rel="apple-touch-icon" sizes="180x180" href="${base}assets/favicon-round-v4-180.png"><script>${bootstrap}</script><link rel="preload" href="${base}assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="${base}assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${base}fonts.css?v=22"><link rel="stylesheet" href="${base}style.css?v=22"><script src="${base}image-assets.js?v=22" defer></script><script src="${base}content.js?v=22" defer></script><script src="${base}app.js?v=22" defer></script><script type="application/ld+json">${JSON.stringify(json).replaceAll('<','\\u003c')}</script>`;
 const file=page.path.endsWith('.html')?page.path:page.path+'index.html';
 const target=path.join(root,file);fs.mkdirSync(path.dirname(target),{recursive:true});
 const markup='<!doctype html><html lang="en"><head>'+head+'</head><body><a class="skip" href="#main">Skip to content</a>'+['header','main','footer'].map(id=>document.getElementById(id).outerHTML).join('')+'<noscript><style>.theme,.menu,.motion-switch,.filters,.gallery-selector-controls,.screen-tabs,.gallery-hint{display:none!important}#header nav{display:flex!important;position:static;flex-wrap:wrap}.nav-wrap{height:auto;min-height:94px;flex-wrap:wrap;padding-top:12px;padding-bottom:12px}.screen-explorer [role="tabpanel"][hidden]{display:block!important;margin-top:24px}</style></noscript></body></html>';
 fs.writeFileSync(target,markup);
}
const urls=pages.filter(p=>!p.legacy&&!p.notFound).map(p=>publicRoot+p.path);
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(url=>'<url><loc>'+url+'</loc></url>').join('')+'</urlset>');
// A project subdirectory cannot control the host-level robots.txt; the sitemap is linked here and in the documentation.
fs.writeFileSync(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+publicRoot+'sitemap.xml\n');
console.log(`Rendered ${pages.length} complete HTML documents; sitemap contains ${urls.length} canonical pages.`);
