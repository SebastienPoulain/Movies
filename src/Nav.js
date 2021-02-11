import React from "react";
import "./Nav.css";
import request from "./request";

function Nav({ setSelectedOption, setPage, nav, setNav }) {
  return (
    <div className="nav">
      <h4
        className={nav === "tendances" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchTrending);
          setPage(1);
          setNav("tendances");
        }}
      >
        Tendances
      </h4>
      <h4
        className={nav === "Mieux notés" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchTopRated);
          setPage(1);
          setNav("Mieux notés");
        }}
      >
        Mieux notés
      </h4>
      <h4
        className={nav === "Action" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchActionMovies);
          setPage(1);
          setNav("Action");
        }}
      >
        Action
      </h4>
      <h4
        className={nav === "Comédie" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchComedyMovies);
          setPage(1);
          setNav("Comédie");
        }}
      >
        Comédie
      </h4>
      <h4
        className={nav === "Horreur" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchHorrorMovies);
          setPage(1);
          setNav("Horreur");
        }}
      >
        Horreur
      </h4>
      <h4
        className={nav === "Romance" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchRomanceMovies);
          setPage(1);
          setNav("Romance");
        }}
      >
        Romance
      </h4>
      <h4
        className={nav === "Mystère" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchMystery);
          setPage(1);
          setNav("Mystère");
        }}
      >
        Mystère
      </h4>
      <h4
        className={nav === "Sci-fi" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchSciFi);
          setPage(1);
          setNav("Sci-fi");
        }}
      >
        Sci-fi
      </h4>
      <h4
        className={nav === "Western" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchWestern);
          setPage(1);
          setNav("Western");
        }}
      >
        Western
      </h4>
      <h4
        className={nav === "Animation" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchAnimation);
          setPage(1);
          setNav("Animation");
        }}
      >
        Animation
      </h4>
      <h4
        className={nav === "Film télé" ? "selected" : ""}
        onClick={(e) => {
          setSelectedOption(request.fetchTv);
          setPage(1);
          setNav("Film télé");
        }}
      >
        Film télé
      </h4>
    </div>
  );
}

export default Nav;
