//https://learn.jquery.com/using-jquery-core/document-ready/
//A page can't be manipulated safely until the document is "ready." 
//jQuery detects this state of readiness for you.
$(document).ready(function () {
    let currentPos = 0;
    let numberInput = $("#numberInput");
    let letterInput = $("#letterInput");
    let specCharInput = $("#specCharInput");
    let numAndSpecCharInput = $("#numAndSpecCharInput");
    let prevBtn = $("#prev");
    let nextBtn = $("#next");

    //we store all of the element in the order they should appear
    //we also store their validation function used for each of them
    //notice we do not have a function for the numAndSpecCharInput
    //as it has multiple functions that are ran for validation
    let orderOfValidation = [
        {element: numberInput, function: validateNumber}, 
        {element: letterInput, function: validateLetter}, 
        {element: specCharInput, function: validateSpecChar}, 
        {element: numAndSpecCharInput}
    ]

    determinWhatInputsToShow()

    //on first load we want to hide the prev and validate buttons
    //as these buttons are not useful yet
    prevBtn.hide()

    //next button click
    nextBtn.on("click", function () {
        if(isShownInputValid()){
            currentPos++
            determinWhatInputsToShow()
            determinWhatButtonsToHide()
        }
    })

    //prev button click
    prevBtn.on("click", function () {
        currentPos--
        determinWhatInputsToShow()
        determinWhatButtonsToHide()
    })

    //this function checks to see if the current item is valid
    function isShownInputValid(){
        let el = orderOfValidation[currentPos].element
        let valid = false
        if(orderOfValidation[currentPos].function !== undefined){
            let validationFunction = orderOfValidation[currentPos].function
            valid = validationFunction(el)
        } else {
            valid = validateNumber(numAndSpecCharInput, false) && validateSpecChar(numAndSpecCharInput, false) && !validateLetter(numAndSpecCharInput, false)
        }
        setValidity(el, valid)
        return valid
    }

    //this function will hide all the inputs and only show the current one the user is on
    function determinWhatInputsToShow() {

        if(currentPos >= 4){
            numberInput.parent().show()
            letterInput.parent().show()
            specCharInput.parent().show()
            numAndSpecCharInput.parent().show()
            numberInput.data("hidden", false)
            letterInput.data("hidden", false)
            specCharInput.data("hidden", false)
            numAndSpecCharInput.data("hidden", false)

            //short circut this function by returning
            //at this point we are at the end and want to show everything
            //but we do not want to run any of the code below
            return
        }

        //jquery provides us with methods to hide/show a element
        //we really want to hide the parent element.
        //as this element will contain the label and our input
        //https://api.jquery.com/hide/
        //under the hood all this is doing is apply some stlying (display: none)

        numberInput.parent().hide()
        letterInput.parent().hide()
        specCharInput.parent().hide()
        numAndSpecCharInput.parent().hide()

        //We will be using data attributes to track if an item is shown or not
        //jquery uses the data method to alter data attributes
        //https://api.jquery.com/data/
        numberInput.data("hidden", true)
        letterInput.data("hidden", true)
        specCharInput.data("hidden", true)
        numAndSpecCharInput.data("hidden", true)

        orderOfValidation[currentPos].element.parent().show()
        orderOfValidation[currentPos].element.data("hidden", false)

    }

    function determinWhatButtonsToHide() {
        if (currentPos === 0) {
            nextBtn.show()
            prevBtn.hide()
        } else if (currentPos > 0 && currentPos < 4) {
            nextBtn.show()
            prevBtn.show()
        } else {
            nextBtn.hide()
            prevBtn.show()
        }
    }

    //this function will add a class depending on if this element is valid
    function setValidity(element, isValid) {
        //remove all classes from the element
        element.removeClass()
        if (isValid) {
            //add a new class
            element.addClass("valid")
        } else {
            element.addClass("invalid")
        }
    }

    //this function will check the argument to see if it has only numbers
    //if we pass false it will just check to see if it contains numbers
    function validateNumber(elementToValidate, onlyNumbers = true) {

        if (onlyNumbers) {
            //REGEX DECONSTRUCTED
            // ^ - start the beginning
            //\d - match any digit
            //+ - match the previous token one or more times
            //$ - go all the way to the end
            //As a whole this regex reads
            //The whole string (from the start to the end) 
            //should contain 1 or more letters and nothing else
            return /^\d+$/.test(elementToValidate.val())
        }

        //REGEX DECONSTRUCTED
        //\d - match any digit
        //+ match the previous token one or more times
        //As a whole this regex reads
        //Check to see if the string has at least one or more digit 
        //somewhere in the string
        return /\d+/.test(elementToValidate.val())
    }

    //this function will check the argument to see if it only contains letters
    function validateLetter(elementToValidate, onlyLetters = true) {
        if (onlyLetters) {
            //REGEX DECONSTRUCTED
            // ^ - start the beginning
            //[a-zA-Z] - match any letter lowercase or upper case the brackets repersent a range of items
            //+ - match the previous token one or more times
            //[^0-9] - not any digit. ^ inside of a range means not any of these items
            //$ - go all the way to the end
            //As a whole this reads
            //check to see if this string is one or more letters (lower or upper case) and no numbers

            return /^[a-zA-Z]+[^0-9]$/.test(elementToValidate.val())
        }
        //REGEX DECONSTRUCTED
        //[a-zA-Z] - match any letter lowercase or upper case the brackets repersent a range of items
        //+ - match the previous token one or more times
        //As a whole this reads
        //check to see if this string is at least one or more letters
        return /[a-zA-Z]+/.test(elementToValidate.val())
    }

    //this function will check the argument to see if it has only spec chars
    //if we pass false it will just check to see if it contains spec chars
    function validateSpecChar(elementToValidate, onlySpecChar = true) {
        if (onlySpecChar) {
            //REGEX DECONSTRUCTED
            // ^ - start the beginning
            //\W - (uppercase W) match any non word charcter (special chars)
            //$ - go all the way to the end
            //As a whole this reads
            //check to see if this string is at least 1 or more non word (special) char
            return /^\W+$/.test(elementToValidate.val())
        }
        //REGEX DECONSTRUCTED
        //\W - (uppercase W) match any non word charcter (special chars)
        //As a whole this reads
        //check to see if this string is at contains 1 or more non word (special) char
        return /\W+/.test(elementToValidate.val())
    }
});