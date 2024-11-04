import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import UserSettings from "./components/authentication/UserSettings";
import { createContext, useState } from "react";

let authContext = createContext({} as any);

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

export { authContext, App };
