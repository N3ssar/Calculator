// Light/Dark Theme
const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () =>
  toggleElement.classList.toggle("themes__toggle--isActive");

const toggleDarkThemeWithEnter = (event) => {
  event.key === "Enter" && toggleDarkTheme();
};

toggleElement.addEventListener("keydown", toggleDarkThemeWithEnter);
toggleElement.addEventListener("click", toggleDarkTheme);

// Logic for calculator
let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
    resultElement.innerText = !value ? "0" : value;

    if (resultElement.innerText.length > 17) {
        resultElement.classList.add('shrink');
    } else {
        resultElement.classList.remove('shrink');
    }
    
     
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  if (currentNumber.length === 18) return;
  console.log(currentNumber);
  currentNumber += value;
  updateScreen(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;

  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }

  updateScreen(currentNumber);
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = storedNumber.toString(); // Store the result as currentNumber
    updateScreen(currentNumber);
  }
};

const operationButtonHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;

  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;

    if (currentNumber) executeOperation();
  }
};

const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;

    if (type === "number") {
      numberButtonHandler(element.dataset.value);
    } else if (type === "operation") {
      switch (element.dataset.value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
      }
    }
  });
};

keyElements.forEach(keyElementsHandler);

// Use keyboard as input source
const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availableOperations = ["+", "-", "*", "/","Backspace","Enter","c"];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
];

window.addEventListener("keydown", (event) => {
  //   keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
});

const keyboardWithoutHover = (key) => {
  if (availableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (availableOperations.includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Backspace") {
    deleteButtonHandler();
  } else if (key === "Enter") {
    executeOperation();
  } else if (key === "c") {
    resetButtonHandler();
  }
};


const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add("hover");
    elem.click();//Simulate Click Action
    setTimeout(() => elem.classList.remove("hover"), 300);
  }
};