import {Link} from 'react-router-dom';
import {ArrowUpRight,MessageCircle,ArrowRight} from 'lucide-react';
import {site} from '../../config/site';
import {whatsappUrl} from '../../utils/whatsapp';
import type {ReactNode} from 'react';
export function Button({to,children,secondary=false}:{to:string;children:ReactNode;secondary?:boolean}) {return <Link className={`button ${secondary?'secondary':''}`} to={to}>{children}<ArrowUpRight size={17}/></Link>}
export function WhatsApp({message,label='Chat on WhatsApp'}:{message?:string;label?:string}) {const url=whatsappUrl(message);return url?<a className="button secondary" href={url} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{label}</a>:<span className="unconfigured"><button className="button secondary" disabled><MessageCircle size={17}/>{label}</button><small>WhatsApp contact is not configured yet.</small></span>}
export function Heading({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}) {return <div className="section-heading"><div className="eyebrow"><span/>{eyebrow}</div><h2>{title.replace(/\\n/g,'\n')}</h2>{description&&<p>{description}</p>}</div>}
export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description:string}) {return <section className="page-intro container"><div className="eyebrow"><span/>{eyebrow}</div><h1>{title}</h1><p>{description}</p></section>}
export function CTA(){return <section className="container cta"><div><div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div><h2>Ready to Take Your<br/>Business Online?</h2><p>Let’s build something that feels right for your business.</p></div><div className="cta-actions"><Button to="/get-quote">Get a Free Quote</Button><WhatsApp/></div><span className="cta-orb" aria-hidden="true"/></section>}
export function TextLink({to,children}:{to:string;children:ReactNode}) {return <Link className="text-link" to={to}>{children}<ArrowRight size={16}/></Link>}
export function Brand(){return <Link to="/" className="brand" aria-label={`${site.name} homepage`}><img className="brand-logo" src="/brand/paylora-mark.svg" alt="" width={44} height={44}/><span className="brand-wordmark">{site.name.replace(/ Studio$/i,'')}<b>STUDIO</b></span></Link>}
