const locationsElem = document.querySelector(".js-locations");

function renderLocation(data) {
  const name = data.name.length > 0 ? data.name : data.location;

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
  cardTitle.classList.add("card-title");
  cardTitle.textContent = data.location;
  cardBody.appendChild(cardTitle);

  locationsElem.appendChild(container);
}

export function updateDOM(locations) {
  locationsElem.replaceChildren();

  for (const location of locations) {
    renderLocation(location);
  }
}
