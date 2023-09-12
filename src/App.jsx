import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";

function App() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [pokemons, setPokemons] = useState([]);

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

  return (
    <article className="pt-6">
      <header
        className="flex flex-col gap-2 w-full
      px-4 z-50"
      >
        Input form
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
