import React, { useEffect, useState } from "react";
import "./ResultsDetails.css";
import { useLocation } from "react-router-dom";
import { API_KEY } from "./request";
import axios from "./axios";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import Rating from "@material-ui/lab/Rating";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

function ResultsDetails() {
  const [loading, setLoading] = useState(true);
  let genres = [];
  const imgVide =
    "https://www.ville.magog.qc.ca/bibliotheque/wp-content/uploads/2015/09/image-non-disponible.png";
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [rating, setRating] = useState(0);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  let location = useLocation();
  let id = location.pathname.substr(9);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images,credits,similar&language=fr`,
    }).then((res) => {
      setRating(res.data.vote_average);
      setDetail(res.data);
      setVideo(res.data.videos.results[0]);
      setCasts(res.data.credits.cast);
      setSimilarMovie(res.data.similar.results);
      setLoading(false);
    });
  }, [id]);

  genres = detail.genres;

  const showInfo = () => {
    const playIcon = document.querySelector(".playIcon");
    const coteText = document.querySelector(".cote__text");
    const coteValue = document.querySelector(".cote__value");
    const sortieText = document.querySelector(".sortie__text");
    const sortieValue = document.querySelector(".sortie__value");
    const dureeText = document.querySelector(".duree__text");
    const dureeValue = document.querySelector(".duree__value");
    const budgetText = document.querySelector(".budget__text");
    const budgetValue = document.querySelector(".budget__value");
    const coteValue2 = document.querySelector(".cote__value2");
    const genreText = document.querySelector(".genre__text");
    const genreValue = document.querySelector(".genre__value");
    const captionTitle = document.querySelector(".caption__title");
    const resumeText = document.querySelector(".resume__text");
    const resumeValue = document.querySelector(".resume__value");
    const webText = document.querySelector(".web__text");
    const webValue = document.querySelector(".web__value");
    const acteursText = document.querySelector(".acteurs__text");
    const acteursValue = document.querySelector(".acteurs__value");
    const similaireText = document.querySelector(".similaire__text");
    const similaireValue = document.querySelector(".similaire__value");
    setTimeout(function () {
      if (video) {
        playIcon.style.display = "inline-block";
      }
      captionTitle.style.display = "block";
      genreText.style.display = "block";
      genreValue.style.display = "block";
      coteText.style.display = "block";
      coteValue.style.display = "block";
      coteValue2.style.display = "inline-flex";
      resumeText.style.display = "block";
      resumeValue.style.display = "block";
      sortieText.style.display = "block";
      sortieValue.style.display = "block";
      dureeText.style.display = "block";
      dureeValue.style.display = "block";
      budgetText.style.display = "block";
      budgetValue.style.display = "block";
      webText.style.display = "block";
      webValue.style.display = "block";
      acteursText.style.display = "block";
      acteursValue.style.display = "flex";
      similaireText.style.display = "block";
      similaireValue.style.display = "flex";
    }, 10);
  };

  const MoviePlayerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video?.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  } else {
    genresList = "Genre non disponible";
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={
            c.profile_path
              ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
              : imgVide
          }
          alt={c.name}
        ></img>
        <p style={{ color: "white" }} className="font-weight-bold text-center">
          {c.name}
        </p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#f4c10f" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <Link key={item.id} to={`/details/${item.id}`}>
        <VideoCard key={item.id} movie={item} />
      </Link>
    );
  });

  return (
    <div className="container">
      <div className="row mt-2 justify-content-center">
        <MoviePlayerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePlayerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            onLoad={showInfo}
            className={
              !detail.backdrop_path && detail.poster_path
                ? `img-fluid poster`
                : `img-fluid`
            }
            src={
              loading
                ? ""
                : detail?.backdrop_path || detail?.poster_path
                ? `http://image.tmdb.org/t/p/original/${
                    detail?.backdrop_path || detail?.poster_path
                  }`
                : imgVide
            }
            alt={loading ? "" : detail?.title}
          />
          {video ? (
            <div className="carousel-center">
              <i
                onClick={() => setIsOpen(true)}
                className="far fa-play-circle playIcon"
                style={{
                  display: "none",
                  fontSize: "10vw",
                  color: "#f4c10f",
                  cursor: "pointer",
                }}
              />
            </div>
          ) : (
            ""
          )}

          {detail.title && detail.backdrop_path ? (
            <div
              className="carousel-caption"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: "4vw",
              }}
            >
              <p style={{ display: "none" }} className="caption__title">
                {loading
                  ? ""
                  : detail.title
                  ? detail.title
                  : "Titre non disponible"}
              </p>
            </div>
          ) : !detail.backdrop_path && !detail.poster_path ? (
            <div
              className="carousel-caption"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "black",
                fontSize: "2.5vw",
              }}
            >
              <p style={{ display: "none" }} className="caption__title">
                {loading
                  ? ""
                  : detail.title
                  ? detail.title
                  : "Titre non disponible"}
              </p>
            </div>
          ) : detail.title && detail.poster_path ? (
            <div
              className="carousel-caption"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: "2vw",
              }}
            >
              <p style={{ display: "none" }} className="caption__title">
                {loading
                  ? ""
                  : detail.title
                  ? detail.title
                  : "Titre non disponible"}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col text-center">
          <p
            className="genre__text"
            style={{ color: "#5a606b", fontWeight: "bolder", display: "none" }}
          >
            {loading ? "" : "GENRE"}
          </p>
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col text-center">
          <ul style={{ display: "none" }} className="list-inline genre__value">
            {loading ? "" : genresList}
          </ul>
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col-md-3 text-center">
          <p
            className="cote__text"
            style={{ color: "#5a606b", fontWeight: "bolder", display: "none" }}
          >
            {loading ? "" : "COTE"}
          </p>

          <span
            className="cote__value"
            style={{ color: "white", display: "none" }}
          >
            {loading ? "" : rating ? rating : "0"}
          </span>
        </div>
      </div>

      <div className="row mt-3 justify-content-center">
        <div className="col">
          <div className="text-center">
            <Rating
              className="cote__value2"
              style={{ marginTop: "10px", display: "none" }}
              value={loading ? 0 : rating}
              max={10}
              precision={0.5}
              readOnly
            />
          </div>
          <div className="mt-3 text-center">
            <p
              className="resume__text"
              style={{
                color: "#5a606b",
                fontWeight: "bolder",
                display: "none",
              }}
            >
              {loading ? "" : "RÉSUMÉ"}
            </p>

            <p
              className="resume__value"
              style={{ color: "white", display: "none" }}
            >
              {loading
                ? ""
                : detail?.overview
                ? detail?.overview
                : "Résumé non disponible"}
            </p>
          </div>
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col-md-3 text-center">
          <p
            className="sortie__text"
            style={{ color: "#5a606b", fontWeight: "bolder", display: "none" }}
          >
            {loading ? "" : "DATE DE SORTIE"}
          </p>

          <p
            className="sortie__value"
            style={{ color: "white", display: "none" }}
          >
            {loading
              ? ""
              : detail?.release_date
              ? detail?.release_date
              : "Date non disponible"}
          </p>
        </div>
        <div className="col-md-3 text-center">
          <p
            className="duree__text"
            style={{ color: "#5a606b", fontWeight: "bolder", display: "none" }}
          >
            {loading ? "" : "DURÉE"}
          </p>

          <p
            className="duree__value"
            style={{ color: "white", display: "none" }}
          >
            {loading
              ? ""
              : detail?.runtime
              ? detail?.runtime + " mins"
              : "Durée non disponible"}
          </p>
        </div>
        <div className="col-md-3 text-center">
          <p
            className="budget__text"
            style={{ color: "#5a606b", fontWeight: "bolder", display: "none" }}
          >
            {loading ? "" : "BUDGET"}
          </p>

          <p
            className="budget__value"
            style={{ color: "white", display: "none" }}
          >
            {loading ? "" : detail?.budget ? detail?.budget + " $" : "0 $"}
          </p>
        </div>
        <div className="col-md-3 text-center">
          <p
            className="web__text"
            style={{ color: "#5a606b", fontWeight: "bolder", display: "none" }}
          >
            {loading ? "" : "PAGE WEB"}
          </p>

          <a
            className="web__value"
            style={{ display: "none" }}
            target="blank"
            href={detail?.homepage ? detail?.homepage : ""}
          >
            {loading
              ? ""
              : detail?.homepage
              ? detail?.homepage
              : "Page Web non disponible"}
          </a>
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col text-center">
          <p
            className="acteurs__text"
            style={{ color: "#5a606b", fontWeight: "bolder", display: "none" }}
          >
            {loading ? "" : "ACTEURS"}
          </p>
        </div>
      </div>
      <div
        style={{ display: "none" }}
        className="row mt-3 justify-content-center acteurs__value"
      >
        {loading
          ? ""
          : castList?.length > 0
          ? castList
          : "Acteurs non disponible"}
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col text-center">
          <p
            className="similaire__text"
            style={{ color: "#5a606b", fontWeight: "bolder", display: "none" }}
          >
            {loading ? "" : "FILMS SIMILAIRES"}
          </p>
        </div>
      </div>
      <div
        style={{ display: "none" }}
        className="row mt-3 justify-content-center similaire__value"
      >
        {loading
          ? ""
          : similarMovieList?.length > 0
          ? similarMovieList
          : "Films similaires non disponible"}
      </div>
    </div>
  );
}

export default ResultsDetails;
