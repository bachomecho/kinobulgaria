import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
	return (
		<div className="wrapper">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
