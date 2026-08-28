import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initAnalytics, trackPageView } from './lib/analytics'

initAnalytics();
trackPageView(window.location.pathname);

createRoot(document.getElementById("root")!).render(<App />);
