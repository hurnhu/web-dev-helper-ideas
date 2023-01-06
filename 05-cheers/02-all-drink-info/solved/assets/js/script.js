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
                $("#image").attr("src", randomDrink.strDrinkThumb)
                $("#instructions").text(randomDrink.strInstructions)

                let table = $("<table class='table'></table>")
                let th = $("<thead></thead>")
                let thr = $("<tr></tr>")

                let measureHeader = $("<th></th>")
                measureHeader.text("Measurement")

                let ingredientHeader = $("<th></th>")
                ingredientHeader.text("Ingredient")

                let tb = $("<tbody></tbody>")
                let tbr, mTd, iTd
                for (let i = 1; i <= 14; i++) {
                    if(randomDrink["strIngredient" + i] === null && randomDrink["strMeasure" + i] === null){
                        break;
                    }
                    tbr = $("<tr></tr>")
                    mTd = $("<td></td>")
                    iTd = $("<td></td>")

                    iTd.text(randomDrink["strIngredient" + i])
                    mTd.text(randomDrink["strMeasure" + i])

                    tbr.append(iTd)
                    tbr.append(mTd)
                    tb.append(tbr)
                }
                table.append(tb)

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