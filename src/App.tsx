import {lazy,Suspense} from 'react';
import {Routes,Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import SEO from './components/common/SEO';
import Home from './pages/Home';
const Services=lazy(()=>import('./pages/Services'));const Portfolio=lazy(()=>import('./pages/Portfolio'));const Pricing=lazy(()=>import('./pages/Pricing'));const Quote=lazy(()=>import('./pages/Quote'));const About=lazy(()=>import('./pages/About'));const Contact=lazy(()=>import('./pages/Contact'));const Privacy=lazy(()=>import('./pages/Privacy'));const NotFound=lazy(()=>import('./pages/NotFound'));
export default function App(){return <><SEO/><Suspense fallback={<div className="container loading" role="status">Loading your next chapter…</div>}><Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="services" element={<Services/>}/><Route path="portfolio" element={<Portfolio/>}/><Route path="pricing" element={<Pricing/>}/><Route path="get-quote" element={<Quote/>}/><Route path="about" element={<About/>}/><Route path="contact" element={<Contact/>}/><Route path="privacy-policy" element={<Privacy/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></Suspense></>}
