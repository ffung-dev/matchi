let inputs = []
let prevInputs = []

const inputElement = document.getElementById("input-el")
const inputButton = document.getElementById("input-btn")
const delButton = document.getElementById("del-btn")
const tabLinkButton = document.getElementById("tablink-btn")
const ulElement = document.getElementById("ul-el")

// array of inputs in local storage
const storedInputs = JSON.parse(localStorage.getItem("inputs"))
if (storedInputs)
{
    inputs = storedInputs
    update(inputs)
}

function update(items)
{
    let listItems = ""
    for (let i = 0 ; i < items.length ; i++)
    {
        listItems += `
        <li>
            <a target='_blank' href='${items[i]}'>
                ${items[i]}
            </a>
        </li>`
    }
    ulElement.innerHTML = listItems
}

// save bookmark
inputButton.addEventListener("click", function() {
    // console.log("button clicked")
    inputs.push(inputElement.value)
    inputElement.value = ""
    // save 
    localStorage.setItem("inputs", JSON.stringify(inputs))
    update(inputs)
})

// save tab
tabLinkButton.addEventListener("onclick", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        inputs.push(tabs[0].url)
        localStorage.setItem("inputs", JSON.stringify(inputs))
        update(inputs)
    })
})

// delete all
delButton.addEventListener("dblclick", function() {
    localStorage.clear()
    inputs = []
    update(inputs)
})

