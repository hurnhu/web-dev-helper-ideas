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
                //we are going to pull various data out of our drink object
                //with this data we are then going to set various elements on our page
                $("#title").text(randomDrink.strDrink)
                $("#image").attr("src", randomDrink.strDrinkThumb)
                $("#instructions").text(randomDrink.strInstructions)

                //with jquery we are going to create a table, th, and tr for the table headers
                //we are storing these in varibles so we can nest items inside of them later on
                let table = $("<table class='table'></table>")
                let th = $("<thead></thead>")
                let thr = $("<tr></tr>")

                //we are going to create a few headers as we want 2 columns
                //one for the measurement and one for the ingredent
                let measureHeader = $("<th></th>")
                measureHeader.text("Measurement")

                let ingredientHeader = $("<th></th>")
                ingredientHeader.text("Ingredient")

                //now that we have the table headers done
                //we can move to the table body.
                //again we are creating this and assiging it to a varible for later use
                let tb = $("<tbody></tbody>")
                //we are declaring 3 varibles for use in our for loop
                //tbr - table body row
                //mtd - measurment table data
                //itd - ingredient table data 
                let tbr, mTd, iTd

                //the api returns all of the ingredients and measurements as the following
                //{
                // strIngredient1: "water",
                // strIngredient2: "lemon",
                //....
                // strIngredient14: "gin",  
                // strMeasure1: "1oz",
                // strMeasure2: "1 wedge",
                //....
                // strMeasure14: "1oz",             
                //}
                //becuase it is always strIngredient followed by a number 1- 14 we can use a for loop to interate through all of them
                //strIngredient1 matches up with strMeasure14
                for (let i = 1; i <= 14; i++) {
                    //if we run into one where both the ingredient and measurement are null. 
                    //we know we hit the end of the avaible ingredients
                    if(randomDrink["strIngredient" + i] === null && randomDrink["strMeasure" + i] === null){
                        //break kills the loop, it will exit the loop and continue to the next code block
                        break;
                    }
                    //create new blank html elements
                    tbr = $("<tr></tr>")
                    mTd = $("<td></td>")
                    iTd = $("<td></td>")

                    //setting the text for each side of the columns
                    iTd.text(randomDrink["strIngredient" + i])
                    mTd.text(randomDrink["strMeasure" + i])

                    //then nesting them into the table row
                    //then putting the table row into the body row
                    tbr.append(iTd)
                    tbr.append(mTd)
                    tb.append(tbr)
                }
                //once we build out all of the table body rows.
                //we append the table body tot he table
                table.append(tb)

                //finally append the table to the page
                //up untill this point all of this html we are building is not on the page yet
                //this line is when all of this table html gets put on the page
                $("#tableSpot").append(table)

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