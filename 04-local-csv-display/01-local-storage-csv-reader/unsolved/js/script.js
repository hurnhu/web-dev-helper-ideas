$(document).ready(function () {
  $("#file-form").on("submit", function (event) {
    event.preventDefault()

    //what is .files?
    let file = document.getElementById("file-input").files[0]

    //how can we use the file reader to read the contents of this file?
    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    //https://javascript.info/file
    //the second link is a bit easier to understand
    //i've left some of the code, but it is missing key items!
    let reader = new FileReader();

    //what is onload?
    //what does it do?
    reader.onload = function () {
      //We need to do the following
      //1. get the contents
      //2. once you get the contents, you now have a string.
      //  if you console log this you will see the contents of the file
      //  with each row on a line under the last.
      //  each of these rows are seperated by a new line charcter.
      //  we need to split the string by the new line charcter
      //3. after we split it we will now have an array filled with comma delimited strings
      //  each string represents a row
      //  notice that you might have an empty row (string) at the end.
      //  we need to remove that last item
      //  how can we remove every element of this array that is a blank string?
      //4. after we remove all the blank rows, we need to loop through all the array items
      //  and convert the comma delimited string into an array
      //  at this point you should have an array of arrays. the outter array is all the file contents
      //  each inner array should represent 1 row. Each item in that inner array should be a specific item in the row
      //5. We now want to convert each inner array into an object keyed by the headers/
      //  we will ignore doing this for the first item in the array. As the first item in the array is are headers

      //store the file contents to localstorage
    };

    //when will this code run
    reader.onerror = function () {
      console.log(reader.error);
    };
  });

  //when this function runs it should only show the upload-new-view
  function showUploadView(){
  }

  $("#new").on("click", function(){
    showUploadView()
  })

  $("#exsisting").on("click", function(){
    //we need to hide all of our views except for the exsisting-view

      if(localStorage.length > 0){
        //how can we get all the files that are in local storage?
        let tBody = $("#tableBody")
        //how can we ensure tableBody will have nothing in it?

        //what does object keys do?
        Object.keys(files).forEach((item, index) => {
          let tr = $("<tr>")
          let td = $("<td>")
          //we want to create a button and save it to the loadButton varible
          //this button should have a data attribute called data-fileName
          //this data attribute should hold the name of the file
          let loadButton
          td.text(item)
          tr.append(td)
          tr.append(loadButton)
          tBody.append(tr)
        })
      }
  })

  //why is this listener looking for any click on the table?
  $("#tableBody").on("click", function(event) {
    //what does this do?
    if(event.target.matches("button")){
      //how can we ensure file-view-container does not have anything in it before we append out data?

      //we need to get the filename assoicated with the button that is clied and store it in fileToLoad
      let fileToLoad
      let fileData = JSON.parse(localStorage.getItem(fileToLoad))
      let table = $("<table class='table'></table>")

      let th = $("<thead>")
      let tb = $("<tbody>")

      //what is this forEach?
      //how does it work?
      //what is the value of item inside of the foreach?
      fileData.forEach((item, index) => {
        //we are checking for the 0 index as this will be our table headers
        if(index === 0){
          let tr = $("<tr>")
          
          //for each value inside of item we need to append it to tr
          th.append(tr)
        } else {
          let tr = $("<tr>")
          
          //for each value inside of item we need to append it to tr

          tb.append(tr)
        }
      })

      //append the table headers
      table.append(th)

      //append the table body
      table.append(tb)

      //append the table to the container
      $("#file-view-container").append(table)

      //make sure its visable
      $("#file-view").show()
    }
  })

  //when the page loads run this
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