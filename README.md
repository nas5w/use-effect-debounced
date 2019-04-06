# useEffectDebounced

This repository demonstrates creating a custom hook called `useEffectDebounced`. It works just like `useEffect` except the function you pass to `useEffectDebounced` only be executed after a user-specified amount of time (and only if the the parameters on which the effect depends do not change).

## Implementation

the `useEffectDebounced` hook is implemented as follows:

```javascript
import { useEffect } from "react";

const useEffectDebounced = (func, values, time) => {
  useEffect(() => {
    let db = setTimeout(() => {
      func();
    }, time);

    return () => clearTimeout(db);
  }, values);
};

export default useEffectDebounced;
```

The passed function `func` is executed in a `setTimeout` after the user specified `time`. However, if one of the `values` the hook depends on is changed, the clean-up function `() => clearTimeout(db)` is executed, meaning `func` will not execute.

## Example Usage

This application includes an example usage in which a textbox is used to filter through a list of countries. The filtering is done in the `useEffectDebounced` hook, meaning the filtering will not occur until the specified period of time has passed without additional changes to the textbox.

```javascript
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
```

![Countries being filtered with debounce](https://i.imgur.com/sEOFZH8.gif)

## Feedback

I would appreciate any feedback you have on this custom hook!
