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

type TLoginResponseData = {
	credentials: {
		userUuid: string;
		username: string | boolean;
		password: string | boolean;
	};
};

type TSearchMethod = (movieState: Movie[], filterState: string) => Movie[];
type TFilterMethod = (movieState: Movie[], filterState: FilterProps) => Movie[];
