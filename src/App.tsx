import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import UserSettings from "./components/authentication/UserSettings";
import { createContext, useState } from "react";

let authContext = createContext({} as any);

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
function addMovieWatchlist(userUuid: string, title: string, year: number) {
	fetch(`/api/watchlist/${userUuid}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Watchlist-Update-Method": "add",
		},
		body: JSON.stringify({ title: title, year: year }),
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
	const [userUuid, setUserUuid] = useState(
		localStorage.getItem("userUuid") || null
	);

	return (
		<div className="wrapper">
			<BrowserRouter>
				<authContext.Provider value={{ userUuid, setUserUuid }}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/usersettings" element={<UserSettings />} />
					</Routes>
				</authContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export { authContext, addMovieWatchlist, removeMovieWatchlist, App };
