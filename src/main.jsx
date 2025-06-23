import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MovieGallery from './components/MovieGallery';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieGallery />
  </StrictMode>,
)
