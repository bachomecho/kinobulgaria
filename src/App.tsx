import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { createContext } from "react";

let cntx = "";
if (import.meta.env.VITE_ENVIRONMENT === "DEV") {
	cntx = "/assets/static/";
}
export const pathContext = createContext(cntx);
export default function App() {
	return (
		<div className="wrapper">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<pathContext.Provider value={cntx}>
								<Home />
							</pathContext.Provider>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
