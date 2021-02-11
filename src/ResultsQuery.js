import React, { useEffect } from "react";
import "./Results.css";
import VideoCard from "./VideoCard";
import Flipmove from "react-flip-move";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";

function ResultsQuery({
  moviesQuery,
  nbPageQuery,
  handlePaginationQuery,
  pageQuery,
  setText,
  setMoviesQuery,
  setPageQuery,
  setNbPageQuery,
}) {
  useEffect(() => {
    clearSearch();
    // eslint-disable-next-line
  }, []);

  const clearSearch = () => {
    setText("");
    setMoviesQuery([]);
    setPageQuery(1);
    setNbPageQuery(0);
  };

  return (
    <div className="results">
      <Flipmove>
        {moviesQuery.map((movie) => (
          <Link
            onClick={clearSearch}
            key={movie.id}
            to={`/details/${movie.id}`}
          >
            <VideoCard key={movie.id} movie={movie} />
          </Link>
        ))}
      </Flipmove>

      {moviesQuery.length > 0 ? (
        <Pagination
          showFirstButton
          showLastButton
          color="primary"
          count={nbPageQuery}
          page={pageQuery}
          onChange={handlePaginationQuery}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ResultsQuery;
