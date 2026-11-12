import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScrollManager } from './components/layout/ScrollManager';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OtherProjectsPage } from './pages/OtherProjectsPage';
import { ParcoursPage } from './pages/ParcoursPage';
import { ProjectPage } from './pages/ProjectPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projets/:id" element={<ProjectPage />} />
        <Route path="/autres-projets" element={<OtherProjectsPage />} />
        <Route path="/parcours" element={<ParcoursPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
