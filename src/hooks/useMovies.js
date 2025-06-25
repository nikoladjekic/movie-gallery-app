import { useMemo, useState } from 'react';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';
const PAGE_SIZE = 30;

const getImdbRating = (ratings) => {
	return ratings.find((rating) => rating.id === 'imdb')?.rating || 0;
};

const useMovies = (movies) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [loadedMovies, setLoadedMovies] = useState([]);
	const [totalMovies, setTotalMovies] = useState(null);

	const sortedMovies = useMemo(() => {
		if (!movies || movies.length === 0) return [];

		const uniqueMovies = movies.filter(
			(movie, index, arr) =>
				index === arr.findIndex((m) => m.id === movie.id)
		);

		const sorted = uniqueMovies.sort((a, b) => {
			return getImdbRating(b.ratings) - getImdbRating(a.ratings);
		});

		setTotalMovies(sorted.length);

		return sorted;
	}, [movies]);

	const loadMoreMovies = () => {
		const startIndex = currentPage * PAGE_SIZE;
		const endIndex = startIndex + PAGE_SIZE;

		const newMovies = sortedMovies
			.slice(startIndex, endIndex)
			.map((movie) => ({
				id: movie.id,
				title: movie.title,
				releaseDate: movie.release_date,
				posterUrl: `${BASE_URL}${movie.poster_path}`,
			}));

		setLoadedMovies((prevMovies) => [...prevMovies, ...newMovies]);
		setCurrentPage((prevPage) => prevPage + 1);
	};

	if (currentPage === 0) {
		loadMoreMovies();
	}

	return { loadedMovies, totalMovies, loadMoreMovies };
};

export default useMovies;
