const passwordDisplay = document.querySelector(".password");
const copyButton = document.querySelector(".btn-one");

const charCount = document.querySelector(".char-length");
const charSlider = document.querySelector("input[type=range]");
const uppercaseLetters = document.getElementById("chk1");
const lowercaseLetters = document.getElementById("chk2");
const incluceNumbers = document.getElementById("chk3");
const includeSymbols = document.getElementById("chk4");
const form = document.querySelector("#passwordGeneratorForm");
const strengthValue = document.querySelector(".value");
const generateButton = document.querySelector(".generator");

charSlider.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(e) {
  const value = e.target.value;
  charSlider.value = value;
  charCount.innerHTML = value;
}

const uppercaseCharCode = arrayFromLowToHigh(65, 90);
const lowercaseCharCode = arrayFromLowToHigh(97, 122);
const numbersCharCode = arrayFromLowToHigh(48, 57);
const symbolsCharCode = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !uppercaseLetters.checked &&
    !lowercaseLetters.checked &&
    !incluceNumbers.checked &&
    !includeSymbols.checked
  ) {
    alert("Please select at least one checkbox.");
    return;
  }

  const characterAmount = charSlider.value;
  const uppercase = uppercaseLetters.checked;
  const lowercase = lowercaseLetters.checked;
  const numbers = incluceNumbers.checked;
  const symbols = includeSymbols.checked;
  const password = generatePassword(
    characterAmount,
    uppercase,
    lowercase,
    numbers,
    symbols
  );
  passwordDisplay.innerText = password;
  console.log(password);
});

function generatePassword(
  characterAmount,
  uppercase,
  lowercase,
  numbers,
  symbols
) {
  let charCodes = [];
  if (lowercase) charCodes = charCodes.concat(lowercaseCharCode);
  if (uppercase) charCodes = charCodes.concat(uppercaseCharCode);
  if (numbers) charCodes = charCodes.concat(numbersCharCode);
  if (symbols) charCodes = charCodes.concat(symbolsCharCode);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

const copyBtn = document.querySelector(".copy-icon");
const alertText = document.querySelector(".copy-alert");
copyBtn.addEventListener("click", () => {
  const copyText = passwordDisplay.innerText;
  navigator.clipboard.writeText(copyText).then(
    () => {
      alertText.classList.add("show-copy-alert");
      setTimeout(() => {
        alertText.classList.remove("show-copy-alert");
      }, 1500);
    },
    () => {
      alert("Copy failed.");
    }
  );
});
