import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createContext } from "react";
let cntx = "";
if (import.meta.env.VITE_ENVIRONMENT === "DEV") {
	cntx = "/assets/static/";
}

export const pathContext = createContext(cntx);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<pathContext.Provider value={cntx}>
			<App />
		</pathContext.Provider>
	</React.StrictMode>
);
