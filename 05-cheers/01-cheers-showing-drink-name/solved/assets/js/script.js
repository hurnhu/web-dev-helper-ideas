$(document).ready(function () {

    $("#random").on("click", function(){
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            if(data.drinks.length > 0){
                let randomDrink = data.drinks[0]
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