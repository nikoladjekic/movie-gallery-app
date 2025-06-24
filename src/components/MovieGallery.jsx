import useMovies from '../hooks/useMovies';
import moviesData from '../assets/movies.json';

const MovieGallery = () => {
	const movies = useMovies(moviesData);

	return (
		<ul>
			{movies.map((movie) => (
				<li key={movie.id}>
					<h2>{movie.title}</h2>
					<p>IMDb Rating: {movie.imdbRating}</p>
					<p>Release Date: {movie.releaseDate}</p>
					<img src={movie.posterUrl} alt={movie.title} />
				</li>
			))}
		</ul>
	);
};

export default MovieGallery;
