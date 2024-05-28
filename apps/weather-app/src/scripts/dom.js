const locationsElem = document.querySelector(".js-locations");

function renderLocation({ location, weather }, removeFn) {
  const name = location.name.length > 0 ? location.name : location.city;

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
  cardTitle.textContent = location.city;
  cardBody.appendChild(cardTitle);

  const cardText = document.createElement("p");
  cardText.classList.add("my-4");
  cardText.textContent = "Temperature: " + weather.temperature + " degrees.";
  cardBody.appendChild(cardText);

  const cardButton = document.createElement("button");
  cardButton.classList.add("btn", "btn-sm", "btn-danger");
  cardButton.textContent = "Remove";
  cardButton.addEventListener("click", () => removeFn(location.key), false);
  cardBody.appendChild(cardButton);

  locationsElem.appendChild(container);
}

export function updateDOM(data, removeFn) {
  locationsElem.replaceChildren();

  for (const element of data) {
    renderLocation(element, removeFn);
  }
}
