import styled, { css } from 'styled-components';

const MovieCard = ({
	movie,
	active,
	tabIndex,
	onFocus,
	onMouseEnter,
	cardRef,
}) => {
	return (
		<StyledMovieCard
			ref={cardRef}
			tabIndex={tabIndex}
			$active={active}
			onFocus={onFocus}
			onMouseEnter={onMouseEnter}
		>
			<MoviePoster src={movie.posterUrl} alt={`${movie.title} poster`} />
			<CardContent $active={active}>
				<MovieTitle $active={active}>{movie.title}</MovieTitle>
				<MovieDate $active={active}>{movie.releaseDate}</MovieDate>
				<StarButton type='button' tabIndex={-1}>
					<StarIcon>{active ? '★' : '☆'}</StarIcon>
				</StarButton>
			</CardContent>
		</StyledMovieCard>
	);
};

export default MovieCard;

const StyledMovieCard = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	background: #fff;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(30, 30, 30, 0.04);
	min-height: 250px;
	transition: box-shadow 0.2s, transform 0.2s linear;
	outline: none;

	${({ $active }) =>
		$active &&
		css`
			box-shadow: 0 0 16px #2e82ff;
			transform: scale(1.08);
			z-index: 2;
		`}
`;

const MoviePoster = styled.img`
	width: 100%;
	height: 220px;
	object-fit: cover;
	display: block;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background: #b1b1b1;
`;

const CardContent = styled.div`
	background: ${({ $active }) => ($active ? '#2e82ff' : '#fff')};
	padding: 1em;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex-grow: 1;
	min-height: 30px;
	position: relative;
	transition: background 0.2s;
`;

const MovieTitle = styled.div`
	font-weight: bold;
	font-size: 1em;
	margin-bottom: 0.2em;
	color: ${({ $active }) => ($active ? '#fff' : '#525252')};
	transition: color 0.2s;
`;

const MovieDate = styled.div`
	font-size: 0.8em;
	color: ${({ $active }) => ($active ? '#d1d1d1a1' : '#a3a3a3')};
	transition: color 0.2s;
`;

const StarButton = styled.button`
	position: absolute;
	bottom: 0.7em;
	right: 0.7em;
	background: transparent;
	border: none;
	padding: 0;
	z-index: 3;
	outline: none;
	font-size: 1.1em;
	line-height: 1;
	cursor: pointer;
`;

const StarIcon = styled.span`
	color: #111;
	font-size: 1.1em;
	pointer-events: none;
`;
