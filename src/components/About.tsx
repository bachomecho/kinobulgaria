import Navigation from "./Navigation";
import "./css_files/About.css";

const AboutPage = () => {
	return (
		<>
			<header>
				<Navigation />
			</header>
			<div className="container">
				<div className="content-container">
					<img
						src="/assets/static/images/about_pic.jpg"
						alt="Old Bulgarian Cinema"
						className="cinema-image"
					/>
					<div className="text-block">
						<h1 className="header-text">За Кино България</h1>
						<p className="about-paragraph">
							<strong>Добре дошли в Кино България</strong> – онлайн колекцията
							на стари български филми! Този сайт цели съхраняването на богатото
							наследство на българското кино и предоставянето на възможност на
							младите поколенията отново да открият шедьоврите от миналото. Ще
							откриете перли от златната епоха на българското кино, които
							остават незабравими и до ден днешен. Колекцията включва филми от
							различни жанрове, от класически драми до вълнуващи комедии.
							Създадохме този уебсайт с надеждата да съберем общност от любители
							на българската кинематография, които се възхищават и уважават
							традициите на нашето кино.
						</p>
					</div>
				</div>
				<h1 className="sub-header">Популярни филми</h1>
				<ul>
					<li className="popular-film">
						<strong>Крадецът на праскови (1964)</strong> - Любовна история по
						време на Втората световна война.
					</li>
					<li className="popular-film">
						<strong>С деца на море (1972)</strong> - История изпъленена с хумор
						изследва динамиката и приключенията на група учители, които водят
						своите ученици на училищна екскурзия до морето.
					</li>
				</ul>
			</div>
		</>
	);
};

export default AboutPage;
