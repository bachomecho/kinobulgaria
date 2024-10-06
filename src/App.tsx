import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import UserSettings from "./components/authentication/UserSettings";
import { useEffect, createContext, useState } from "react";

let authContext = createContext({} as any);

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const userUuid = localStorage.getItem("userUuid");
		if (userUuid) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	return (
		<div className="wrapper">
			<BrowserRouter>
				<authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
					<Routes>
						<Route path="/" element={<Home />} />
						{!isAuthenticated && <Route path="/login" element={<Login />} />}
						{!isAuthenticated && (
							<Route path="/register" element={<Register />} />
						)}
						{isAuthenticated && (
							<Route path="/user-settings" element={<UserSettings />} />
						)}
					</Routes>
				</authContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export { authContext, App };
