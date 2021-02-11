import Header from "./Header";
import Nav from "./Nav";
import Results from "./Results";
import ResultsDetails from "./ResultDetails";
import React, { useState } from "react";
import request from "./request";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./Search";
import axios from "./axios";
import { API_KEY } from "./request";
import ResultsQuery from "./ResultsQuery";

function App() {
  const [selectedOption, setSelectedOption] = useState(request.fetchTrending);
  const [nav, setNav] = useState("tendances");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [nbPage, setNbPage] = useState(0);
  const [pageQuery, setPageQuery] = useState(1);
  const [text, setText] = useState("");
  const [moviesQuery, setMoviesQuery] = useState([]);
  const [nbPageQuery, setNbPageQuery] = useState(0);

  const handlePagination = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handlePaginationQuery = (event, value) => {
    setPageQuery(value);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setPageQuery(1);
    if (text !== "") {
      fetchData();
    } else {
      setMoviesQuery([]);
      setNbPageQuery(0);
    }
  };

  async function fetchData() {
    if (text !== "") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&language=fr&page=${pageQuery}`
      );
      setNbPageQuery(response.data.total_pages);
      setMoviesQuery(response.data.results);
      return response;
    }
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header
              setMoviesQuery={setMoviesQuery}
              setNbPageQuery={setNbPageQuery}
              setText={setText}
              setMovies={setMovies}
              setNbPage={setNbPage}
              setPage={setPage}
              setSelectedOption={setSelectedOption}
            />
            <Nav
              setNav={setNav}
              nav={nav}
              setPage={setPage}
              setSelectedOption={setSelectedOption}
            />
            <Results
              page={page}
              selectedOption={selectedOption}
              movies={movies}
              setMovies={setMovies}
              setNbPage={setNbPage}
              nbPage={nbPage}
              handlePagination={handlePagination}
            />
          </Route>
          <Route path="/search">
            <Header
              setNav={setNav}
              setMoviesQuery={setMoviesQuery}
              setNbPageQuery={setNbPageQuery}
              setText={setText}
              setMovies={setMovies}
              setNbPage={setNbPage}
              setPage={setPage}
              setSelectedOption={setSelectedOption}
            />
            <Search
              text={text}
              setText={setText}
              handleSubmit={handleSubmit}
              fetchData={fetchData}
              pageQuery={pageQuery}
            />
            <ResultsQuery
              nbPageQuery={nbPageQuery}
              moviesQuery={moviesQuery}
              handlePaginationQuery={handlePaginationQuery}
              pageQuery={pageQuery}
              text={text}
              setMoviesQuery={setMoviesQuery}
              setText={setText}
              setPageQuery={setPageQuery}
              setNbPageQuery={setNbPageQuery}
            />
          </Route>
          <Route path="/details/:id">
            <Header
              setNav={setNav}
              setMoviesQuery={setMoviesQuery}
              setNbPageQuery={setNbPageQuery}
              setText={setText}
              setMovies={setMovies}
              setNbPage={setNbPage}
              setPage={setPage}
              setSelectedOption={setSelectedOption}
            />
            <ResultsDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
