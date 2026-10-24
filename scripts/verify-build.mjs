import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const dist=path.resolve('dist');
const slugs=['001-cloudflare-waf','002-azure-application-gateway','003-azure-internal-load-balancer'];
const routes=['/','/es/','/es/cv/',...slugs.flatMap(s=>[`/labs/${s}/`,`/es/labs/${s}/`])];
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
 for(const lang of (route==='/es/cv/'?[]:['en','es']))assert.ok(html.includes(`hreflang="${lang}"`),route+' alternate');
 for(const field of ['og:title','og:description','og:image','og:url'])assert.ok(html.includes(`property="${field}"`),route+' '+field);
 assert.ok(html.includes('href="#main"'),route+' skip link');
 assert.ok(!/name="robots"[^>]*noindex/.test(html),route+' indexability');
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
for(const route of routes)assert.ok(sitemap.includes(`<loc>https://jcfinfra.com${route}</loc>`),'sitemap '+route);
console.log(JSON.stringify({routes:routes.length,images:images.size,internalReferences:references,metadata:'pass',anchors:'pass',imageIntegrity:'pass',sitemap:'pass'},null,2));

const cv=fs.readFileSync(fileFor('/es/cv/'),'utf8');
for(const text of ['Capacitación USACH','Oracle Next Education','BMC Helix'])assert.ok(cv.includes(text),'approved CV content: '+text);
for(const root of ['/','/es/'])assert.ok(fs.readFileSync(fileFor(root),'utf8').includes('href="/es/cv/"'),'CV navigation '+root);
