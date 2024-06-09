interface Movie {
	title: string;
	thumbnail_name: string;
	video_id: string;
	duration: number;
	release_year: number;
	director: string;
}

interface FilterProps {
	yearRange: string;
}

type TSearchMethod = (movieState: Movie[], filterState: string) => Movie[];
type TFilterMethod = (movieState: Movie[], filterState: FilterProps) => Movie[];
