let inputs = []

const inputElement = document.getElementById("input-el")
const inputButton = document.getElementById("input-btn")
const delButton = document.getElementById("del-btn")
const tabLinkButton = document.getElementById("tablink-btn")
const themeButtons = document.getElementsByClassName("theme-btn")
const ulElement = document.getElementById("ul-el")
const themeCSS = document.getElementById("theme-css")

// array of inputs in local storage
const storedInputs = JSON.parse(localStorage.getItem("inputs"))
if (storedInputs)
{
    inputs = storedInputs
    update(inputs)
}

// set theme
try {
    setTheme(localStorage.getItem("theme"))
} catch {
    setTheme("default")
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

inputButton.addEventListener("keydown", function(event) {
    if (event.key === 'Enter' || event.keyCode === 13)
    {
        inputs.push(inputElement.value)
        inputElement.value = ""
        // save 
        localStorage.setItem("inputs", JSON.stringify(inputs))
        update(inputs)
    }

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
    localStorage.removeItem("inputs")
    inputs = []
    update(inputs)
})

// switch between bookmark list (ul-el) and star-jar
function switchTab(tab) {
    let tabContent = document.getElementsByClassName("tab-content")

    // hide tabs
    for (let i = 0 ; i < tabContent.length ; i++) 
    {
        tabContent[i].style.display = "none"
    }
    // show tab (based on argument)
    document.getElementById(tab).style.display = "block"
}

function setTheme(theme) {
    if (theme == 'default') {
        themeCSS.href = "./themes/default.css"
        localStorage.setItem("theme", "default")
    } else if (theme == 'strawberry') {
        themeCSS.href = "./themes/strawberry.css"
        localStorage.setItem("theme", "strawberry")
    } else if (theme == 'chocolate') {
        themeCSS.href = "./themes/chocolate.css"
        localStorage.setItem("theme", "chocolate")
    }
}