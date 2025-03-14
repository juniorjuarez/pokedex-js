let pokemonInfo = document.getElementById("pokemonInfo");
let input = document.getElementById("input-search").value.trim().toLowerCase();
const pokemonGrid = document.getElementById("listPokemon");

async function searchPokemon() {
  let input = document
    .getElementById("input-search")
    .value.trim()
    .toLowerCase();
  try {
    if (input === "") {
      pokemonInfo.innerHTML =
        "<p style='color:red;'>Digite o nome do Pokémon! 😢</p>";
      return;
    } else {
      let url = `https://pokeapi.co/api/v2/pokemon/${input}`;
      let req = await fetch(url);
      if (!req.ok) {
        pokemonInfo.innerHTML =
          "<p style='color:red;'>Pokémon não encontrado! 😢</p>";
        document.getElementById("input-search").value = "";
        return;
      } else {
        let json = await req.json();
        pokemonInfo.innerHTML = `
      <div class="card">
      <img src="${json.sprites.front_default}" alt="${json.name}">  
      <h3>${json.name}</h3>
      <p><strong>Altura</strong>: ${json.height} decímetros</p>
      <p><strong>Peso:</strong> ${json.weight} hectogramas</p>
      <p><strong>Experiência</strong> base: ${json.base_experience}</p>
      <button onclick="pokemonInfo.innerHTML = ''" class="close">X</button>
      </div>
        `;
        document.getElementById("input-search").value = "";
      }
    }
  } catch (error) {
    console.error(`Error ao buscar pokemon: ${error}`);
  }
}

// async function allPokemons() {
//   try {
//     const urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=200";
//     const req = await fetch(urlPokemon);
//     const json = await req.json();

//     json.results.forEach(async (pokemon) => {
//       const pokemonReq = await fetch(pokemon.url);
//       const pokemonJson = await pokemonReq.json();
//       const pokemonImg = pokemonJson.sprites.front_default;
//       const pokemonGrid = document.getElementById("listPokemon");

//       pokemonGrid.innerHTML += `
//       <div class="cardListItem">
//       <img src="${pokemonImg}" alt="${pokemon.name}">
//       <h3>${pokemon.name}</h3>
//       </div>
//       `;
//     });
//   } catch (error) {
//     consle.log(`Error ao buscar pokemons: ${error}`);
//   }
// }
async function allPokemons(limit, offset) {
  try {
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const req = await fetch(urlPokemon);
    const json = await req.json();

    json.results.forEach(async (pokemon) => {
      const pokemonReq = await fetch(pokemon.url);
      const pokemonJson = await pokemonReq.json();
      const pokemonImg = pokemonJson.sprites.front_default;
      const pokemonGrid = document.getElementById("listPokemon");

      pokemonGrid.innerHTML += `
      <div class="cardListItem">
      <img src="${pokemonImg}" alt="${pokemon.name}">
      <h3>${pokemon.name}</h3>
      </div>
      `;
    });
  } catch (error) {
    consle.log(`Error ao buscar pokemons: ${error}`);
  }
}

allPokemons(40, 0);

const state = {
  page: parseInt(document.querySelector(".pageNumbers").textContent),
  offset: 0,
  limit: 40,
};

const controls = {
  next() {
    state.page++;
    document.querySelector(".pageNumbers").textContent = state.page;
    state.offset = state.page * state.limit;

    pokemonGrid.innerHTML = "";
    allPokemons(state.limit, state.offset);
    if (true) {
    }
  },
  prev() {
    if (state.page > 1) {
      state.page--;
      document.querySelector(".pageNumbers").textContent = state.page;
      state.offset = state.page * 20;
      pokemonGrid.innerHTML = "";
      allPokemons(state.limit, state.offset);
    }
  },
  goTo() {},
};
