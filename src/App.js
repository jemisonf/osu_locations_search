import React, { useState } from "react";
import "./App.css";
import { Location } from "./Location";
import { TypeSelect } from "./TypeSelect";

/**
 *
 * @param {string} query
 * @param {object[]} types
 * @returns {Promise<[]object} An array of locations objects
 */
async function fetchLocations(query) {
  const { data } = await fetch(`http://localhost:5000/query?q=${query}`, {
    method: "GET",
  }).then((res) => res.json());
  return data;
}

// Valid options are: building, dining, cultural-center, parking, and other.
const presetTypes = [
  {
    name: "building",
    active: true,
  },
  {
    name: "dining",
    active: true,
  },
  {
    name: "cultural-center",
    active: true,
  },
  {
    name: "parking",
    active: true,
  },
  {
    name: "other",
    active: true,
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [types, setTypes] = useState(presetTypes);

  const updateSearchResults = async (search, types) => {
    const data = await fetchLocations(search, types);
    setLocations(data);
  };

  const onSearchChange = async (e) => {
    setSearch(e.target.value);
    updateSearchResults(e.target.value, types);
  };

  const updateTypes = (name, active) => {
    const newTypes = [...types].map((type) =>
      type.name === name ? { name, active } : type
    );
    console.log(newTypes);
    setTypes(newTypes);
    updateSearchResults(search, types);
  };

  return (
    <div className="App">
      <div className="search">
        <form>
          <input
            type="text"
            onChange={onSearchChange}
            placeholder="Search . . ."
            value={search}
          ></input>
        </form>
        <TypeSelect types={types} setType={updateTypes}></TypeSelect>
      </div>
      <div className="results">
        {locations.map((location) => {
          return (
            <Location key={location.id} attributes={location.attributes} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
