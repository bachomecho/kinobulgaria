interface Movie {
	title: string;
	thumbnail_name: string;
	video_id: string;
	duration: number;
	release_year: number;
	director: string;
}

interface ModalProps extends Movie {
	isActive: boolean;
	onClose: () => void;
}
