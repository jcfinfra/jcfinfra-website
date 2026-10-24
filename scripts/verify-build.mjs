import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const dist=path.resolve('dist');
const slugs=['001-cloudflare-waf','002-azure-application-gateway','003-azure-internal-load-balancer'];
const routes=['/','/es/','/cv/','/es/cv/',...slugs.flatMap(s=>[`/labs/${s}/`,`/es/labs/${s}/`])];
const fileFor=p=>path.join(dist,p.endsWith('/')?p+'index.html':p);
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const baseline=JSON.parse(fs.readFileSync('docs/lab-evidence-sha256.json','utf8'));
assert.equal(Object.keys(baseline).length,12,'baseline evidence count');
for(const [file,expected] of Object.entries(baseline)){
 assert.equal(hash(path.join('public',file)),expected,'original evidence changed: '+file);
 assert.equal(hash(path.join(dist,file)),expected,'published evidence changed: '+file);
}
let references=0;const images=new Set();
for(const route of routes){
 const html=fs.readFileSync(fileFor(route),'utf8');
 assert.match(html,new RegExp(`<html[^>]*lang="${route.startsWith('/es/')?'es':'en'}"`));
 assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,route+' H1');
 assert.ok(html.includes(`rel="canonical" href="https://jcfinfra.com${route}"`),route+' canonical');
 for(const lang of ['en','es'])assert.ok(html.includes(`hreflang="${lang}"`),route+' alternate');
 for(const field of ['og:title','og:description','og:image','og:url'])assert.ok(html.includes(`property="${field}"`),route+' '+field);
 assert.ok(html.includes('href="#main"'),route+' skip link');
 const isCv=route==='/cv/'||route==='/es/cv/';
 if(isCv){
  assert.ok(html.includes('name="robots" content="noindex, nofollow"'),route+' noindex');
  assert.ok(!/\+51[\s.-]*9(?:[\s.-]*\d){8}/.test(html),route+' no public phone');
  assert.ok(!/href="tel:/i.test(html),route+' no phone link');
 }else assert.ok(!/name="robots"[^>]*noindex/.test(html),route+' indexability');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=new URL(match[1],'https://jcfinfra.com'+route);
  if(url.origin!=='https://jcfinfra.com')continue;
  const target=fileFor(decodeURIComponent(url.pathname));
  assert.ok(fs.existsSync(target),route+' -> '+url.pathname);
  if(url.hash)assert.ok(fs.readFileSync(target,'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),'anchor '+url.href);
  references++;
 }
 for(const match of html.matchAll(/<img\b[^>]*>/g)){
  const tag=match[0];assert.match(tag,/alt="[^"]+"/);assert.match(tag,/width="[1-9]\d*"/);assert.match(tag,/height="[1-9]\d*"/);
  const src=tag.match(/src="([^"]+)"/)[1];images.add(src);
  assert.equal(hash(fileFor(src)),hash(path.join('public',src)),'image integrity '+src);
 }
}
assert.equal(images.size,12);
assert.deepEqual([...images].sort(),Object.keys(baseline).map(p=>'/'+p).sort(),'evidence inventory');
const sitemap=fs.readFileSync(fileFor('/sitemap.xml'),'utf8');
for(const route of routes){
 const isCv=route==='/cv/'||route==='/es/cv/';
 assert.equal(sitemap.includes(`<loc>https://jcfinfra.com${route}</loc>`),!isCv,'sitemap '+route);
}
const robots=fs.readFileSync(fileFor('/robots.txt'),'utf8');
assert.ok(!/^Disallow:\s*\/(?:es\/)?cv/m.test(robots),'CV crawl allowed for noindex');
console.log(JSON.stringify({routes:routes.length,images:images.size,internalReferences:references,metadata:'pass',anchors:'pass',imageIntegrity:'pass',sitemap:'pass'},null,2));

const cv=fs.readFileSync(fileFor('/es/cv/'),'utf8');
for(const text of ['Capacitación USACH','Oracle Next Education','BMC Helix'])assert.ok(cv.includes(text),'approved CV content: '+text);
for(const [root,cvPath] of [['/','/cv/'],['/es/','/es/cv/']])assert.ok(fs.readFileSync(fileFor(root),'utf8').includes(`href="${cvPath}"`),'CV navigation '+root);

for(const [route,lang,other] of [['/cv/','EN','/es/cv/'],['/es/cv/','ES','/cv/']]){
 const html=fs.readFileSync(fileFor(route),'utf8');
 assert.ok(html.includes(`href="${other}"`),'CV language switch '+route);
 for(const ext of ['pdf','docx']){
  const target='/downloads/Juan_Carlos_Flores_CV_'+lang+'.'+ext;
  assert.ok(html.includes(`href="${target}"`),'download link '+route);
  const bytes=fs.readFileSync(fileFor(target));
  assert.ok(bytes.length>1000,'nonempty CV '+target);
  assert.equal(bytes.subarray(0,ext==='pdf'?5:2).toString(),ext==='pdf'?'%PDF-':'PK','file format '+target);
  assert.equal(hash(fileFor(target)),hash(path.join('public',target)),'download integrity '+target);
 }
}
const cvHashes=JSON.parse(fs.readFileSync('docs/cv-downloads-sha256.json','utf8'));
assert.equal(Object.keys(cvHashes).length,4,'CV manifest count');
for(const [name,expected] of Object.entries(cvHashes))assert.equal(hash(fileFor('/downloads/'+name)),expected,'validated CV changed '+name);
const headers=fs.readFileSync(fileFor('/_headers'),'utf8');
for(const lang of ['ES','EN'])assert.ok(headers.includes('/downloads/Juan_Carlos_Flores_CV_'+lang+'.docx'),'Word download header '+lang);
for(const lang of ['ES','EN'])assert.ok(headers.includes('/downloads/Juan_Carlos_Flores_CV_'+lang+'.pdf\n  X-Robots-Tag: noindex, nofollow'),'PDF noindex '+lang);
console.log('Bilingual CV navigation and four downloadable artifacts: pass');
