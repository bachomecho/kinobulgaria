import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import UserSettings from "./components/authentication/UserSettings";
import { TWatchlist, MovieSite } from "./types/types";

function determineUrl(site: MovieSite, video_id: string): string {
	switch (site) {
		case "youtube":
			return `https://www.youtube.com/watch?v=${video_id}`;
		case "dailymotion":
			return `https://www.dailymotion.com/video/${video_id}`;
		case "gledambg":
			return `https://gledam.bg/programs/${video_id}`;
		case "vk":
			return `https://vk.com/video-${video_id}`;
		default:
	}
	return "";
}
function removeMovieWatchlist(userUuid: string, title: string) {
	fetch(`/api/watchlist/${userUuid}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Watchlist-Update-Method": "remove",
		},
		body: JSON.stringify({ title: title }),
	})
		.then((res) => {
			if (!res.ok)
				throw new Error(
					"Faulty server response while updating watchlist: " + res.status
				);
		})
		.catch((err) => {
			console.error("Error occured while updating watchlist: " + err);
		});
}
function addMovieWatchlist(
	userUuid: string,
	title: string,
	thumbnail_name: string,
	video_id: string,
	year: number
) {
	const reqBody: TWatchlist = {
		title: title,
		release_year: year,
		video_id: video_id,
		thumbnail_name: thumbnail_name,
	};
	fetch(`/api/watchlist/${userUuid}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Watchlist-Update-Method": "add",
		},
		body: JSON.stringify(reqBody),
	})
		.then((res) => {
			if (!res.ok)
				throw new Error(
					"Faulty server response while updating watchlist: " + res.status
				);
		})
		.catch((err) => {
			console.error("Error occured while updating watchlist: " + err);
		});
}

function App() {
	return (
		<div className="wrapper">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/usersettings" element={<UserSettings />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export { addMovieWatchlist, removeMovieWatchlist, App, determineUrl };
