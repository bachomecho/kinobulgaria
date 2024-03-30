interface MovieParams {
  title: string;
  thumbnail_name: string;
  video_id: string;
  openModal: () => void;
}

function MovieItem(props: MovieParams) {
  const thumbnailSource: string = "/images/" + props.thumbnail_name + ".jpg";
  return (
    <>
      <img
        src={thumbnailSource}
        title={props.title}
        className="thumbnail grid"
        onClick={props.openModal}
        alt=""
      />
    </>
  );
}

export default MovieItem;
