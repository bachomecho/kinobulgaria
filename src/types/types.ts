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

type TFilterMethod = (movieState: Movie[]) => Movie[];
