const env = import.meta.env;
const validUrl = (value: string | undefined) => { try { const u = new URL(value || ''); return /^https?:$/.test(u.protocol) ? u.href.replace(/\/$/, '') : ''; } catch { return ''; } };
export const site = {
  name: env.VITE_BRAND_NAME || 'Paylora Studio',
  url: validUrl(env.VITE_SITE_URL),
  whatsapp: (env.VITE_WHATSAPP_NUMBER || '').replace(/[\s+()-]/g, ''),
  email: env.VITE_BUSINESS_EMAIL || '', location: env.VITE_BUSINESS_LOCATION || '',
  socials: [{ name: 'Instagram', url: validUrl(env.VITE_INSTAGRAM_URL) }, { name: 'Facebook', url: validUrl(env.VITE_FACEBOOK_URL) }].filter(x => x.url),
};
export const routes = ['/', '/services', '/portfolio', '/pricing', '/get-quote', '/about', '/contact', '/privacy-policy'];
