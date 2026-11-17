import { addons, additionalPagePrice, packages, money } from '../config/pricing';
export interface QuoteSelection { packageId:string; pages:number; addonIds:string[]; maintenance:boolean; }
export interface Customer { name:string; email:string; phone:string; business:string; category:string; requirements:string; }
export function calculateQuote(s:QuoteSelection) {
 const pkg = packages.find(p=>p.id===s.packageId) || packages[0];
 const pages = Math.max(0,Math.min(50,Math.floor(s.pages)||0));
 const selected = addons.filter(a=>s.addonIds.includes(a.id));
 const oneTime = pkg.price + pages*additionalPagePrice + selected.reduce((n,a)=>n+a.price,0);
 const annual = s.maintenance ? pkg.annual : 0;
 return {pkg,pages,selected,oneTime,annual,total:oneTime+annual};
}
export function formatQuote(s:QuoteSelection,c:Customer) {
 const q=calculateQuote(s);
 return `Website quotation enquiry\n\nCustomer: ${c.name}\nEmail: ${c.email}\nPhone: ${c.phone}\nBusiness: ${c.business}\nBusiness type: ${c.category}\nPackage: ${q.pkg.name} — ${money(q.pkg.price)}${q.pkg.id==='commerce'?'+':''}\nAdditional pages: ${q.pages} — ${money(q.pages*additionalPagePrice)}\n${q.selected.map(a=>`${a.name}: ${money(a.price)}`).join('\n') || 'Add-ons: None'}\nOne-time development estimate: ${money(q.oneTime)}\nAnnual maintenance: ${s.maintenance?money(q.annual)+(q.pkg.id==='commerce'?'+':'')+' / year':'Not selected'}\nTotal first-year estimate: ${money(q.total)}${q.pkg.id==='commerce'?'+':''}\nAdditional requirements: ${c.requirements||'None provided'}\n\nIndicative estimate only. Final quote depends on scope. Domain, hosting, third-party fees and taxes are separate.`;
}
