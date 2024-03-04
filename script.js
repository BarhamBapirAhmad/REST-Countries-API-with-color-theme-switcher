const cardContainer = document.querySelector("main .container");
async function getData(query) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/${query}`);
    const data = await res.json();
    cardContainer.innerHTML = "";
    for (const country of data) {
      const card = createCountryCard(country);
      cardContainer.appendChild(card);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createCountryCard(country) {
  const card = document.createElement("a");
  card.classList.add(
    "shadow-md",
    "bg-white",
    "rounded-md",
    "cursor-pointer",
    "w-[280px]",
    "card"
  );
  card.href = `details.html?country=${country.name.official}`;
  card.innerHTML = `
    <img class="w-full rounded-t-md max-h-44" src="${country.flags.png}" alt="">
    <div class="p-6">
      <h2 class="text-lg font-extrabold mb-3">${country.name.official}</h2>
      <p class="font-bold">Population: <span class="font-medium">${country.population.toLocaleString()}</span></p>
      <p class="my-1 font-bold">Region: <span class="font-medium">${country.region}</span></p>
      <p class="font-bold">Capital: <span class="font-medium">${country.capital}</span></p>
    </div>`;
  return card;
}

// Page Loaded
document.addEventListener("DOMContentLoaded", async () => {
  await getData("all");
});

// Toggle Dark Mode
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("bg-veryLightGray");
  document.body.classList.toggle("bg-veryDarkBlueDark");
  document.body.classList.toggle("text-white");
  document.getElementsByTagName("header")[0].classList.toggle("bg-white");
  document.getElementsByTagName("header")[0].classList.toggle("bg-darkBlue");
  document.getElementById("search-input").classList.toggle("bg-white");
  document.getElementById("search-input").classList.toggle("bg-darkBlue");
  document.getElementById("filter").classList.toggle("bg-white");
  document.getElementById("filter").classList.toggle("bg-darkBlue");
  document.querySelectorAll("main .container > a").forEach((card) => {
    card.classList.toggle("bg-white");
    card.classList.toggle("bg-darkBlue");
  });
  document.querySelector("#filter ul").classList.toggle("bg-white");
  document.querySelector("#filter ul").classList.toggle("bg-darkBlue");
});

// Filter Select Toggle
const filter = document.getElementById("filter");
filter.addEventListener("mouseenter", () => {
  filter.querySelector("ul").classList.remove("hidden");
});

filter.addEventListener("mouseleave", () => {
  filter.querySelector("ul").classList.add("hidden");
});

// Filter Functionality
filter.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", async () => {
    const region = li.textContent;
    document.getElementById("filter-text").textContent = region;
    await getData(`region/${region.toLowerCase()}`);
  });
});

// Search Input
const input = document.querySelector("#search-input input");
input.addEventListener("input", async () => {
  await getData(input.value === "" ? "all" : `name/${input.value.toLowerCase()}`);
});
