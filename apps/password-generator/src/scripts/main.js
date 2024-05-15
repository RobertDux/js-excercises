(function () {
  const OPTIONS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-=_+[]{}:;,.<>/?",
  };

  const outputElem = document.querySelector(".js-password");
  const rangeElem = document.querySelector(".js-range");
  const lengthElem = document.querySelector(".js-length");
  const optionElems = document.querySelectorAll(".js-options input");
  const buttonElem = document.querySelector(".js-generate");
  const entropyElem = document.querySelector(".js-entropy");
  const strengthElem = document.querySelector(".js-strength");

  let length = 16;
  let options = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  };

  function pick(string) {
    return string.charAt(Math.floor(Math.random() * string.length));
  }

  function setLengthInDOM(length) {
    lengthElem.textContent = length;
  }

  function getSymbols() {
    let string = "";

    for (const option in options) {
      if (options[option]) {
        string += OPTIONS[option];
      }
    }

    return string;
  }

  function determineStrength(entropy) {
    if (entropy < 100) {
      return "bad";
    }

    if (entropy < 200) {
      return "good";
    }

    return "excellent";
  }

  function generatePassword() {
    const symbols = getSymbols();
    let password = "";

    if (!symbols.length) {
      return;
    }

    while (password.length < length) {
      password += pick(symbols);
    }

    const entropy = Math.log2(Math.pow(symbols.length, length));
    const strength = determineStrength(entropy);

    // show in DOM
    outputElem.textContent = password;
    entropyElem.textContent = Math.floor(entropy);
    strengthElem.textContent = strength;
    strengthElem.dataset.strength = strength;
  }

  buttonElem.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      generatePassword();
    },
    false
  );

  rangeElem.addEventListener(
    "input",
    function (e) {
      length = parseInt(e.currentTarget.value, 10);
      setLengthInDOM(length);
      generatePassword();
    },
    false
  );

  optionElems.forEach(function (elem) {
    elem.addEventListener(
      "input",
      function (e) {
        options[e.currentTarget.id] = e.currentTarget.checked;
        generatePassword();
      },
      false
    );
  });

  // Launch
  generatePassword();
})();
