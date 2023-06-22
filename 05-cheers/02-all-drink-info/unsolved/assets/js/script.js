$(document).ready(function () {
    //add a event listner to our button
    $("#random").on("click", function(){
        //using the fetch api, when there is a click on the button
        //we are going to reach out to this url and get the data
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then((res) => {
            //when the data is sent back from the url, we are going to change it to json
            //res.json() will return a promise.
            //so we are returning a promise form this .then
            //becuase of this we can tack on another .then 
            //to do something when converting the data to json
            return res.json()
        })
        .then((data) => {
            //once the data is converted to json
            //we are going to check to make sure we get at least 1 drink back
            console.log(data)
            if(data.drinks.length > 0){
                //we are going to reach into the drink object and store the first element to a varible
                let randomDrink = data.drinks[0]
                //we are then going to set the text to the drink name attribute (strDrink)
                $("#title").text(randomDrink.strDrink)
            } else {
                //no drink was sent back form the api
            }
        })
        .catch((err) => {
            //if we get to here there was an error reaching the api
            //or there was an error in the promises
        })
    })
  });