Now that are validation for the form works.

We need to implement the multistage part of the form.
For this we only want to display a single question at a time.
The user will have navigation to go forward and backwards.
And the end we will have a submit button that shows all the valid values the user typed in

thoughts:
1. dont let a user go to the next question if the input is not valid
2. How can we hide and show each item?
3. how can we keep track of what question the user is on so we can go next/prev
4. how do we handle showing/hiding the next/prev button if their is not a previous or next item?
5. would this form be better if we dynamically created all the inputs?