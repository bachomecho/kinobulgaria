export type MovieSite = "youtube" | "dailymotion" | "vk" | "gledambg";
export interface Movie {
	title: string;
	thumbnail_name: string;
	video_id: string;
	site: MovieSite;
	video_id_1: string;
	site_1: MovieSite;
	gledambg_video_id: string;
	multi_part: 0 | 1;
	duration: number;
	release_year: number;
	genre: string;
	director: string;
	plot: string;
	modalOpenClosedMethod: (e: any) => void;
	isInWatchlist: boolean;
}
type TInferPropertyTypes<T> = T extends keyof Movie ? T : never;
export type TIdAndSites<T, Keys extends keyof T = keyof T> = {
	[K in Keys extends `${"video" | "site" | "gledam"}${infer _}`
		? Keys
		: never]: Movie[TInferPropertyTypes<K>];
};
export type MovieInfo = {
	site: MovieSite;
	video_id: string;
};
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

export interface IApiUserData {
	loginStatus: boolean;
	watchlist: string;
	username: string;
	registrationDate: Date;
}
