import {createServer} from 'vite';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const server=await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom',mode:'production'});
try {
 const {render,site,routes}=await server.ssrLoadModule('/src/entry-server.tsx');
 const template=await readFile('dist/index.html','utf8');
 for(const route of [...routes,'/404']) {
  let html=render(route);
  const tags=[];
  html=html.replace(/<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g,tag=>{tags.push(tag.replace(/^(<\w+)/,'$1 data-prerender="true"'));return ''});
  const page=template.replace(/<title>[\s\S]*?<\/title>/,'').replace('</head>',tags.join('')+'</head>').replace('<div id="root"></div>',`<div id="root">${html}</div>`);
  const dir=route==='/'?'dist':`dist${route}`;
  await mkdir(dir,{recursive:true}); await writeFile(`${dir}/index.html`,page);
  if(route==='/404')await writeFile('dist/404.html',page);
 }
 const url=site.url;
 await writeFile('dist/robots.txt',`User-agent: *\n${url?'Allow: /\nSitemap: '+url+'/sitemap.xml':'Disallow: /'}\n`);
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
 await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${url?routes.map(r=>`<url><loc>${escape(url+r)}</loc></url>`).join(''):''}</urlset>`);
 console.log(`Prerendered ${routes.length} public routes and 404. ${url?'Production SEO configured.':'Set VITE_SITE_URL to enable indexing and canonical URLs.'}`);
} finally {await server.close()}
