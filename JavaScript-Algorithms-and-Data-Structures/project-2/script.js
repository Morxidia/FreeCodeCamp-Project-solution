const inputNumber = document.getElementById("number");
const convertButton = document.getElementById('convert-btn');
const result = document.getElementById("output");

const romanNumber = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
]

const decimalToRoman = (input) => {
  for(let i = 0; i < romanNumber.length; i++){
    if(input >= romanNumber[i][1]){
      if(input-romanNumber[i][1] === 0){
        return romanNumber[i][0];
      }
      else{
        return romanNumber[i][0] + decimalToRoman(input-romanNumber[i][1]);
      }
    }
  }
};

const checkUserInput = () => {
  const inputValue = parseInt(inputNumber.value);
  if(inputNumber.value < 0){
    result.innerText = "Please enter a number greater than or equal to 1";
    result.classList.add("alert");
    return;
  }
  else if(inputNumber.value === ""){
    result.innerText = "Please enter a valid number";
    result.classList.add("alert");
    return;
  }
  else if(inputNumber.value >= 4000){
    result.innerText = "Please enter a number less than or equal to 3999";
    result.classList.add("alert");
    return;
  }
  result.classList.remove("alert");
  result.innerText = decimalToRoman(inputValue);
  inputNumber.innerText = "";

}

convertButton.addEventListener("click", checkUserInput)

inputNumber.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    checkUserInput();
  }
});