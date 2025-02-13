import React from "react";

export type MovieSite = "youtube" | "dailymotion" | "vk" | "gledambg";

export interface IPrimaryAndOtherVideoSources {
    primaryMovieInfo: MovieInfo;
    other?: MovieInfo[];
}

export interface Movie {
    title: string;
    thumbnail_name: string;
    video_id: string;
    site: MovieSite;
    video_id_1: string;
    site_1: MovieSite;
    gledambg_video_id: string;
    movieInfo: IPrimaryAndOtherVideoSources;
    multi_part: 0 | 1;
    duration: number;
    release_year: number;
    genre: string;
    director: string;
    plot: string;
    modalOpenClosedMethod: (e: any) => void;
    isInWatchlist: boolean;
}
export type ModalProps = Omit<
    Movie,
    "genre" | "multi_part" | "isInWatchlist"
> & {
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TSiteInfoMapping = {
    [movie in MovieSite]: {
        fullSiteName: string;
        primaryCssClass: string;
        secondaryHoverColor: string;
    };
};

export type MovieInfo = {
    site: MovieSite;
    video_id: string;
};

export interface IWatchlistLengthState {
    watchlistLength: number;
    setWatchlistLength: React.Dispatch<React.SetStateAction<number>>;
}

export interface IWatchlistResponse {
    error?: string;
    watchlist?: string;
    loginStatus: boolean;
}

export interface FilterProps {
    yearRange: string;
    duration: string;
    genre: string;
}

export interface HeaderProps {
    showSearch: boolean;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

export type TWatchlist = Pick<
    Movie,
    "title" | "thumbnail_name" | "video_id" | "site" | "release_year"
>;

export type TSearchMethod = (
    movieState: Movie[],
    filterState: string
) => Movie[];
export type TFilterMethod = (
    movieState: Movie[],
    filterState: FilterProps
) => Movie[];

export interface IApiUserData {
    loginStatus: boolean;
    watchlist: string;
    username: string;
    registrationDate: Date;
}
