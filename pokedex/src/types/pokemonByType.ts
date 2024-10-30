import { Pokemon } from "./pokemon";

export interface PokemonType {
    pokemon: PokemonElement[];
}

export interface PokemonElement {
    pokemon: Pokemon;
    slot:    number;
}
