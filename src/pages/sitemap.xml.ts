export function GET(){
 const slugs=['001-cloudflare-waf','002-azure-application-gateway','003-azure-internal-load-balancer'];
 const routes=['/','/es/',...slugs.flatMap(slug=>[`/labs/${slug}/`,`/es/labs/${slug}/`])];
 return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(route=>`<url><loc>https://jcfinfra.com${route}</loc></url>`).join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});
}
