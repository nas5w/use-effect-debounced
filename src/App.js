import React, { useState } from "react";
import useEffectDebounced from "./useEffectDebounced";
import countries from "./countries";

const App = () => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [search, setSearch] = useState("");

  useEffectDebounced(
    () => {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filtered);
    },
    [search],
    1000
  );

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <ul>
        {filteredCountries &&
          filteredCountries.map((country, index) => {
            return <li key={index}>{country.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default App;
