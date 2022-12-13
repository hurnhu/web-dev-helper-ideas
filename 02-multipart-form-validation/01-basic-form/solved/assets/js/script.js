//https://learn.jquery.com/using-jquery-core/document-ready/
//A page can't be manipulated safely until the document is "ready." 
//jQuery detects this state of readiness for you.
$(document).ready(function() {
    $("#validate").on( "click", function() {
        let numberInput = $("#numberInput");
        let letterInput = $("#letterInput");
        let specCharInput = $("#specCharInput");
        let numAndSpecCharInput = $("#numAndSpecCharInput");

        setValidity(numberInput, validateNumber(numberInput))
        setValidity(letterInput, validateLetter(letterInput))
        setValidity(specCharInput, validateSpecChar(specCharInput))

        //is there a better way to do this?
        setValidity(numAndSpecCharInput, validateNumber(numAndSpecCharInput, false) && validateSpecChar(numAndSpecCharInput, false) && !validateLetter(numAndSpecCharInput, false))
    });

    //this function will add a class depending on if this element is valid
    function setValidity(element, isValid){
        //remove all classes from the element
        element.removeClass()
        if(isValid){
            //add a new class
            element.addClass("valid")
        } else {
            element.addClass("invalid")
        }
    }

    //this function will check the argument to see if it has only numbers
    //if we pass false it will just check to see if it contains numbers
    function validateNumber(elementToValidate, onlyNumbers = true){
        
        if(onlyNumbers){
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
        return  /\d+/.test(elementToValidate.val())
    }

    //this function will check the argument to see if it only contains letters
    function validateLetter(elementToValidate, onlyLetters = true){
        if(onlyLetters){
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
        return  /[a-zA-Z]+/.test(elementToValidate.val())
    }

    //this function will check the argument to see if it has only spec chars
    //if we pass false it will just check to see if it contains spec chars
    function validateSpecChar(elementToValidate, onlySpecChar = true){
        if(onlySpecChar){
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
        return  /\W+/.test(elementToValidate.val())
    }
});