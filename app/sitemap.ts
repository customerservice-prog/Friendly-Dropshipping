import type {MetadataRoute} from 'next';
import {categories,products} from '@/lib/catalog';
const base='https://eventequipmentdirect.com';
export default function sitemap():MetadataRoute.Sitemap{
 const now=new Date();
 return [
  {url:base,lastModified:now,changeFrequency:'weekly',priority:1},
  {url:`${base}/quote`,lastModified:now,changeFrequency:'monthly',priority:.7},
  {url:`${base}/starter-packages`,lastModified:now,changeFrequency:'monthly',priority:.8},
  ...categories.map(c=>({url:`${base}/category/${c.slug}`,lastModified:now,changeFrequency:'weekly' as const,priority:.85})),
  ...products.map(p=>({url:`${base}/product/${p.slug}`,lastModified:now,changeFrequency:'weekly' as const,priority:.8}))
 ];
}
