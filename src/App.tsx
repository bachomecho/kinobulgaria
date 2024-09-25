import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { useEffect, useContext } from "react";
import { authCntx } from "./components/authentication/AuthContextProvider";

export default function App() {
	const { isAuthenticated, changeAuthStatus } = useContext(authCntx);

	const uuidToken = localStorage.getItem("userUuid") || "";
	console.log("client side token: ", uuidToken);

	function isAuthCheck() {
		fetch(`/is-verified/user/${uuidToken}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Could not check user authentication status.");
				}
				if (response.status === 401) {
					changeAuthStatus(false);
					return;
				}
				if (response.status === 200) {
					changeAuthStatus(true);
					console.log("user is authenticated");
					return;
				}

				return;
			})
			.catch((error) => {
				console.log(error.response);
			});
	}

	useEffect(() => {
		isAuthCheck();
	}, []);

	return (
		<div className="wrapper">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />

					{!isAuthenticated && <Route path="/login" element={<Login />} />}
					{!isAuthenticated && (
						<Route path="/register" element={<Register />} />
					)}
				</Routes>
			</BrowserRouter>
		</div>
	);
}
