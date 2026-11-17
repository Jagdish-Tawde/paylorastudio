import {packages,money} from '../config/pricing';
export const faqs=[
 {question:'How much does a website cost?',keywords:['cost','price','budget','package','much'],answer:`Packages start at ${packages.map(p=>`${money(p.price)}${p.id==='commerce'?'+':''} for ${p.name}`).join(', ')}. Final pricing depends on scope; domain, hosting, fees and taxes are separate.`},
 {question:'How long does development take?',keywords:['long','time','delivery','days','weeks'],answer:'Typical estimates: Starter 2–4 working days, Business Connect 4–7 days, Product Showcase 7–12 days, Admin + Database 2–4 weeks and limited-scope e-commerce 4–6 weeks. Timing depends on agreed scope, content and feedback.'},
 {question:'Can you add WhatsApp?',keywords:['whatsapp','chat'],answer:'Yes. WhatsApp links are included from Business Connect upward. They open a prepared message in WhatsApp; no paid Business API is needed for this flow.'},
 {question:'Do you provide hosting?',keywords:['hosting','domain','ssl'],answer:'We can help with domain connection, SSL and deployment. Domain registration and hosting costs are quoted separately based on the platform and your requirements.'},
 {question:'Can I update products myself?',keywords:['update','products','admin','dashboard'],answer:'The Admin + Database and E-commerce packages include product management. Product Showcase is a static catalogue without an admin panel or database.'},
 {question:'Can you integrate payments?',keywords:['payment','checkout','gateway','commerce'],answer:'Yes. E-commerce includes gateway integration, server-side verification, webhooks and order management within an agreed scope. Provider approval and transaction fees are separate.'},
 {question:'What is SEO?',keywords:['seo','google','ranking','search'],answer:'SEO helps search engines understand your website. We include basic metadata and can scope advanced setup. Rankings and sales cannot be guaranteed.'},
 {question:'Do you provide maintenance?',keywords:['maintenance','support','annual'],answer:'Optional annual maintenance starts at ₹1,999 for Starter, ₹2,999 for Business Connect, ₹3,999 for Product Showcase, ₹7,999 for Admin + Database and ₹11,999+ for E-commerce. We agree on the exact care scope first.'},
];
export interface FaqReply {text:string;fallback:boolean}
export interface AssistantProvider {reply(question:string):Promise<FaqReply>}
export const ruleBasedProvider:AssistantProvider={async reply(question){const q=question.toLowerCase();const match=faqs.find(f=>f.question===question)||faqs.find(f=>f.keywords.some(k=>new RegExp(`\\b${k}\\b`,'i').test(q)));return {text:match?.answer||'That needs a more personal answer. Share your requirements through our contact page or chat with the business on WhatsApp.',fallback:!match}}};
