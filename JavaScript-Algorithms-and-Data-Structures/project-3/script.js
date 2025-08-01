const numberInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
const btnUp = document.getElementById("scroll-up-btn");
const btnDown = document.getElementById("scroll-down-btn");


let resultNumber = 0;

const updateResult = (condition) => {
  const el = document.createElement("p");
  el.id = `result-${resultNumber}`;
  result.prepend(el);
  const text = condition? `Valid US number: ${numberInput.value}`: `Invalid US number: ${numberInput.value}`;
  // el.textContent = text;
  let i = 0;
  let speed = 50;
  const addText = () =>{
    if(i < text.length){
      el.textContent += text.charAt(i);
      i++;
      setTimeout(addText, speed);
    }
  }
  addText();
  resultNumber++;
}

const validateNumber = () => {
  const input = numberInput.value;
  const region = '^(1\\s?)?';
  const area = '([\\d.]{3}|\\([\\d.]{3}\\))';
  const separator = '([\\s\\-])?';
  const localNumber = '([\\d.]{3}[\\s\\-]?[\\d.]{4})$';
  const regExp = new RegExp(`${region}${area}${separator}${localNumber}`);
  const numberValid = regExp.test(input)
  
  updateResult(numberValid);
}

const checkResult = () => {
  if(numberInput.value === ""){
    window.alert("Please provide a phone number");
    return
  }
  validateNumber();
  numberInput.value = "";
  return
}

const clearResult = () => {
  result.innerHTML = "";
}

checkBtn.addEventListener("click", checkResult);
clearBtn.addEventListener("click", clearResult);
numberInput.addEventListener("keypress", event => {
  if(event.key === "Enter"){
    event.preventDefault();
    checkResult();
  }
})

btnUp.addEventListener("click", () => {result.scrollBy(0, -100)});
btnDown.addEventListener("click", () => {result.scrollBy(0, 100)});


