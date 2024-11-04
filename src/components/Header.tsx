import { useContext } from "react";
import { authContext } from "../App";
import logo from "/assets/static/logo/logo_kino.png";

export default function Header(props: HeaderProps) {
	const { userUuid, setUserUuid } = useContext(authContext);

	async function handleLogout() {
		try {
			const response = await fetch(`/api/logout?userUuid=${userUuid}`, {
				method: "POST",
			});

			if (!response.ok) {
				throw new Error("Logout failed");
			} else {
				setTimeout(() => {
					localStorage.removeItem("userUuid");
					setUserUuid(""); // invoking setUserUuid function here to re-render whole app with the new unauthenticated state
				}, 200);
			}
		} catch (err) {
			throw new Error("Error while logging out: " + err);
		}
	}
	return (
		<header className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16 bg-white shadow">
			<a className="flex items-center" href="/" rel="ugc">
				<img src={logo} width="24" height="24" className="h-6 w-6 mr-2" />
				<span className="font-bold text-lg">Kино България</span>
			</a>
			<div className="flex items-center space-x-4">
				{!userUuid ? (
					<div className="inline-flex items-center space-x-2">
						<a className="btn-nav" href="/login">
							Вход
						</a>
						<a className="btn-nav" href="/register">
							Регистрация
						</a>
					</div>
				) : (
					<div className="inline-flex items-center space-x-2">
						<a className="btn-nav" href="/usersettings">
							Settings
						</a>
						<button className="btn-nav" onClick={handleLogout}>
							Logout
						</button>
					</div>
				)}

				{props.showSearch && (
					<div className="flex items-center">
						<div className="relative block">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
							>
								<circle cx="11" cy="11" r="8"></circle>
								<path d="m21 21-4.3-4.3"></path>
							</svg>
							<input
								className="flex h-10 w-full bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Търсене..."
								type="search"
								onChange={(e) => props.setSearchQuery!(e.target.value)}
							/>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
