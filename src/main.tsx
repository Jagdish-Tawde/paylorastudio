import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {MotionConfig} from 'motion/react';
import App from './App';
import './index.css';
document.querySelectorAll('[data-prerender]').forEach(node=>node.remove());
createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><MotionConfig reducedMotion="user"><App/></MotionConfig></BrowserRouter></StrictMode>);
