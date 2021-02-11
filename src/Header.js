import React from "react";
import "./Header.css";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@material-ui/icons/Search";
import IMDB from "./Imdb.ico";
import { Link, useLocation } from "react-router-dom";
import request from "./request";

function Header({
  setPage,
  setSelectedOption,
  setText,
  setMoviesQuery,
  setNbPageQuery,
  setMovies,
  setNbPage,
  setNav,
}) {
  let location = useLocation();

  const changePage = () => {
    if (location.pathname !== "/") {
      setPage(1);
      setSelectedOption(request.fetchTrending);
      setNav("tendances");
      setMovies([]);
      setNbPage(0);
    }
    if (location.pathname === "/search") {
      setText("");
      setMoviesQuery([]);
      setNbPageQuery(0);
    }
  };

  const reset = () => {
    if (location.pathname !== "/search") {
      setText("");
      setMoviesQuery([]);
      setNbPageQuery(0);
    }
  };

  return (
    <div className="header">
      <div className="header__icons">
        <div
          onClick={changePage}
          className={
            location.pathname === "/"
              ? "header__icon header__icon--active"
              : "header__icon"
          }
        >
          <Link to="/">
            <HomeIcon />
            <p>Accueil</p>
          </Link>
        </div>
        <div
          onClick={reset}
          className={
            location.pathname === "/search"
              ? "header__icon header__icon--active"
              : "header__icon"
          }
        >
          <Link to="/search">
            <SearchIcon />
            <p>Recherche</p>
          </Link>
        </div>
        <div
          className={
            location.pathname.includes("details")
              ? "header__icon header__icon--active "
              : "header__icon header__infoIcon"
          }
        >
          <div className="header__info">
            <InfoIcon />
            <p>Détails</p>
          </div>
        </div>
      </div>
      <img src={IMDB} alt="Logo IMDB" />
    </div>
  );
}

export default Header;
