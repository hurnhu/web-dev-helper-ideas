//https://learn.jquery.com/using-jquery-core/document-ready/
//A page can't be manipulated safely until the document is "ready." 
//jQuery detects this state of readiness for you.
$(document).ready(function() {

    //we need an array to hold all of our intervals so we can pause/unpause/delete them
    let timerArr = [];
    $("#addTimer").on("click", function () { 
        //various element we are going to need
        let nameOfTimerEl = $("#timerName")
        let lengthOfTimer = $("#timerLength")
        let containerForTimers = $("#timerContainer")
        let timer = $("<div>")
        let timerCount = $("#timerContainer > div").length

        //adding our bootstrap grid columns to each of the timer divs
        timer.addClass("col")


        timer.attr("is-paused", "false")

        //we set the id to what ever the current count of timers are.
        //this way we can refer to this container at a later point
        //this timer index (timerCount) will always be the index of the interval in our array
        timer.attr("id", "timer-" + timerCount)
        timer.data("index", timerCount)

        //we can use template literalls here to interpolate varibles!
        timer.append(`<p>Name:${nameOfTimerEl.val()}</p>`)
        timer.append(`<p>Time Left:<span id="timeLeft">${lengthOfTimer.val()}</span></p>`)
        timer.append("<button class='pause btn btn-primary'>pause timer</button>")
        timer.append("<button class='unpause btn btn-primary'>unpause timer</button>")
        timer.append("<button class='delete btn btn-danger'>delete timer</button>")
        containerForTimers.append(timer)
        
        startNewTimer("timer-" + timerCount, lengthOfTimer.val())

        nameOfTimerEl.val("")
        lengthOfTimer.val("")

        //what happends if you comment this out,
        //and only add the event handlers when the page loads?
        reAddEventListners()
     })


     //jquery adds out click event handlers as soon as the .on method is ran
     //this is problmatic when we are dynamically adding buttons.
     //on page load these buttons do not exsist, so these event handlers will bind to nothing
     //so every time we add a new button we need to remove all event handlers from our timer buttons
     //then re add the click event for our timer buttons
     //
     //What happends if we dont remove the click event from the timer elements before adding them again?
     //it will add another click event on the same button that already exsists. At this point you could have 
     //1 button that runs the same click event multiple times!
     function reAddEventListners() {
        //off will remove all event handlers on this class
        $(".delete").off()

        $(".delete").on("click", function(){
            //this refers to the element that was clicked
            //we can pass this into jquery to get a handle on the item that was clicked with jquery
            //from this we can go to the parent (the div container) that holds a data attribute
            //that will be the index of our timer
            clearInterval(timerArr[$(this).parent().data().index])
            $(this).parent().remove()
         })

         $(".pause").off()
 
         $(".pause").on("click", function(){
            $(this).parent().attr("is-paused", "true")
            clearInterval(timerArr[$(this).parent().data().index])
          })

         $(".unpause").off()
 
         $(".unpause").on("click", function(){
            $(this).parent().attr("is-paused", "false")
            startNewTimer($(this).parent().attr("id"))
          })
     }



     function startNewTimer(parentElId){
        let newInterval = setInterval(() => {
            let indexOfParent = $(`#${parentElId}`).data().index

            //Is there a shorter way we could write this selector?
            //this selector will look for a id of timerLeft that is inside of a p tag
            //and that p tag is inside of the id we pass in as an argument
            let currentTime = $(`#${parentElId} > p > #timeLeft`).text() - 1;
            $(`#${parentElId} > p > #timeLeft`).text(currentTime)
            //if the time is 0 stop the timer
            if(currentTime < 0){

                $(`#${parentElId}`).attr("is-done", "true");
                clearInterval(timerArr[indexOfParent])
                //we use nth-child to only change the text of the second ptag
                $(`#${parentElId} > p:nth-child(2)`).text("Timer DONE")
            }
        }, 1000)
        timerArr[$(`#${parentElId}`).data().index] = newInterval
     }
});