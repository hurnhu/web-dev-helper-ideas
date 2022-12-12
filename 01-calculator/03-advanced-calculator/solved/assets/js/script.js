//Global varible to hold our current math problem
let mathProblem = "";

//We want to be able to hold a history of our past math problems
//An array will be for this, as we really dont need a key value pair
//we just need a array (bucket) to hold the history
let history = [];

//event listner that listens for any click on the page
document.addEventListener("click", (event) => {
    let itemThatWasClick = event.target

    //check to see if the item that was click was a button element
    if(itemThatWasClick.matches("button") && itemThatWasClick.dataset.bsToggle === undefined){
        if(itemThatWasClick.dataset.action !== undefined){
            //the index of the item is on the parent row.
            //we use this index to identify it in the dom and in the array
            let index = itemThatWasClick.parentElement.dataset.index
            if(itemThatWasClick.dataset.action === "load"){
                loadFromHistory(index)
            } else {
                deleteFromHistory(index)
            }
        } else if(itemThatWasClick.dataset.number !== undefined){
            //check to see if the button has the data attribute of data-number
            //if the data-attribute (data-number) is not on this button, it will be undefined
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


//This function will take in an argument to add to the array 
//we need to dynamically add items to the dom
function addNewHistory(itemToAdd){
    let historyEl = document.getElementById("calcHistoryDisplay")
    let historyItemDiv = document.createElement("div")
    historyItemDiv.classList.add("row")
    historyItemDiv.dataset.index = history.length

    let historyItemLoadBtn = document.createElement("button")
    historyItemLoadBtn.textContent = "load"
    historyItemLoadBtn.dataset.action = "load"
    historyItemLoadBtn.classList.add("btn")
    historyItemLoadBtn.classList.add("btn-primary")

    let historyItemDeleteBtn = document.createElement("button")
    historyItemDeleteBtn.textContent = "delete"
    historyItemDeleteBtn.dataset.action = "delete"
    historyItemDeleteBtn.classList.add("btn")
    historyItemDeleteBtn.classList.add("btn-primary")

    let historyItemLabel = document.createElement("label")
    historyItemLabel.textContent = itemToAdd

    let historyItemSeperator = document.createElement("hr")

    historyItemDiv.appendChild(historyItemLabel)
    historyItemDiv.appendChild(historyItemLoadBtn)
    historyItemDiv.appendChild(historyItemDeleteBtn)
    historyItemDiv.appendChild(historyItemSeperator)

    history.push(itemToAdd) 

    historyEl.appendChild(historyItemDiv)
    
}

//This function take in a index of the item in the array
//And loads it in as the current math problem
function loadFromHistory(index){
    mathProblem = ""
    mathProblem = history[index]
}

//This function takes in the index to delete from both the array and the dom
function deleteFromHistory(index){
    document.getElementById("solution").textContent = ""
    document.getElementById("calcHistoryDisplay").innerHTML = ""
    history.splice(index, 1)

    history.forEach((item) => {
        addNewHistory(item)
    })
}

//this function just set our problem label  to empty
//reset are global varible to a empty string.
function clearEverything(){
    document.getElementById("equation").textContent = ""
    mathProblem = ""
}

//function to update the equation label to what was passed in as a argument
function updateCurrentProblem(current){
    if(current !== undefined){
        document.getElementById("equation").textContent = current
    }
}

//function to do the math for the math problem, after that is done clear the label for the problem and the global var
function updateAnswer(){

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
    //In normal circumstances eval is evil, can you think of a different way to make this calculator with out it?
    //eval is a funciton that takes in a string and evaulates it as a valid javascript expression
    //EX eval("2+2") will return 4
    //this also mean if their is any valid js code is passed to eval, it will run it. this is a security risk

    let answer = ""

    try {
        answer = eval(mathProblem)
    } catch (error) {
        answer = "There was issue with your math problem."
    }

    document.getElementById("solution").textContent = answer
    addNewHistory(mathProblem)
    clearEverything()
}