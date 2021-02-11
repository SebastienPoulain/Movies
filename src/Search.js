import React, { useEffect } from "react";
import "./Search.css";

function Search({ text, handleSubmit, setText, fetchData, pageQuery }) {
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [pageQuery]);

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className="search__input"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Entrez le film"
          type="text"
          autoFocus
        />
      </form>
    </div>
  );
}

export default Search;
