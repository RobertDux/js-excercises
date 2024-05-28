const locationsElem = document.querySelector(".js-locations");

function renderLocation(data, removeFn) {
  const name = data.name.length > 0 ? data.name : data.city;

  const container = document.createElement("div");
  container.classList.add("col-sm-4");

  const card = document.createElement("div");
  card.classList.add("card");
  container.appendChild(card);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.textContent = name;
  card.appendChild(cardHeader);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("lead");
  cardTitle.textContent = data.city;
  cardBody.appendChild(cardTitle);

  const cardButton = document.createElement("button");
  cardButton.classList.add("btn", "btn-sm", "btn-danger");
  cardButton.textContent = "Remove";
  cardButton.addEventListener("click", () => removeFn(data.key), false);
  cardBody.appendChild(cardButton);

  locationsElem.appendChild(container);
}

export function updateDOM(locations, removeFn) {
  locationsElem.replaceChildren();

  for (const location of locations) {
    renderLocation(location, removeFn);
  }
}
