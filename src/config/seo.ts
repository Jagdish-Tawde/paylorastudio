import {packages,money} from './pricing';
export const pageMeta:Record<string,{title:string;description:string}>={
 '/':{title:'Websites That Grow Your Business',description:`Beautiful, fast, mobile-friendly websites for businesses. Explore thoughtful design, transparent pricing and development starting at ${money(packages[0].price)}.`},
 '/services':{title:'Website Design & Development Services',description:'Business websites, landing pages, product catalogues, admin dashboards, e-commerce, SEO setup and maintenance, built around your business.'},
 '/portfolio':{title:'Website Concepts & Demo Projects',description:'Explore clearly labelled demo websites for homemade sweets, a restaurant and a product catalogue with an admin dashboard concept.'},
 '/pricing':{title:'Website Packages & Pricing in INR',description:`Compare five website packages starting at ${money(packages[0].price)}. Transparent scope, delivery estimates and optional annual maintenance.`},
 '/get-quote':{title:'Free Website Quotation Calculator',description:'Choose a website package, add optional features and calculate an itemised INR estimate. Copy your quote or enquire through WhatsApp.'},
 '/about':{title:'About Our Web Development Studio',description:'A thoughtful approach to website design and development, with clear scope, accessible experiences and practical ongoing support.'},
 '/contact':{title:'Contact & Website Project Enquiries',description:'Tell us about your business and website goals. Prepare a project enquiry to send through WhatsApp or your email application.'},
 '/privacy-policy':{title:'Privacy Policy',description:'Learn how enquiry forms, the quotation calculator, WhatsApp links and our local automated FAQ assistant handle your information.'},
};
