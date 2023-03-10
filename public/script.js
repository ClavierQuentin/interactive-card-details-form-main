let inputList = document.querySelectorAll("input");

function ValidateCreditCardNumber(cardNumber) {

    let visaRegEx = /^[0-9]{16}$/;
    let isValid = false;

    let cardNumberToTest = cardNumber.split(" ").join("");
    if (visaRegEx.test(cardNumberToTest)) {
      isValid = true;
    }
  
    if(!isValid) {
       document.getElementById("numberError").textContent = "Wrong format, number only";
       document.getElementById("number").classList.add("errorBorder");
    }
    else{
      document.getElementById("numberError").textContent = "";
      document.getElementById("number").classList.remove("errorBorder");

    }
}

function displayValuesFromInput(inputName, value){
  let cardNumber = value.split(" ").join("");
  if(inputName == "number"){
    let str = "";
    for(i = 0; i < cardNumber.length; i++){
        str += cardNumber.substring(i, i+4) + " ";
        i = i + 3; 
    }
    let span = document.getElementById("numberSpan");
    span.textContent = str;
  } else{
    let span = document.getElementById(inputName + "Span");
    span.textContent = value.toUpperCase();
  }
}

inputList.forEach(element => {
    element.addEventListener("input", () => {
      displayValuesFromInput(element.name, element.value);
      if(element.classList.contains("errorBorder")){
        element.classList.remove("errorBorder");
        if(element.name == "month" || element.name == "year"){
          document.getElementById("dateError").textContent = "";
        }
        else{
          document.getElementById(element.name + "Error").textContent = "";
        }
      }
    });
});

document.getElementById("btn").addEventListener('click', () => {

    let form = document.querySelector("form");
    let formData = new FormData(form);
    let isFormValidated = true;   
    let monthIsEmpty = false;
    for(const [key, value] of formData){
        let valueIsNull = value == "" ? true : false;
        if(valueIsNull){
            if(key == "month" || key == "year"){
              monthIsEmpty = true;
                document.getElementById("dateError").textContent = "Can't be blank";
            } else{
                document.getElementById(key + "Error").textContent = "Can't be blank";
            }
            document.getElementById(key).classList.add("errorBorder");
            isFormValidated = false;
        } else{
          document.getElementById(key).classList.remove("errorBorder") ;
          if(key == "month" || key == "year"){
            if(monthIsEmpty){
              document.getElementById("dateError").textContent = "Can't be blank";
            }else{
              document.getElementById("dateError").textContent = "";
            }
          } else{
            document.getElementById(key + "Error").textContent = "";
          }
        }
    }

    if(isFormValidated){
      ValidateCreditCardNumber(formData.get("number"));
    }

    if(isFormValidated){
      for(const [key, value] of formData){
        displayValuesFromInput(key, value);
      }
      form.style.display = "none";
      document.getElementById("completeStateDiv").style.display = "flex";
    }
});

document.getElementById("btnReset").addEventListener("click", () => {
  location.reload();
})

