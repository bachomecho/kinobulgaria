function Header({
	setSearchQuery,
}: {
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
	let logoPath = "logo/logo_kino.jpg";
	if (import.meta.env.VITE_ENVIRONMENT === "DEV") {
		logoPath = "/assets/static/logo/logo_kino.jpg";
	}

	return (
		<header className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16 bg-white shadow">
			<a className="flex items-center" href="/" rel="ugc">
				<img src={logoPath} width="24" height="24" className="h-6 w-6 mr-2" />
				<span className="font-bold text-lg">Kино България</span>
			</a>
			<div className="flex items-center gap-4">
				<div className="hidden lg:flex items-center gap-4"></div>
				<div className="relative block">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 --darkreader-inline-stroke: currentColor"
						data-darkreader-inline-stroke=""
					>
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.3-4.3"></path>
					</svg>
					<input
						className="flex h-10 w-full bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Търсене..."
						type="search"
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>
		</header>
	);
}

export default Header;
