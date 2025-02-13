import { ModalProps, MovieInfo } from "../types/types";
import { MutableRefObject, useEffect, useRef } from "react";
import { determineUrl, siteFullNameAndColorMapping } from "../types/utils.ts";

export default function Modal(props: ModalProps) {
    const primaryMovie: MutableRefObject<MovieInfo> = useRef(
        props.movieInfo.primaryMovieInfo
    );

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutsideModal = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                props.setModalState(false);
            }
        };
        document.addEventListener("mousedown", clickOutsideModal, false);
        return () => {
            document.removeEventListener("mousedown", clickOutsideModal, false);
        };
    }, [props.setModalState]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg w-full max-w-5xl"
            >
                <div className="flex justify-end items-center mb-3">
                    <button
                        onClick={() => props.setModalState(false)}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                <div className="flex">
                    <img
                        src={`/images/${props.thumbnail_name}.jpg`}
                        alt={props.title}
                        className="w-1/3 h-64 rounded-lg object-cover"
                    />
                    <div className="w-2/3 pl-7">
                        <h2 className="text-2xl font-bold">{props.title}</h2>
                        <p className="mb-4 w-2/3">
                            {`${props.director}, ${props.release_year}, ${props.duration} минути`}
                        </p>
                        <p className="mb-4">{props.plot}</p>
                        <div className="flex justify-between items-center">
                            <a
                                href={determineUrl(
                                    primaryMovie.current.site,
                                    primaryMovie.current.video_id
                                )}
                                className={
                                    siteFullNameAndColorMapping[
                                        primaryMovie.current.site
                                    ].primaryCssClass
                                }
                                target="_blank"
                            >
                                <img
                                    src={`/icons/${primaryMovie.current.site}_icon.svg`}
                                    className="fill-current w-4 h-4 mr-2"
                                />
                                {
                                    siteFullNameAndColorMapping[
                                        primaryMovie.current.site
                                    ].fullSiteName
                                }
                            </a>
                            <a
                                href={`https://bg.wikipedia.org/wiki/${props.title.replace(
                                    " ",
                                    "_"
                                )}`}
                                className="more-options-btn ring-offset-background"
                                target="_blank"
                            >
                                <img
                                    src="/icons/wikipedia_icon.svg"
                                    className="fill-current w-4 h-4 mr-2 -ml-1"
                                />
                                Wikipedia
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
