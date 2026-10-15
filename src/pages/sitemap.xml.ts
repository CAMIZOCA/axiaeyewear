import type { APIRoute } from 'astro';
import { products, categories } from '../data/catalog';
export const GET: APIRoute = () => {
  const base='https://axiaeyewear.com';
  const paths=['/','/axia/','/contacto/','/preguntas-frecuentes/','/privacidad/','/terminos/',...Object.keys(categories).map(x=>`/colecciones/${x}/`),...products.map(x=>`/productos/${x.slug}/`)];
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${base}${p}</loc></url>`).join('')}</urlset>`;
  return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
