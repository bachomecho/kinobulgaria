interface MovieParams {
  title: string;
  thumbnail_name: string;
  video_id: string
  onClick: () => void
}

function MovieItem(props: MovieParams){
  return (
      <img
          src={"/images/" + props.thumbnail_name + ".jpg"}
          title={props.title}
          className="thumbnail"
          onClick={props.onClick}
          alt=""
      />
  );
}

export default MovieItem;
