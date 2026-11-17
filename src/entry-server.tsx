import {renderToString} from 'react-dom/server';
import {StaticRouter,Routes,Route} from 'react-router-dom';
import {MotionConfig} from 'motion/react';
import Layout from './components/layout/Layout';
import SEO from './components/common/SEO';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Quote from './pages/Quote';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import {site,routes} from './config/site';
export {site,routes};
export function render(path:string){return renderToString(<StaticRouter location={path}><MotionConfig reducedMotion="always"><SEO/><Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="services" element={<Services/>}/><Route path="portfolio" element={<Portfolio/>}/><Route path="pricing" element={<Pricing/>}/><Route path="get-quote" element={<Quote/>}/><Route path="about" element={<About/>}/><Route path="contact" element={<Contact/>}/><Route path="privacy-policy" element={<Privacy/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></MotionConfig></StaticRouter>)}
