import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";

type PokemonGridProps = {
  nameFilter: string;
  selected: string;
};

export default function PokemonGrid({
  nameFilter,
  selected,
}: PokemonGridProps) {
  const [allPokemons, setAllPokemons] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const handleGetAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    // 下面这个函数，使你点一下load more就能update loadMore的state, 每次都能load 20个pokemon
    setLoadMore(data.next);

    function createPokemonObject(result: any[]) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        // 用speard operator ... 让新的data不取代原来的array, 而是Push到原有的array中
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    handleGetAllPokemons();
  }, []);

  return (
    <div className="PokemonGrid-container">
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon: any, index) =>
            selected === ""
              ? pokemon.name.startsWith(nameFilter) && (
                  <PokemonCard
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other.dream_world.front_default}
                    type={pokemon.types[0].type.name}
                    key={index}
                  />
                )
              : pokemon.name.startsWith(nameFilter) &&
                pokemon.types.some(
                  (typeArray: { type: { name: string } }) =>
                    typeArray.type.name === selected
                ) && (
                  <PokemonCard
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other.dream_world.front_default}
                    type={pokemon.types[0].type.name}
                    key={index}
                  />
                )
          )}
        </div>
        <button className="load-more" onClick={() => handleGetAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
}
