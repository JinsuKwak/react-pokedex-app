import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../assets/Loading";
import { LessThan } from "../../assets/LessThan";
import { GreaterThan } from "../../assets/GreaterThan";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../../assets/ArrowLeft";
import { Balance } from "../../assets/Balance";
import { Vector } from "../../assets/Vector";
import Type from "../../components/Type";

const DetailPage = () => {
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const pokeID = params.id;
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
  const bg = `bg-${pokemon?.types?.[0]}`;
  const text = `text-${pokemon?.types?.[0]}`;

  useEffect(() => {
    fetchPokeData();
  }, []);

  const formatPokeAbilities = (abilities) => {
    return abilities
      .filter((_, index) => index <= 1)
      .map((obj) => obj.ability.name.replaceAll("-", ""));
  };

  const formatPokeStats = ([
    statHP,
    statATT,
    statDEF,
    statSATT,
    statSDEF,
    statSPD,
  ]) => [
    { name: "Hit Points", baseStat: statHP.base_stat },
    { name: "Attack", baseStat: statATT.base_stat },
    { name: "Defence", baseStat: statDEF.base_stat },
    { name: "Special Attack", baseStat: statSATT.base_stat },
    { name: "Special Defense", baseStat: statSDEF.base_stat },
    { name: "Speed", baseStat: statSPD.base_stat },
  ];

  async function getNextPrevPoke(id) {
    const urlPoke = `${baseUrl}?limit=1&offset=${id - 1}`;
    await axios.get(urlPoke);
    const { data: pokeData } = await axios.get(urlPoke);
    const nextRes = pokeData.next && (await axios.get(pokeData.next));
    const prevRes = pokeData.previous && (await axios.get(pokeData.previous));
    return {
      next: nextRes?.data?.results?.[0]?.name,
      prev: prevRes?.data?.results?.[0]?.name,
    };
  }

  async function fetchPokeData() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
    try {
      const { data: pokeData } = await axios.get(url);
      if (pokeData) {
        const { name, id, types, weight, height, stats, abilities } = pokeData;
        const nextPrevPoke = await getNextPrevPoke(id);

        const DmgRel = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get(i.type.url);
            return type.data.damage_relations;
          })
        );

        const formattedPokeData = {
          id,
          name,
          weight: weight / 10,
          height: height / 10,
          types: types.map((type) => type.type.name),
          prev: nextPrevPoke.prev,
          next: nextPrevPoke.next,
          abilities: formatPokeAbilities(abilities),
          stats: formatPokeStats(stats),
          DmgRel,
        };

        setPokemon(formattedPokeData);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="absolute h-auto w-auto top-1/3 -translate-x-1/2 left-1/2 z-50">
        <Loading className="w-12 h-12 z-50 animate-spin text-slate-900" />
      </div>
    );
  }

  if (!isLoading && !pokemon) {
    return <div>Pokemon Not Found</div>;
  }

  return (
    <article className="flex items-center gap-1 flex-col w-full">
      <div
        className={`${bg} w-auto h-full flex flex-col z-0 items-center just relative overflow-hidden`}
      >
        {pokemon.prev && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 left-1"
            to={`pokemon/${pokemon.prev}`}
          >
            <LessThan className="w-5 h-8 p-1" />
          </Link>
        )}

        {pokemon.next && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 right-1"
            to={`pokemon/${pokemon.next}`}
          >
            <GreaterThan className="w-5 h-8 p-1" />
          </Link>
        )}

        <section className="w-full flex flex-col z-20 items-center justify-end relative h-full">
          <div className="absolute z-30 top-6 flex items-center w-full justify-between px-2">
            <div className="flex items-center gap-1">
              <Link to="/">
                <ArrowLeft className="w-6 h-8 text-zinc-200" />
              </Link>
              <h1 className="text-zinc-200 font-bold text-xl capitalize">
                {pokemon.name}
              </h1>
            </div>
            <div className="text-zinc-200 font-bold text-md">
              #{pokemon.id.toString().padStart(3, "00")}
            </div>
          </div>

          <div className="relative h-auto max-w-[15.5rem] z-20 mt-6 -mb-16">
            <img
              src={img}
              width="100%"
              height="auto"
              loading="lazy"
              alt={pokemon.name}
              className={`object-contain h-full cursor-pointer`}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </section>
        <section className="w-full min-h-[65%] h-full bg-gray-800 z-10 pt-14 flex flex-col items-center gap-3 px-5 pb-4">
          <div className="flex items-center justify-center gap-4">
            {pokemon.types.map((type) => (
              <Type key={type} type={type} />
            ))}
          </div>
          <h2 className={`text-base font-semibold ${text}`}>Info</h2>
          <div className="flex w-full items-center justify-between max-w-[400px] text-center">
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-100">Weight</h4>
              <div className="text-sm flex mt-1 gap-2 justify-center text-zinc-200">
                <Balance />
                {pokemon.weight}kg
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-100">Weight</h4>
              <div className="text-sm flex mt-1 gap-2 justify-center text-zinc-200">
                <Vector />
                {pokemon.height}m
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-[0.5rem] text-zinc-100">Weight</h4>
              {pokemon.abilities.map((ability) => (
                <div
                  key={ability}
                  className="text-[0.5rem] text-zinc-100 capitalize"
                >
                  {ability}
                </div>
              ))}
            </div>
          </div>

          <h2 className={`text-base font-semibold ${text}`}>Base Stat</h2>
          <div className="w-full">STAT</div>
          {pokemon.DmgRel && (
            <div className="w-10/12">
              <h2 className={`text-base font-semibold text-center ${text}`}>
                Type Effectiveness
              </h2>
              Damage
            </div>
          )}
        </section>
      </div>
    </article>
  );
};

export default DetailPage;
