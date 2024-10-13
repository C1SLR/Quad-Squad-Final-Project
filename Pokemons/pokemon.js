async function fetchPokemonData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    const pokemonList = data.results;

    const pokemonContainer = document.getElementById("pokemon_data");

    for (const pokemon of pokemonList) {
      const pokemonUrl = pokemon.url;
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon_card");

      const fetchPokemonDetails = async () => {
        const detailsResponse = await fetch(pokemonUrl);
        if (!detailsResponse.ok) {
          throw new Error(`Error fetching details: ${detailsResponse.status}`);
        }
        const detailsData = await detailsResponse.json();

        const pokemonImage = document.createElement("img");
        pokemonImage.classList.add("pokemon_image");
        pokemonImage.src = detailsData.sprites.front_default;
        pokemonCard.appendChild(pokemonImage);

        const pokemonName = document.createElement("p");
        pokemonName.textContent = pokemon.name;
        pokemonCard.appendChild(pokemonName);
      };

      fetchPokemonDetails(); // Call the inner function to fetch details

      pokemonContainer.appendChild(pokemonCard);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchPokemonData();

async function fetchRandomPokemonData() {
  try {
    const totalPokemonCountResponse = await fetch(
      "https://pokeapi.co/api/v2/pokemon/"
    );
    const totalPokemonCountData = await totalPokemonCountResponse.json();
    const totalPokemonCount = totalPokemonCountData.count;

    const randomPokemonId = Math.floor(Math.random() * totalPokemonCount) + 1;

    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
    );
    if (!pokemonResponse.ok) {
      throw new Error(`Network response was not ok: ${pokemonResponse.status}`);
    }
    const pokemonData = await pokemonResponse.json();

    const pokemonContainer = document.getElementById("pokemon_random_data");
    pokemonContainer.innerHTML = "";

    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon_random_card");

    const pokemonImageBack = document.createElement("img");
    pokemonImageBack.classList.add("pokemon_random_image");
    pokemonImageBack.src = pokemonData.sprites.back_default;
    pokemonCard.appendChild(pokemonImageBack);

    const pokemonImageFront = document.createElement("img");
    pokemonImageFront.classList.add("pokemon_random_image");
    pokemonImageFront.src = pokemonData.sprites.front_default;
    pokemonCard.appendChild(pokemonImageFront);

    const pokemonName = document.createElement("p");
    pokemonName.innerHTML = `<p class="random_data_hover"><b>Name:</b> ${pokemonData.name}</p>`;
    pokemonCard.appendChild(pokemonName);

    const pokemonId = document.createElement("p");
    pokemonId.innerHTML =`<p class="random_data_hover"><b>Pokedex ID:</b> ${pokemonData.id}</p>`;
    pokemonCard.appendChild(pokemonId);

    const pokemonType = document.createElement("p");
    pokemonType.innerHTML = `<p class="random_data_hover"><b>Type:</b> ${pokemonData.types
      .map((type) => type.type.name)
      .join(", ")}</p>`;
    pokemonCard.appendChild(pokemonType);

    const pokemonWeight = document.createElement("p");
    pokemonWeight.innerHTML = `
    <p class="random_data_hover"><b>Weight:</b> ${pokemonData.weight} Kg</p>`;
    pokemonCard.appendChild(pokemonWeight);

    const pokemonAbilities = document.createElement("p");
    const numAbilitiesToShow = Math.floor(Math.random() * 3) + 1;
    const displayedAbilities = pokemonData.abilities.slice(
      0,
      numAbilitiesToShow
    );
    pokemonAbilities.innerHTML = `
  <p class="random_data_hover"><b>Abilities:</b></p>
  <ul>
    ${displayedAbilities
      .map(
        (ability) =>
          `<li class="random_data_hover">${ability.ability.name}</li>`
      )
      .join("")}
  </ul>`;
    pokemonCard.appendChild(pokemonAbilities);

    const pokemonStats = document.createElement("p");
    pokemonStats.innerHTML = `
  <p class="random_data_hover"><b>Stats:</b></p>
  <ul>
    <li class="random_data_hover"><b>HP:</b> ${pokemonData.stats[0].base_stat}</li>
    <li class="random_data_hover"><b>Attack:</b> ${pokemonData.stats[1].base_stat}</li>
    <li class="random_data_hover"><b>Defense:</b> ${pokemonData.stats[2].base_stat}</li>
    <li class="random_data_hover"><b>Special Attack:</b> ${pokemonData.stats[3].base_stat}</li>
    <li class="random_data_hover"><b>Special Defense:</b> ${pokemonData.stats[4].base_stat}</li>
    <li class="random_data_hover"><b>Speed:</b> ${pokemonData.stats[5].base_stat}</li>
  </ul>`;
    pokemonCard.appendChild(pokemonStats);

    pokemonContainer.appendChild(pokemonCard);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const showRandomPokemonButton = document.getElementById("show-random-pokemon");
showRandomPokemonButton.addEventListener("click", fetchRandomPokemonData);
