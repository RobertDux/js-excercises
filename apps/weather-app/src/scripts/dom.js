const locationsElem = document.querySelector(".js-locations");

/**
 * Creates an HTML element with provided classes and/or text
 * @param {String} tag
 * @param {Array} classes
 * @param {String} text
 * @returns Element
 */
function buildElement(tag, classes = [], text = null) {
  const elem = document.createElement(tag);

  if (classes.length > 0) {
    elem.classList.add(...classes);
  }

  if (text) {
    elem.textContent = text;
  }

  return elem;
}

/**
 * Builds the DOM by adding cards with location and weather data
 * @param {Object} data
 * @param {Function} removeFn
 */
function renderLocation({ location, weather }, removeFn) {
  const name = location.name.length > 0 ? location.name : location.city;

  const container = buildElement("div", ["col-sm-4"]);
  const card = buildElement("div", ["card"]);
  container.appendChild(card);

  // Card
  const cardHeader = buildElement("div", ["card-header"], name);
  const cardBody = buildElement("div", ["card-body"]);
  const cardTitle = buildElement("h3", ["lead"], location.city);
  const image = buildElement("img");
  image.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" + weather.icon + "@2x.png"
  );
  const general = buildElement(
    "p",
    ["m-0"],
    "General: " + weather.general + "."
  );
  const temperature = buildElement(
    "p",
    ["m-0"],
    "Temperature: " + Math.round(weather.temperature) + " degrees."
  );
  const humidity = buildElement(
    "p",
    [],
    "Humidity: " + weather.humidity + "%."
  );
  const cardButton = buildElement(
    "button",
    ["btn", "btn-sm", "btn-danger"],
    "Remove"
  );
  cardButton.addEventListener("click", () => removeFn(location.key), false);
  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(image);
  cardBody.appendChild(general);
  cardBody.appendChild(temperature);
  cardBody.appendChild(humidity);
  cardBody.appendChild(cardButton);

  locationsElem.appendChild(container);
}

/**
 * Main render functions. (Re-)builds DOM on updates.
 * @param {Collection} data
 * @param {Function} removeFn
 */
export function updateDOM(data, removeFn) {
  locationsElem.replaceChildren();

  if (!data.length) {
    const text = buildElement("p", [], "Enter a city to get started.");
    return locationsElem.appendChild(text);
  }

  for (const element of data) {
    renderLocation(element, removeFn);
  }
}
