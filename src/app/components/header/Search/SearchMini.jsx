import { useState } from "react";

import MiniSearch from "minisearch";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchMini({ data }) {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const clearInput = () => {
    setSearch("");
  };

  let miniSearch = new MiniSearch({
    fields: ["name", "commentsValue"],
    storeFields: ["id", "name"],
    searchOptions: {
      boost: { name: 2, commentsValue: 2 },
      fuzzy: 0.2,
    },
  });

  miniSearch.addAll(data);

  let result = miniSearch.search(search);

  return (
    <div>
      <div>
        <input
          type="text"
          className="form-control"
          value={search}
          onChange={handleChange}
        />
      </div>
      {result.length !== 0 && (
        <div className="result">
          {result.map((value) => {
            return (
              <Link
                key={value.id}
                className="dataItem"
                to={`/item/${value.id}`}
                onClick={clearInput}
              >
                <p>{value.name}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchMini;