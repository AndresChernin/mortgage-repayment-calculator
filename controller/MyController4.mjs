import { MortgageCalculator} from '../model/MortgagaCalculator.mjs';

export default class MyController3 {
  constructor() {
    // Acces to items
   
    this.amountInput = document.getElementById("amount");
    this.rateInput = document.getElementById("rateEveryYear");
    this.termInput = document.getElementById("termInYears"); 
    this.buttonCalculate = document.getElementById("buttonCalculate");
    this.clearLabel = document.getElementById("clearLabel");

    this.image = document.getElementById("image");
    this.hText = document.getElementById("h-text");
    this.pText = document.getElementById("p-text");
    this.inputs=[this.amountInput,this.rateInput,this.termInput];
    this.emptyInputs=[];
    this.inputValues=[];
    this.resultsOutput=document.createElement("div");
    
    this.calculator=new MortgageCalculator(0,0,0);
    // Register events 
    this.registerEvents();
    this.programmingOfRadios();
    this.programmingOfInputs();
    
  }
  registerEvents() {
    
    if (this.buttonCalculate) {
      this.buttonCalculate.addEventListener("click", () => this.calculate());
      buttonCalculate.addEventListener("mouseover",(event)=>{
        buttonCalculate.classList.remove("brown-button");
        buttonCalculate.classList.add("yellow-button");
      });
    
    buttonCalculate.addEventListener("mouseout",(event)=>{
    buttonCalculate.classList.remove("yellow-button");
    buttonCalculate.classList.add("brown-button");
      });
      
    }
    if (this.clearLabel) {
      this.clearLabel.addEventListener("click", () => this.clearForm());
    }

  }
  clearForm(){
    this.clearResults();
    this.clearInputs();
    this.clearRadios();
    
  }
  calculate(){
    this.inputValues=[];
    this.controllInputs();
    var radioValue=this.controllRadios();
    console.log(this.inputValues);
    console.log(radioValue);
     const hasInvalid = this.inputValues.some(v=>Number.isNaN(v));
    if(!hasInvalid && radioValue!="No value"){
        this.prepareRightPartForResults();
        this.readInputs(this.inputValues,radioValue);
    }
    else{
      return;
    }
  }
  controllInputs(){
    
    for (let input of this.inputs) {
    const rawValue=input.value.trim();
    if (rawValue=== "") {
      this.inputValues.push(NaN);
      this.showWrongInput(input,"This field is required.");
      continue;
    }
    
    const normalValue=this.normalizeNumber(rawValue);
        console.log(normalValue);
        if(Number.isNaN(normalValue)){
            this.inputValues.push(NaN)
            this.showWrongInput(input,"This ist a wrong format.");
        }
        else {
          if(normalValue<0){
            this.inputValues.push(NaN);
            this.showWrongInput(input,"Value must be positive.");
          }
          else{
            this.inputValues.push(normalValue);
          }
          
        }
    
  }
 
    
  }
   
  showWrongInput(wrongInput,message){
    
      const wrapper = wrongInput.parentElement; 
      wrapper.classList.remove("blue-borders", "yellow-borders");
      wrapper.classList.add("red-borders");
      const spans = wrapper.querySelectorAll("span");
      for (let span of spans) {
         if (span.classList.contains("currency-symbol-left-blue")) {
           span.classList.replace("currency-symbol-left-blue", "currency-symbol-left-red");
        } 
        else 
          if (span.classList.contains("currency-symbol-right-blue")) {
          span.classList.replace("currency-symbol-right-blue", "currency-symbol-right-red");
        }
      }
       let errorMsg = wrapper.parentElement.querySelector(".small-red-text");
       if (errorMsg) {
         // Update text
         errorMsg.textContent = message;
       } else {
       // Create new error message
       errorMsg = document.createElement("p");
       errorMsg.classList.add("small-red-text");
       errorMsg.textContent = message;
       wrapper.parentElement.appendChild(errorMsg);
      }
    
  }
  normalizeNumber(value) {
    console.log(value);
    console.log(typeof(value));
    if (typeof value !== "string") return NaN;
    value = value.trim();

   // If more than one comma or period exists → check if valid
    
  const commaCount = (value.match(/,/g) || []).length;
  const dotCount = (value.match(/\./g) || []).length;

  // If more than 1 potential decimal separator is present → invalid
  if (commaCount + dotCount > 1) {
    // Exception: Thousands separation (xxx,xxx,xxx)
    // Check if the characters were used correctly as thousands separators
    const thousandsPattern = /^(\d{1,3}([,.]\d{3})+)([,.]\d{2})?$/;

    if (!thousandsPattern.test(value)) {
      return NaN; // ❌ invalid input
    }
  }

  // Remove thousand separators
  value = value.replace(/[,\.](?=\d{3}\b)/g, "");

  // Decimal: comma → point
  value = value.replace(",", ".");

  return Number(value);
}

controllRadios(){
    const selected = document.querySelector('input[name="mortage-type"]:checked');
    let choosedRadio="";
    if (selected) {
                   choosedRadio=selected.value;
    }else {
           
           this.showErrorRadio();
           choosedRadio="No value";
     }
     return choosedRadio;
  }
  showErrorRadio() {
  const selected = document.querySelector('input[name="mortage-type"]:checked');

  // If no radio is selected:
  if (!selected) {
    
    const container = document.querySelector('.type-part');

    // check whether an error message already exists
    if (!container.querySelector(".small-red-text")) {
      const errorMsg = document.createElement("p");
      errorMsg.classList.add("small-red-text");
      errorMsg.textContent = "This field is required";
      container.appendChild(errorMsg);
    }
  }
}
 clearInputs() {
  for (let input of this.inputs) {
    input.value = "";
    const wrapper = input.parentElement;
    wrapper.classList.remove("red-borders");
    wrapper.classList.add("blue-borders");
    // 🔁 Turn red symbols back to blue
    const spans = wrapper.querySelectorAll("span");
    for (let span of spans) {
      span.classList.remove("currency-symbol-left-red", "currency-symbol-right-red");
      // back to blue standard color
      if (span.textContent.includes("%") || span.textContent.includes("years")) {
        span.classList.add("currency-symbol-right-blue");
      } else {
        span.classList.add("currency-symbol-left-blue");
      }
    }

    const existingError = wrapper.parentElement.querySelector(".small-red-text");
    if (existingError) existingError.remove();
  }
}
  clearRadios(){
    const wrapperRadio
    =document.querySelector('input[name="mortage-type"]').parentElement;
    const existingErrorRadio=wrapperRadio.parentElement.querySelector(".small-red-text");
       if(existingErrorRadio){
        existingErrorRadio.remove();
       }
      const radioButtons = document.querySelectorAll('input[name="mortage-type"]');
      radioButtons.forEach(radio => {
          radio.checked = false; // 
       });


      const radioWrappers = document.querySelectorAll('.radio-button');
      radioWrappers.forEach(wrapper => {
        wrapper.classList.remove("blue-borders-for-radio-button","yellow-borders-for-radio-button");
        wrapper.classList.add("blue-borders-for-radio-button");
       });
     }
  
  programmingOfRadios(){
    const radios = document.querySelectorAll('.radio-button');
    for(const radio of radios){
      radio.addEventListener("click",(event)=>{
      //radio.classList.remove("blue-borders-for-radio-button");
      //radio.classList.add("yellow-borders-for-radio-button");
        const group = radio.closest('.type-part'); 
        if (!group) return;

        const existingErrorRadio=group.querySelector(".small-red-text");
        if(existingErrorRadio){
            existingErrorRadio.remove();
       }
      });
      radio.addEventListener("mouseover",(event)=>{
        radio.classList.remove("blue-borders-for-radio-button");
      radio.classList.add("yellow-borders-for-radio-button");
      /*const point = radio.querySelectorAll('.point');
      point.classList.remove("point-blue");
      point.classList.add("point-yellow");*/
     });
    
    radio.addEventListener("mouseout",(event)=>{
        radio.classList.remove("yellow-borders-for-radio-button");
      radio.classList.add("blue-borders-for-radio-button");
      /*const point = radio.querySelectorAll('.point');
      point.classList.remove("point-yellow");
      point.classList.add("point-blue");*/
    });
  }
}
    programmingOfInputs(){
    const inputs = document.querySelectorAll('.input-field');
    for(const input of inputs){
      input.addEventListener("click",(event)=>{
        const className=input.parentElement.classList[0];
        const group = input.closest(`.${className}`);
        if (!group) return;

        const existingErrorInput=group.querySelector(".small-red-text");
        if(existingErrorInput){
            existingErrorInput.remove();
       }
       const allClasses=input.classList;
       allClasses.forEach(element=>console.log(element));
       input.classList.remove("red-borders","blue-roders");
       input.classList.add("blue-borders");

       const span = input.querySelector('span');
       span.classList.remove("currency-symbol-left-red", "currency-symbol-right-red");
      // back to blue standard color
      if (span.textContent.includes("%") || span.textContent.includes("years")) {
        span.classList.add("currency-symbol-right-blue");
      } else {
        span.classList.add("currency-symbol-left-blue");
      }    
      });
    }
  }
  makeButtonHovable(){

  }
  prepareRightPartForResults(){
  this.hText.textContent = "Your results";   // insert new text
           this.hText.style.textAlign="left";
           this.pText.textContent = `Your results are shown below based 
                                     on the information you provided. 
                                     To adjust the results, edit the form
                                     and click "calculate repayments" again`;
           this.pText.style.textAlign="left";
           this.image.remove();
}
insertResults(monthlyResults,totalResults){
    
    this.resultsOutput.className = "results-output";
    this.resultsOutput.innerHTML = `
  <p style="color:hsl(203, 41%, 72%);font-size: 12px; width:100%;">Your monthly repayments</p>
  <span style="color:yellow" id="monthly-repayments">£1,797.74</span>
  <div class="thin-underline" style="border-bottom: 0.1px solid hsl(203, 41%, 72%);width:95%"></div>
  <p style="color:hsl(203, 41%, 72%);font-size: 12px; width:100%;">Total you'll repay over the term</p>
  <span style="color:white; font-size:14px;" id="total-repayments">£539,322.94</span>
`;
    document.querySelector(".right-part").appendChild(this.resultsOutput);
   let monthlyResultsText = document.getElementById("monthly-repayments");
    monthlyResultsText.textContent=`£${this.formatOutput(monthlyResults)}`;
   let totalResultsText = document.getElementById("total-repayments");
    totalResultsText.textContent=`£${this.formatOutput(totalResults)}`;

}
clearResults(){
  this.hText.style.textAlign="center";
  this.pText.style.textAlign="center";
  this.hText.textContent = "Results shown here";   // insert new text
  this.pText.text=`Complete the form and click “calculate repayments” 
  to see what your monthly repayments would be.`;
  this.resultsOutput.remove();
  document.querySelector(".right-part").prepend(this.image);
}


readInputs(inputValues,radioValue){
  
    var amount=inputValues[0];
    
    var term=inputValues[2];
    
    var rate=inputValues[1];
    
    var choosedRadio=radioValue;
    this.calculator.setAmount(amount);
    this.calculator.setTermInYears(term);
    this.calculator.setRateEveryYear(rate);
    this.calculator.setTypeOfMortgage(choosedRadio);
    this.calculator.countMortgage();
    this.insertResults
    (this.calculator.getPaymentEveryMonth(), this.calculator.getPaymentTotal());
}
 formatOutput(number){
    return number.toLocaleString("en-US",{
       minimumFractionDigits: 2, maximumFractionDigits: 2});
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MyController3();
});