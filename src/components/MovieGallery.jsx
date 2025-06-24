import useMovies from '../hooks/useMovies';
import moviesData from '../assets/movies.json';
import styled from 'styled-components';
import MovieCard from './MovieCard';

const MovieGallery = () => {
	const movies = useMovies(moviesData);

	return (
		<GalleryContainer>
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</GalleryContainer>
	);
};

export default MovieGallery;

const GalleryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 1rem;
	outline: none;
	padding: 1rem;
	box-sizing: border-box;
	max-width: 1200px;
	margin: 0 auto;
	background: transparent;
`;
