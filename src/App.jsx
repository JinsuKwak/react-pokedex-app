import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";

function App() {
  const offset = 0;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=${offset}`;

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokeData();
  }, []);

  async function fetchPokeData() {
    try {
      const res = await axios.get(url);
      setPokemons(res.data.results);
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
    </article>
  );
}

export default App;
