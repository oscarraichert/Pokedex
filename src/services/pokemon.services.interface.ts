export interface IPokemonServices {

    pokeApi: string;
    btnBuscar: HTMLButtonElement;

    obterNomePokemon(): string;
    buscarPokemon(): void;
    configurarElementos(): void;
}