let inputs = []
const inputElement = document.getElementById("input-el")
const inputButton = document.getElementById("input-btn")
const ulElement = document.getElementById("ul-el")

inputButton.addEventListener("click", function() {
    // console.log("button clicked")
    inputs.push(inputElement.value)
    inputElement.value = ""
    updateList()
})

function updateList()
{
    let listItems = ""
    for (let i = 0 ; i < inputs.length ; i++)
    {
        listItems += `
        <li>
            <a target='_blank' href='${inputs[i]}'>
                ${inputs[i]}
            </a>
        </li>`
    }
    ulElement.innerHTML = listItems
}