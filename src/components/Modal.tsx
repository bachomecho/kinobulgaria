import { ModalProps } from "../types/types";
import { useEffect, useRef } from "react";
import MovieButtons from "./MovieButtons.tsx";

export default function Modal(props: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutsideModal = (event: any) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !(event.target as HTMLElement).hasAttribute("aria-hidden") // this attribute tells us that more options menu was expanded and this click is not to close the modal but to close the expanded more options menu
            ) {
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
                            <MovieButtons {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
