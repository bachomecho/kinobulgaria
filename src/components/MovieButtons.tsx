import {
	Movie,
	TIdAndSites,
	MovieSite,
	MovieInfo,
	TSiteInfoMapping,
} from "../types/types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

const determineUrl = (site: MovieSite, video_id: string): string => {
	switch (site) {
		case "youtube":
			return `https://www.youtube.com/watch?v=${video_id}`;
		case "dailymotion":
			return `https://www.dailymotion.com/video/${video_id}`;
		case "gledambg":
			return `https://gledam.bg/programs/${video_id}`;
		case "vk":
			return `https://ok.ru/video/${video_id}`;
		default:
	}
	return "";
};
const objectFromArray = (arr: [MovieSite, string]) => {
	const [site, video_id] = arr;
	return { site: site, video_id: video_id };
};
const siteInfoMapping: TSiteInfoMapping = {
	youtube: ["YouTube", "#eb2323"],
	dailymotion: ["Dailymotion", "#60a5fa"],
	gledambg: ["GledamBG", "#ad5e0e"],
	vk: ["VK", "#0bc8c3"],
};
// movies are already filtered upon requesting from movie database to have at least one video id
function MovieButtons(props: TIdAndSites<Movie> & Pick<Movie, "title">) {
	// determine video id and the site the video is hosted on
	const [primaryMovie, setPrimaryMovie] = useState<MovieInfo>();
	const [otherMovieLinks, setOtherMovieLinks] = useState<MovieInfo[]>();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (e: any) => {
		e.stopPropagation();
		setAnchorEl(null);
	};

	useEffect(() => {
		const movieSiteMapping = new Map<MovieSite, string>([
			[props.site, props.video_id],
			[props.site_1, props.video_id_1],
			["gledambg", props.gledambg_video_id],
		]);
		movieSiteMapping.forEach((val, key, m) => {
			if (!val || !key) m.delete(key);
		});
		if (movieSiteMapping.size !== 0) {
			const mappingArray = Array.from(movieSiteMapping.entries());
			setPrimaryMovie(objectFromArray(mappingArray.shift()!));
			if (mappingArray.length > 0) {
				setOtherMovieLinks(
					mappingArray.map((elem) => {
						return objectFromArray(elem);
					})
				);
			}
		} else {
			throw new Error(
				`There is a missing video id and site combo for movie ${props.title}`
			);
		}
	}, []);

	const primaryMovieClassName =
		"primary-" +
		primaryMovie?.site +
		"-btn" +
		" " +
		"flex items-center justify-center 2xl:justify-start gap-2 ring-offset-background";

	return (
		// TODO: change icon and css class name (yt-btn)
		<>
			{primaryMovie && (
				<a
					href={determineUrl(primaryMovie.site, primaryMovie.video_id)}
					className={primaryMovieClassName}
					target="_blank"
					onClick={(e) => e.stopPropagation()}
				>
					<img
						src={`/icons/${primaryMovie.site}_icon.svg`}
						className="w-4 h-4 2xl:ml-4"
					/>
					<span className="hidden 2xl:block">
						{siteInfoMapping[primaryMovie.site][0]}
					</span>
				</a>
			)}
			{otherMovieLinks?.length! > 0 ? (
				<div>
					<Button
						id="basic-button"
						aria-controls={open ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
					>
						Още опции
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						onClick={(e) => e.stopPropagation()}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
						sx={{ width: 1000 }}
					>
						{otherMovieLinks &&
							otherMovieLinks?.map((item) => {
								const secondaryMovieClassName =
									"secondary-" +
									item.site +
									"-btn" +
									" " +
									"flex items-center justify-center 2xl:justify-start gap-2 ring-offset-background";
								return (
									<MenuItem
										onClick={(e) => handleClose(e)}
										sx={{
											"&:hover": {
												backgroundColor: siteInfoMapping[item.site][1],
											},
											width: 170,
										}}
									>
										<a
											href={determineUrl(item.site, item.video_id)}
											className={secondaryMovieClassName}
											target="_blank"
											onClick={(e) => e.stopPropagation()}
										>
											<img
												src={`/icons/${item.site}_icon.svg`}
												className="w-4 h-4 2xl:ml-4"
											/>
											<span className="hidden 2xl:block">
												{siteInfoMapping[item.site][0]}
											</span>
										</a>
									</MenuItem>
								);
							})}
					</Menu>
				</div>
			) : (
				<a
					href={`https://bg.wikipedia.org/wiki/${props.title.replace(
						" ",
						"_"
					)}`}
					className="wiki-btn flex items-center justify-center 2xl:justify-start gap-2 ring-offset-background"
					target="_blank"
					onClick={(e) => e.stopPropagation()}
					title="Информация за филма"
				>
					<img src="/icons/wikipedia_icon.svg" className="w-4 h-4 2xl:ml-4" />
					<span className="hidden 2xl:block">Wikipedia</span>
				</a>
			)}
		</>
	);
}

export default MovieButtons;
