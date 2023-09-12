import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    handleSearchInput(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchPokeData(true);
  }, []);

  async function fetchPokeData(isFirstFetch) {
    try {
      const offsetValue = isFirstFetch ? 0 : offset + limit;
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`;
      const res = await axios.get(url);
      setPokemons([...pokemons, ...res.data.results]);
      setOffset(offsetValue);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSearchInput(searchTerm) {
    setSearchTerm(searchTerm);
    if (searchTerm.length > 0) {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
        );
        const pokeData = {
          url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}`,
          name: searchTerm,
        };
        setPokemons([pokeData]);
        console.log(pokeData);
      } catch (e) {
        setPokemons([]);
        console.error(e);
      }
    } else {
      fetchPokeData(true);
    }
  }

  return (
    <article className="pt-6">
      <header
        className="flex flex-col gap-2 w-full
      px-4 z-50"
      >
        <div className="relative z-50">
          <form className="relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs w-[20.5rem] h-6 px-2 py-1 bg-[hsl(214,13%,47%)] rounded-lg text-gray-300 text-center"
            />
            <button
              type="submit"
              className="text-xs bg-slate-900 text-slate-300 w-[3.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700"
            >
              Search
            </button>
          </form>
        </div>
      </header>
      <section className="pt-6 flex flex-col justify-content overflow-auto z-0 items-center">
        Pokemon
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {pokemons.length > 0 ? (
            pokemons.map(({ url, name }, index) => (
              <PokeCard key={url} url={url} name={name} />
            ))
          ) : (
            <h2
              className="font-medium text-lg text-slate
            "
            >
              No Pokemons :(
            </h2>
          )}
        </div>
      </section>
      <div className="text-center">
        <button
          onClick={() => fetchPokeData(false)}
          className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
        >
          Load More
        </button>
      </div>
    </article>
  );
}

export default App;
