import { useEffect, useState } from "react";
import "../../index.css";
import axios from "axios";
import PokeCard from "../../components/PokeCard";
import AutoComplete from "../../components/AutoComplete";

function MainPage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  const limitNum = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  useEffect(() => {
    fetchPokeData();
  }, []);

  const filterDisplayedPokeData = (allPokemons, displayedPokemons = []) => {
    const limit = displayedPokemons.length + limitNum;
    const pokeArr = allPokemons.filter((pokemon, index) => index + 1 <= limit);
    return pokeArr;
  };

  async function fetchPokeData() {
    try {
      const res = await axios.get(url);
      setAllPokemons(res.data.results);
      setDisplayedPokemons(filterDisplayedPokeData(res.data.results));
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
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <section className="pt-6 flex flex-col justify-content overflow-auto z-0 items-center">
        Pokemon
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }, index) => (
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
        {allPokemons.length > displayedPokemons.length &&
          displayedPokemons.length !== 1 && (
            <button
              onClick={() =>
                setDisplayedPokemons(
                  filterDisplayedPokeData(allPokemons, displayedPokemons)
                )
              }
              className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
            >
              Load More
            </button>
          )}
      </div>
    </article>
  );
}

export default MainPage;
