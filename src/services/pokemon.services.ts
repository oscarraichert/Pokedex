
import { idText } from "typescript";
import { Pokemon } from "../pokemon/pokemon.model.js";
import { IPokemonServices } from "./pokemon.services.interface.js";

export class PokemonServices implements IPokemonServices {
    pokeApi: string;
    btnBuscar: HTMLButtonElement;

    constructor() {
        this.configurarElementos();
    }

    obterBaseStats(stats: any) {

        let statsHTML = document.getElementsByClassName('stat') as HTMLCollection;

        let htmlStats = Array.from(statsHTML);

        stats.forEach(stat => {

            htmlStats.forEach(htmlStat => {

                if (htmlStat.id.includes(stat.stat.name)) {
                    htmlStat.textContent = `${stat.stat.name} : ${stat.base_stat}`;
                }
            });
        });
    }

    mostrarBaseStats(pokemon: any): void {

        const sprite = document.getElementById("sprite") as HTMLImageElement;
        let nomePokemon = document.getElementById("nomePokemon") as HTMLParagraphElement;

        this.obterBaseStats(pokemon.stats);

        sprite.src = pokemon.sprites.front_default;
        nomePokemon.textContent = pokemon.name.toUpperCase();

        console.log(pokemon.stats);
    }

    async buscarPokemon() {
        const nomePokemon = this.obterNomePokemon();

        const response = await fetch(this.pokeApi + nomePokemon);

        const dados = await response.json();

        this.mostrarBaseStats(dados);
    }

    configurarElementos(): void {
        this.pokeApi = "https://pokeapi.co/api/v2/pokemon/";
        this.btnBuscar = document.getElementById("btnBuscar") as HTMLButtonElement;

        this.btnBuscar.addEventListener("click", (_evt) => this.buscarPokemon())
    }

    obterNomePokemon(): string {
        const txtBoxContent = document.getElementById("txtPokemon") as HTMLInputElement;

        const pokeName = txtBoxContent.value.toLowerCase();

        return pokeName;
    }
}