export interface Movie {
	title: string;
	thumbnail_name: string;
	video_id: string;
	multi_part: 0 | 1;
	duration: number;
	release_year: number;
	genre: string;
	director: string;
	plot: string;
	modalOpenClosedMethod: (e: any) => void;
	isInWatchlist: boolean;
}
export interface IWatchlistLengthState {
	watchlistLength: number;
	setWatchlistLength: any;
}
export interface IWatchlistResponse {
	error?: string;
	watchlist?: string;
	loginStatus: boolean;
}

export interface FilterProps {
	yearRange: string;
	duration: string;
	genre: string;
}

export interface HeaderProps {
	showSearch: boolean;
	setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

export type TWatchlist = Pick<
	Movie,
	"title" | "thumbnail_name" | "video_id" | "release_year"
>;

export type TSearchMethod = (
	movieState: Movie[],
	filterState: string
) => Movie[];
export type TFilterMethod = (
	movieState: Movie[],
	filterState: FilterProps
) => Movie[];
