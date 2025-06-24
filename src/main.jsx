import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MovieGallery from './components/MovieGallery';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		background: #090909;
		font-family: 'Trebouchet', sans-serif; 
	}
`;

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<GlobalStyle />
		<MovieGallery />
	</StrictMode>
);
