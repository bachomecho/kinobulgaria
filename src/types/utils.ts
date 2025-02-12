import { MovieSite, TSiteInfoMapping } from "./types";

export const objectFromArray = (arr: [MovieSite, string]) => {
    const [site, video_id] = arr;
    return { site: site, video_id: video_id };
};

export const siteFullNameAndColorMapping: TSiteInfoMapping = {
    youtube: {
        fullSiteName: "YouTube",
        primaryCssClass: "primary-youtube-btn",
        secondaryHoverColor: "#dc1648",
    },
    dailymotion: {
        fullSiteName: "Dailymotion",
        primaryCssClass: "primary-dailymotion-btn",
        secondaryHoverColor: "#60a5fa",
    },
    gledambg: {
        fullSiteName: "GledamBG",
        primaryCssClass: "primary-gledambg-btn",
        secondaryHoverColor: "#ad5e0e",
    },
    vk: {
        fullSiteName: "VK",
        primaryCssClass: "primary-vk-btn",
        secondaryHoverColor: "#0bc8c3",
    },
};
function determineUrl(site: MovieSite, video_id: string): string {
    switch (site) {
        case "youtube":
            return `https://www.youtube.com/watch?v=${video_id}`;
        case "dailymotion":
            return `https://www.dailymotion.com/video/${video_id}`;
        case "gledambg":
            return `https://gledam.bg/programs/${video_id}`;
        case "vk":
            return `https://vk.com/video-${video_id}`;
        default:
    }
    return "";
}

export { determineUrl, objectFromArray, siteFullNameAndColorMapping };
