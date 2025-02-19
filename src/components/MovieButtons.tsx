import { Movie, MovieInfo } from "../types/types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { determineUrl, siteFullNameAndColorMapping } from "../types/utils.ts";

function MovieButtons(props: Pick<Movie, "title" | "movieInfo">) {
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
    const [primaryMovie, setPrimaryMovie] = useState<MovieInfo>();
    const [otherMovieLinks, setOtherMovieLinks] = useState<
        MovieInfo[] | undefined
    >();
    useEffect(() => {
        setPrimaryMovie(props.movieInfo.primaryMovieInfo);
        setOtherMovieLinks(props.movieInfo.other);
    }, [props.title]);

    return (
        <>
            {primaryMovie && (
                <a
                    href={determineUrl(
                        primaryMovie.site,
                        primaryMovie.video_id
                    )}
                    className={
                        siteFullNameAndColorMapping[primaryMovie.site]
                            .primaryCssClass
                    }
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={`/icons/${primaryMovie.site}_icon.svg`}
                        className="w-4 h-4 2xl:ml-4"
                        alt="thumbnail"
                    />
                    <span className="hidden 2xl:block">
                        {
                            siteFullNameAndColorMapping[primaryMovie.site]
                                .fullSiteName
                        }
                    </span>
                </a>
            )}
            {otherMovieLinks && otherMovieLinks.length > 0 ? (
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        className={"more-options-btn"}
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
                        sx={{
                            "& .MuiPaper-root": {
                                backgroundColor: "transparent",
                                boxShadow: "none",
                            },
                            width: 3000,
                        }}
                    >
                        {otherMovieLinks &&
                            otherMovieLinks.map((item) => {
                                return (
                                    <MenuItem
                                        onClick={(e) => handleClose(e)}
                                        sx={{
                                            borderRadius: "12px",
                                            backgroundColor:
                                                siteFullNameAndColorMapping[
                                                    item.site
                                                ].secondaryHoverColor,
                                            color: "white",
                                            width: 170,
                                            "&:hover": {
                                                backgroundColor:
                                                    siteFullNameAndColorMapping[
                                                        item.site
                                                    ].secondaryHoverColor +
                                                    "F2",
                                            },
                                        }}
                                    >
                                        <a
                                            href={determineUrl(
                                                item.site,
                                                item.video_id
                                            )}
                                            className="general-secondary-btn"
                                            target="_blank"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <img
                                                src={`/icons/${item.site}_icon.svg`}
                                                className="w-4 h-4 2xl:ml-4"
                                                alt="site-icon"
                                            />
                                            <span className="hidden 2xl:block">
                                                {
                                                    siteFullNameAndColorMapping[
                                                        item.site
                                                    ].fullSiteName
                                                }
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
                    className="more-options-btn"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    title="Информация за филма"
                >
                    <img
                        src="/icons/wikipedia_icon.svg"
                        className="w-4 h-4 2xl:ml-4"
                        alt="wikipedia-icon"
                    />
                    <span className="hidden 2xl:block">Wikipedia</span>
                </a>
            )}
        </>
    );
}

export default MovieButtons;
