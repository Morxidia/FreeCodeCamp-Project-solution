const checkButton = document.getElementById('check-btn');
const textInput = document.getElementById('text-input');

function resultPrint(condition){
  const result = condition? "is a Palindrome" : "is not a Palindrome";
  const targetInputContainer = document.querySelector('#result');
  targetInputContainer.insertAdjacentHTML('beforeend', `${textInput.value} ${result}`);
}

function checkPalindrome(){
  let text = textInput.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  console.log(text);
  const lastIndex = text.length;
  let indexCheck = lastIndex;
  const targetInputContainer = document.querySelector('#result');
  if(targetInputContainer !== null){
    targetInputContainer.innerHTML = '';
  }
  if(lastIndex === 0){
    targetInputContainer.insertAdjacentHTML('beforeend', "Please input a value");
    alert("Please input a value");
    return;
  }
  for(let i of text){
    if(i != text[indexCheck-1]){
      resultPrint(false);
      return;
    }
    indexCheck --;
  }
  resultPrint(true);
}

checkButton.addEventListener("click", checkPalindrome);