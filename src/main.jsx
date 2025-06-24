import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MovieGallery from './components/MovieGallery';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		background: #cecece;
		font-family: 'Trebouchet', sans-serif; 
	}
`;

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<GlobalStyle />
		<MovieGallery />
	</StrictMode>
);
