
import { Pokemon } from "../pokemon/pokemon.model.js";
import { IPokemonServices } from "./pokemon.services.interface.js";

export class PokemonServices implements IPokemonServices {
    pokeApi: string;
    btnBuscar: HTMLButtonElement;

    constructor() {
        this.configurarElementos();
    }

    obterBaseStats(dados: any): void {

        const pokemon = new Pokemon();
        pokemon.name = dados.name;
        pokemon.baseStats = dados.stats;

        const sprite = document.getElementById("sprite") as HTMLImageElement;
        let nomePokemon = document.getElementById("nomePokemon") as HTMLParagraphElement;

        nomePokemon.textContent = pokemon.name.toUpperCase();
        sprite.src = dados.sprites.front_default;

        console.log(dados.sprites.front_default);

    }

    async buscarPokemon() {
        const nomePokemon = this.obterNomePokemon();

        const response = await fetch(this.pokeApi + nomePokemon);

        const dados = await response.json();

        this.obterBaseStats(dados);
    }

    configurarElementos(): void {
        this.pokeApi = "https://pokeapi.co/api/v2/pokemon/";
        this.btnBuscar = document.getElementById("btnBuscar") as HTMLButtonElement;

        this.btnBuscar.addEventListener("click", (_evt) => this.buscarPokemon())
    }

    obterNomePokemon(): string {
        const txtBoxContent = document.getElementById("txtPokemon") as HTMLInputElement;

        const pokeName = txtBoxContent.value;

        return pokeName;
    }
}