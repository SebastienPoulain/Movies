import React, { useEffect } from "react";
import "./Results.css";
import VideoCard from "./VideoCard";
import axios from "./axios";
import FlipMove from "react-flip-move";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";

function Results({
  selectedOption,
  page,
  movies,
  setMovies,
  setNbPage,
  nbPage,
  handlePagination,
}) {
  useEffect(() => {
    axios({
      method: "GET",
      url: `${selectedOption}&page=${page}`,
    }).then((res) => {
      setNbPage(res.data.total_pages);
      setMovies(res.data.results);
    });
  }, [selectedOption, page, setMovies, setNbPage]);

  return (
    <div className="results">
      <FlipMove>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/details/${movie.id}`}>
            <VideoCard key={movie.id} movie={movie} />
          </Link>
        ))}
      </FlipMove>

      {movies.length > 0 ? (
        <Pagination
          showFirstButton
          showLastButton
          color="primary"
          count={nbPage}
          page={page}
          onChange={handlePagination}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Results;
