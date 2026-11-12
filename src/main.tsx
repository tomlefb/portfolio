import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/compositions.css';
import './styles/diagrams.css';
import './styles/project.css';
import './styles/home.css';
import './styles/secondary.css';
import './styles/parcours.css';
import './styles/footer.css';
import './styles/wide.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
