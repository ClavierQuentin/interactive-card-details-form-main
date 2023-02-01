let errorBorderColor = "hsl(0, 100%, 66%)";

let inputList = document.querySelectorAll("input");

function ValidateCreditCardNumber(cardNumber) {

    var visaRegEx = /^[0-9]{16}$/;
    var isValid = false;
    if (visaRegEx.test(cardNumber.split(" ").join(""))) {
      isValid = true;
    }
  
    if(!isValid) {
       document.getElementById("numberError").textContent = "Wrong format, number only";
       document.getElementById("number").style.borderColor = errorBorderColor;
    }
  }

inputList.forEach(element => {
    element.addEventListener("input", () => {
        let span = document.getElementById(element.name + "Span");
        span.textContent = element.value.toUpperCase();
    });
});

document.getElementById("btn").addEventListener('click', () => {
    let form = document.querySelector("form");
    let formData = new FormData(form);

    for(const [key, value] of formData){
        let valueIsNull = value == "" ? true : false;
        if(valueIsNull){
            if(key == "month" || key == "year"){
                document.getElementById("dateError").textContent = "Can't be blank";
            } else{
                document.getElementById(key + "Error").textContent = "Can't be blank";
            }
            document.getElementById(key).style.borderColor = errorBorderColor;
        }
    }
    ValidateCreditCardNumber(formData.get("number"));
});

