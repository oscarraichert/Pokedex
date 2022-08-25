
import { idText } from "typescript";
import { IPokemonServices } from "./pokemon.services.interface.js";

export class PokemonServices implements IPokemonServices {
    pokeApi: string;
    btnBuscar: HTMLButtonElement;

    constructor() {
        this.configurarElementos();
    }

    mostrarBaseStats(stats: any) {

        let list = document.getElementById('stats');

        stats.forEach(stat => {

            let listItem = document.createElement('li');

            list.appendChild(listItem);

            listItem.innerText = `${stat.stat.name.toUpperCase()} : ${stat.base_stat}`;
        });
    }

    mostrarSpriteNome(pokemon: any): void {

        const sprite = document.getElementById("sprite") as HTMLImageElement;
        let nomePokemon = document.getElementById("nomePokemon") as HTMLParagraphElement;

        this.mostrarBaseStats(pokemon.stats);

        sprite.src = pokemon.sprites.front_default;
        nomePokemon.textContent = pokemon.name.toUpperCase();

        console.log(pokemon.stats);
    }

    async buscarPokemon() {

        this.clearStats();

        const nomePokemon = this.obterNomePokemon();

        const response = await fetch(this.pokeApi + nomePokemon);

        const dados = await response.json();

        this.mostrarSpriteNome(dados);
    }

    private clearStats() {
        let statList = document.getElementById('stats');

        let stats = Array.from(statList.children);

        stats.forEach(stat => {
            stat.remove();
        });
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