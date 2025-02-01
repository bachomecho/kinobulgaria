import { MovieSite } from "./types";

export const objectFromArray = (arr: [MovieSite, string]) => {
	const [site, video_id] = arr;
	return { site: site, video_id: video_id };
};
