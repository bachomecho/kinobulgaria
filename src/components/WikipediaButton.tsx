function WikipediaButton({ title }: { title: string }) {
    return (
        <a
            href={`https://bg.wikipedia.org/wiki/${title.replace(" ", "_")}`}
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
    );
}

export default WikipediaButton;
