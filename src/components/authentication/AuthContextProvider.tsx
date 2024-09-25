import { createContext, useState } from "react";

const authCntx = createContext({} as any); // not picked up because created outside?
function AuthContextProvider({ children }: { children: any }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const changeAuthStatus = (newStatus: boolean) => {
		setIsAuthenticated(newStatus);
	};
	return (
		<authCntx.Provider value={{ isAuthenticated, changeAuthStatus }}>
			{children}
		</authCntx.Provider>
	);
}

export { authCntx, AuthContextProvider };
