import "./css_files/Modal.css";
import { modalTitle } from "../utils/utils";

function Modal(props: ModalProps) {
	const activeModal = props.isActive ? "active" : "hidden";
	let thumbnailSource: string = `/images/${props.thumbnail_name}.jpg`;
	let youtubeIconSource: string = "/icons/youtube.png";
	let wikipediaIcon: string = "/icons/wikipedia.png";

	if (import.meta.env.VITE_ENVIRONMENT === "DEV") {
		thumbnailSource = "/assets/static" + thumbnailSource;
		youtubeIconSource = "/assets/static" + youtubeIconSource;
		wikipediaIcon = "/assets/static" + wikipediaIcon;
	}

	return (
		<div className={`modal-container ${activeModal}`} id="modal">
			<button className="close-button" onClick={props.onClose}>
				X
			</button>
			<div className="movie-info-main-container">
				<div className="modal-thumbnail">
					<img src={thumbnailSource} alt="Thumbnail" />
				</div>

				<div className="modal-title">
					<p style={{ marginLeft: `${modalTitle(props.title, 11, 14)}%` }}>
						{props.title}
					</p>
				</div>
			</div>
			<div className="button-container">
				<button
					id="youtube-button"
					onClick={() =>
						window.open(`https://www.youtube.com/watch?v=${props.video_id}`)
					}
					type="button"
				>
					<a
						href={`https://www.youtube.com/watch?v=${props.video_id}`}
						className="icon-button"
					>
						<img src={youtubeIconSource} />
						YouTube
					</a>
				</button>
				<button
					id="wikipedia-button"
					onClick={
						() =>
							window.open(
								`https://bg.wikipedia.org/wiki/${props.title.replace(" ", "_")}`
							) // TODO:validation that wiki page exists
					}
					type="button"
				>
					<a
						href={`https://www.youtube.com/watch?v=${props.video_id}`}
						className="icon-button"
					>
						<img src={wikipediaIcon} />
						Wikipedia
					</a>
				</button>
			</div>
			<li className="movie-info-list">
				<div className="movie-info-container">
					<div className="movie-info-item" id="movie-duration">
						Времетраене: <span>{props.duration}</span> минути
					</div>
					<div className="movie-info-item" id="movie-release-year">
						Премиера: <span>{props.releaseYear}</span> г.
					</div>
					<div id="movie-director">
						Режисъор: <span>{props.director}</span>
					</div>
				</div>
			</li>
		</div>
	);
}

export default Modal;
