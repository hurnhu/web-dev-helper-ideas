//Global varible to hold our current math problem
let mathProblem = "";

//event listner that listens for any click on the page
document.addEventListener("click", (event) => {
    let itemThatWasClick = event.target
    //check to see if the item that was click was a button element
    if(itemThatWasClick.matches("button")){
        //check to see if the button has the data attribute of data-number
        //if the data-attribute (data-number) is not on this button, it will be undefined
        if(itemThatWasClick.dataset.number !== undefined){
            mathProblem += itemThatWasClick.dataset.number
        } else {
            //fall into this else if data-number is not on this button
            if(itemThatWasClick.dataset.operation === "ce"){
                //if the button CE was clicked, clear everything and return
                //a return will stop the execuition of this function
                clearEverything()
                return;
            } else if(itemThatWasClick.dataset.operation !== "="){
                //if any button execpt for = was clicked, append it to our math problem
                mathProblem += itemThatWasClick.dataset.operation
            } else {
                //if the = button was clicked call a function to update the answer label
                updateAnswer()
            }
        }
        //update the label with our current math problem
        updateCurrentProblem(mathProblem)
    }
})

//this function just set our problem label  to empty
//reset are global varible to a empty string.
function clearEverything(){
    document.getElementById("equation").textContent = ""
    mathProblem = ""
}

//function to update the equation label to what was passed in as a argument
function updateCurrentProblem(current){
    document.getElementById("equation").textContent = current
}

//function to do the math for the math problem, after that is done clear the label for the problem and the global var
function updateAnswer(){

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
    //In normal circumstances eval is evil, can you think of a different way to make this calculator with out it?
    //eval is a funciton that takes in a string and evaulates it as a valid javascript expression
    //EX eval("2+2") will return 4
    //this also mean if their is any valid js code is passed to eval, it will run it. this is a security risk

    document.getElementById("solution").textContent = eval(mathProblem)
    clearEverything()
}