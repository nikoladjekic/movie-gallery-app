import useMovies from '../hooks/useMovies';
import moviesData from '../assets/movies.json';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import { useEffect, useRef, useState } from 'react';

const MovieGallery = () => {
	const { loadedMovies, totalMovies, loadMoreMovies } = useMovies(moviesData);
	const [favourites, setFavourites] = useState(new Set());
	const [focusedIndex, setFocusedIndex] = useState(0);
	const containerRef = useRef();
	const itemRefs = useRef([]);
	const columns = 6;

	useEffect(() => {
		if (itemRefs.current[focusedIndex]) {
			itemRefs.current[focusedIndex].focus();
		}
	}, [focusedIndex]);

	const handleKeyDown = (e) => {
		let newIndex = focusedIndex;

		switch (e.key) {
			case 'ArrowRight':
				if (focusedIndex + 1 < movies.length) {
					newIndex = focusedIndex + 1;
				}
				break;
			case 'ArrowLeft':
				if (focusedIndex - 1 >= 0) {
					newIndex = focusedIndex - 1;
				}
				break;
			case 'ArrowDown':
				if (focusedIndex + columns < movies.length) {
					newIndex = focusedIndex + columns;
				}
				break;
			case 'ArrowUp':
				if (focusedIndex - columns >= 0) {
					newIndex = focusedIndex - columns;
				}
				break;
			case 'Enter':
			case ' ':
				toggleFavourite(movies[newIndex].id);
				e.preventDefault();
				return;
			default:
				return;
		}

		if (newIndex !== focusedIndex) {
			setFocusedIndex(newIndex);
			e.preventDefault();
		}
	};

	const toggleFavourite = (movieId) => {
		setFavourites((prev) => {
			const newFavourites = new Set(prev);
			if (newFavourites.has(movieId)) {
				newFavourites.delete(movieId);
			} else {
				newFavourites.add(movieId);
			}
			return newFavourites;
		});
	};

	return (
		<>
			<GalleryContainer
				ref={containerRef}
				tabIndex={0}
				onKeyDown={handleKeyDown}
			>
				{loadedMovies.map((movie, index) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						active={focusedIndex === index}
						tabIndex={focusedIndex === index ? 0 : -1}
						onFocus={() => setFocusedIndex(index)}
						onMouseEnter={() => setFocusedIndex(index)}
						cardRef={(el) => (itemRefs.current[index] = el)}
						inFavourites={favourites.has(movie.id)}
						onToggleFavourite={() => toggleFavourite(movie.id)}
					/>
				))}
			</GalleryContainer>

			{loadedMovies.length < totalMovies && (
				<button onClick={loadMoreMovies}>Load More</button>
			)}
		</>
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
