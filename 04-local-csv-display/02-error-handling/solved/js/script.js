$(document).ready(function () {

  //listener for checking if the form was submitted
  $("#file-form").on("submit", function (event) {
    //if it was submitted we want to prevent the default action of reloading the page
    event.preventDefault()

    //we get the file input and grab the first file the user picked
    let file = document.getElementById("file-input").files[0]

    //init a new file reader
    let reader = new FileReader(); // no arguments

    //readAsText takes in a blob of data (our file) and reads the data in as text
    reader.readAsText(file);

    //onload is ran when the file is read
    reader.onload = function () {
      //reader.results is the contents of our file
      //at this point our file contents look like this (fake data)
      //  a,b,c
      //  1,2,3
      //  4,5,6
      //  

      //we are then converting the string into an array by splitting on a new line char AKA \n
      //at this point our file contents look like this (fake data)
      //  ["a,b,c",
      //  "1,2,3",
      //  "4,5,6",
      //  ""]

      //we then filter the array for blank entries. currItem at this point is 1 row from our csv
      //at this point it is a comma delimited string. If this string is empty we know that row was blank
      //at this point our file contents look like this (fake data)
      //  ["a,b,c",
      //  "1,2,3",
      //  "4,5,6"]

      //we then map over the entire array to convert each row into an array of items
      //at this point our file contents look like this (fake data)
      //  [[a,b,c],
      //  [1,2,3],
      //  [4,5,6]]

      //lastly we key each entry by the headers (excluding the header row) into an object
      //at this point our file contents look like this (fake data)
      //  [[a,b,c],
      //  {a:1,b:2,c:3},
      //  {a:4,b:5,c:6}]

      let contents = reader
        .result
        .split("\n")
        .filter((currItem) => currItem.length > 0)
        .map((currItem) => currItem.split(","))

        contents = contents.map((currItem, index) => {
        let toReturn = {}
        //for all items excluding the header row (first entry)
        if(index > 0){
          currItem.forEach((_, innerIndex) => {
            //we are building an object that is the value of each row assoicated to its corresponding header in the csv
            toReturn[contents[0][innerIndex]] = currItem[innerIndex]
          });
        } else {
          toReturn = currItem
        }
        return toReturn
      });

      //save to local storage under the files name
      localStorage.setItem(file.name, JSON.stringify(contents))
    };

    //this will run if this is an error when reading the file
    reader.onerror = function () {
      console.log(reader.error);
    };
  });

  function showUploadView(){
    //we are using jquery methods to hide/show elements
    //hide adds the display none style.
    $("#upload-new-view").show()
    $("#exsisting-view").hide()
    $("#file-view").hide()
  }

  $("#new").on("click", function(){
    //when the user clicks on the new button
    //we call our function to display our uploder
    showUploadView()
  })

  $("#exsisting").on("click", function(){
      $("#upload-new-view").hide()
      $("#exsisting-view").show()
      $("#file-view").hide()

      if(localStorage.length > 0){

        //this uses the spread operator to get all of the items in local storge
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let files = { ...localStorage };
        let tBody = $("#tableBody")

        //we empty the contents of the table
        tBody.empty()

        //we really only care about the keys of the items from localstorage
        //the keys will be the file names
        Object.keys(files).forEach((item, index) => {
          let tr = $("<tr>")
          let td = $("<td>")

          //create a new button with a data attribute of filename so we can track what button is pressed
          let loadButton = $(`<td><button class="button" data-fileName="${item}" id="file-${index}">View File</button> <td>`)

          //set the text of this td to the files name
          td.text(item)
          tr.append(td)
          tr.append(loadButton)

          //append this new row to our table
          tBody.append(tr)
        })
      }
  })

  $("#tableBody").on("click", function(event) {
    //check to see if what was click inside the table body was a button
    if(event.target.matches("button")){
      //if it was a button we will empty the view container to make sure any
      //previous loaded files are removed
      $("#file-view-container").empty()
      //we store the file name as a data attribute
      //we pull it off and store it as the file we are loading
      let fileToLoad = event.target.dataset.filename
      //we reach into localstoreage for the file and then parse it
      let fileData = JSON.parse(localStorage.getItem(fileToLoad))
      //creating a table element that we will append into
      let table = $("<table class='table'></table>")

      let th = $("<thead>")
      let tb = $("<tbody>")
      //we loop through each row of data with .forEach
      fileData.forEach((item, index) => {
        //if we are on the first element
        //we know this will be are header rows
        if(index === 0){
          //create a new row for our headers
          let tr = $("<tr>")
          
          //object.values will return a array of ONLY the values of the object passed in
          //EX if our object is {test: 1, new: 2} -it will produce> [1,2]
          Object.values(item).forEach(curItem => {
            //for each of the items in the new array
            //we are creating a new th and putting it into the table row we made
            tr.append($("<th>").text(curItem))
          })
          //once we make all of the headers we are going to append the table row into the table head
          th.append(tr)
        } else {
          //anything that is not the first element is going to be a data row
          let tr = $("<tr>")
          //object.values will return a array of ONLY the values of the object passed in
          //EX if our object is {test: 1, new: 2} -it will produce> [1,2]
          Object.values(item).forEach(curItem => {
            //for each of the items in the new array
            //we are creating a new td and putting it into the table row we made
            tr.append($("<td>").text(curItem))
          })
          //we then append a new row into the table body
          tb.append(tr)
        }
      })

      //once we fillout all of our new rows
      //we append the table head, followed by the body
      table.append(th)
      table.append(tb)
      //then we finally add the table to the page
      //at this point it is still hidden
      $("#file-view-container").append(table)
      //now we show the file-view
      $("#file-view").show()
    }
  })

  showUploadView();
})


//from bulma docs to make the hamburger menu work
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});