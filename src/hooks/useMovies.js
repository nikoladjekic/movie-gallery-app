import { useMemo } from 'react';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';
const PAGE_SIZE = 30;

const getImdbRating = (ratings) => {
	return ratings.find((rating) => rating.id === 'imdb')?.rating || 0;
};

const useMovies = (movies) => {
	const sortedMovies = useMemo(() => {
		if (!movies || movies.length === 0) return [];

		const uniqueMovies = movies.filter(
			(movie, index, arr) =>
				index === arr.findIndex((m) => m.id === movie.id)
		);

		const sorted = uniqueMovies.sort((a, b) => {
			return getImdbRating(b.ratings) - getImdbRating(a.ratings);
		});

		return sorted.slice(0, PAGE_SIZE).map((movie) => ({
			id: movie.id,
			title: movie.title,
			releaseDate: movie.release_date,
			posterUrl: `${BASE_URL}${movie.poster_path}`,
		}));
	}, [movies]);

	return sortedMovies;
};

export default useMovies;
