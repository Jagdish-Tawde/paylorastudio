import {site} from '../config/site';
export const whatsappConfigured = /^\d{8,15}$/.test(site.whatsapp);
export const whatsappMessage = `Hello ${site.name}! I'd like to discuss a website for my business.`;
export function whatsappUrl(message=whatsappMessage,number=site.whatsapp) { return /^\d{8,15}$/.test(number) ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null; }
