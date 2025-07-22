let inputs = ["link 1", "link 2"]
const inputElement = document.getElementById("input-el")
const inputButton = document.getElementById("input-btn")
const ulElement = document.getElementById("ul-el")

inputButton.addEventListener("click", function() {
    console.log("button clicked")
    inputs.push(inputElement.value)
    updateList()
})

function updateList()
{
    ulElement.textContent = ""
    for (let i = 0 ; i < inputs.length ; i++)
    {
        ulElement.innerHTML += "<li>" + inputs[i] + "</li>"
    }
}