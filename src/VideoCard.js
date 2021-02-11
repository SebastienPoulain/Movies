import React, { forwardRef } from "react";
import "./VideoCard.css";
import Rating from "@material-ui/lab/Rating";

const base_url = "https://image.tmdb.org/t/p/original/";
const imgVide =
  "https://www.ville.magog.qc.ca/bibliotheque/wp-content/uploads/2015/09/image-non-disponible.png";

const VideoCard = forwardRef(({ movie }, ref) => {
  return (
    <div ref={ref} className="videoCard">
      <img
        className="img-fluid"
        src={
          movie?.backdrop_path
            ? `${base_url + movie.backdrop_path}`
            : movie?.poster_path
            ? `${base_url + movie.poster_path}`
            : `${imgVide}`
        }
        alt={movie.title || movie.original_name}
      />
      <div className="card__info">
        <Rating
          style={{ marginTop: "10px" }}
          defaultValue={movie.vote_average}
          max={10}
          precision={0.5}
          readOnly
        />
        <p>
          <b>{movie?.vote_average ? movie?.vote_average : "0"}</b>
        </p>

        <h2>
          {movie?.title || movie?.original_name
            ? movie?.title || movie?.original_name
            : "Titre non disponible"}
        </h2>
      </div>
    </div>
  );
});

export default VideoCard;
