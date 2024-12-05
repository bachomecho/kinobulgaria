interface Movie {
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
interface IWatchlistLengthState {
	watchlistLength: number;
	setWatchlistLength: any;
}

interface FilterProps {
	yearRange: string;
	duration: string;
	genre: string;
}

interface HeaderProps {
	showSearch: boolean;
	setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

type TWatchlist = Pick<
	Movie,
	"title" | "thumbnail_name" | "video_id" | "release_year"
>;

type TSearchMethod = (movieState: Movie[], filterState: string) => Movie[];
type TFilterMethod = (movieState: Movie[], filterState: FilterProps) => Movie[];
