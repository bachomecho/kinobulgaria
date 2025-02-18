import { MovieSite, TSiteInfoMapping } from "./types";

const objectFromArray = (arr: [MovieSite, string]) => {
    const [site, video_id] = arr;
    return { site: site, video_id: video_id };
};

const siteFullNameAndColorMapping: TSiteInfoMapping = {
    youtube: {
        fullSiteName: "YouTube",
        primaryCssClass: "primary-youtube-btn",
        secondaryHoverColor: "#eb2323",
    },
    dailymotion: {
        fullSiteName: "Dailymotion",
        primaryCssClass: "primary-dailymotion-btn",
        secondaryHoverColor: "#1d4ed8",
    },
    gledambg: {
        fullSiteName: "GledamBG",
        primaryCssClass: "primary-gledambg-btn",
        secondaryHoverColor: "#854d0e",
    },
    vk: {
        fullSiteName: "VK",
        primaryCssClass: "primary-vk-btn",
        secondaryHoverColor: "#0bc8c3",
    },
    playtube: {
        fullSiteName: "PlayTube",
        primaryCssClass: "primary-vk-btn",
        secondaryHoverColor: "#7b30c6",
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
            return `https://vk.com/video${video_id}`;
        case "playtube":
            return `https://playtube.tv/watch/${video_id}`;
        default:
    }
    return "";
}

export { determineUrl, objectFromArray, siteFullNameAndColorMapping };
