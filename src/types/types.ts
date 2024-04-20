interface Movie {
	title: string;
	thumbnail_name: string;
	video_id: string;
	duration: number;
	release_year: number;
	director: string;
}

interface MovieProps extends Movie {
	openModal: () => void;
}

interface ModalProps extends Omit<MovieProps, "openModal"> {
	isActive: boolean;
	onClose: () => void;
}
