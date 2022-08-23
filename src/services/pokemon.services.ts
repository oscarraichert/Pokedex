
import { IPokemonServices } from "./pokemon.services.interface.js";

export class PokemonServices implements IPokemonServices {
    pokeApi: string;
    btnBuscar: HTMLButtonElement;

    constructor() {
        this.configurarElementos();
    }

    async buscarPokemon() {
        const nomePokemon = this.obterNomePokemon();

        const response = await fetch(this.pokeApi + nomePokemon);

        const dados = await response.json();

        const pokemon = dados.name;

        console.log(pokemon);
    }

    configurarElementos(): void {
        this.pokeApi = "https://pokeapi.co/api/v2/pokemon/";
        this.btnBuscar = document.getElementById("btnBuscar") as HTMLButtonElement;

        this.btnBuscar.addEventListener("click", (_evt) => this.buscarPokemon())
    }

    obterNomePokemon(): string {
        const txtBoxContent = document.getElementById("txtPokemon") as HTMLInputElement;

        const pokeName = txtBoxContent.value;

        console.log(pokeName);

        return pokeName;
    }
}