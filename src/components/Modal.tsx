import "./css_files/Modal.css";
import { modalTitle } from "../utils/utils";
import { useEffect, useState } from "react";

function Modal(props: ModalProps) {
	const activeModal = props.isActive ? "active" : "hidden";
	let thumbnailSource: string = `/images/${props.thumbnail_name}.jpg`;
	let youtubeIconSource: string = "/icons/youtube.png";
	let wikipediaIcon: string = "/icons/wikipedia.png";
	const [dropTitle, setDropTitle] = useState<boolean>(false);
	const [marginMid, setMarginMid] = useState<number>(14); // TODO: this could be potentially removed with new title functionality
	const [activeTitle, setActiveTitle] = useState<boolean>(false);

	if (import.meta.env.VITE_ENVIRONMENT === "DEV") {
		thumbnailSource = "/assets/static" + thumbnailSource;
		youtubeIconSource = "/assets/static" + youtubeIconSource;
		wikipediaIcon = "/assets/static" + wikipediaIcon;
	}
	document.addEventListener("keypress", (e) => {
		if (e.key === "27") props.onClose(); // escape key
	});

	useEffect(() => {
		window.addEventListener("resize", () => {
			if (window.innerWidth <= 1500) {
				setMarginMid(11);
			}
			if (window.innerWidth <= 480) {
				setMarginMid(15);
			}
		});

		return () => {
			window.addEventListener("resize", () => {
				if (window.innerWidth <= 1500) setDropTitle(true);
			});
		};
	}, []);

	useEffect(() => {
		function closeOnEscape(e: KeyboardEvent) {
			if (e.key === "Escape") props.onClose();
		}
		window.addEventListener("keydown", closeOnEscape);

		return () => {
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [props.onClose]);

	const titleDisplayIndicator = activeTitle ? "active" : "";
	return (
		<div className={`modal-container ${activeModal}`} id="modal">
			<button className="close-button" onClick={props.onClose}>
				X
			</button>
			<div className="movie-info-main-container">
				<div className="modal-thumbnail">
					<img src={thumbnailSource} alt="Thumbnail" />
				</div>
				{!dropTitle ? (
					<div
						style={{
							marginLeft: `${modalTitle(props.title, marginMid)}%`,
						}}
						className="modal-title"
					>
						<p>{props.title}</p>
					</div>
				) : (
					<div className="title-container">
						<button
							className="title-button"
							onClick={() => setActiveTitle(!activeTitle)}
						>
							Title
						</button>
						<div className={`title-display${titleDisplayIndicator}`}>
							{props.title}
						</div>
					</div>
				)}
			</div>
			<div className="button-container">
				<button id="youtube-button" type="button">
					<a
						href={`https://www.youtube.com/watch?v=${props.video_id}`}
						className="icon-button"
						target="_blank"
					>
						<img src={youtubeIconSource} />
						YouTube
					</a>
				</button>
				<button id="wikipedia-button" type="button">
					<a
						href={`https://bg.wikipedia.org/wiki/${props.title.replace(
							" ",
							"_"
						)}`}
						className="icon-button"
						target="_blank"
					>
						<img src={wikipediaIcon} />
						Wikipedia
					</a>
				</button>
			</div>
			<div className="movie-info-container">
				<li className="movie-info-list">
					<div className="movie-info-item" id="movie-duration">
						Времетраене: <span>{props.duration}</span> минути
					</div>
					<div className="movie-info-item" id="movie-release-year">
						Премиера: <span>{props.release_year}</span> г.
					</div>
					<div className="movie-info-item" id="movie-director">
						Режисъор: <span>{props.director}</span>
					</div>
				</li>
			</div>
		</div>
	);
}
export default Modal;
