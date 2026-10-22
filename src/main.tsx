import { createRoot } from 'react-dom/client';
import '@fontsource-variable/onest';
import '@fontsource/unbounded/500.css';
import '@fontsource/unbounded/600.css';
import '@fontsource/unbounded/700.css';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
