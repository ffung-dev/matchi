// detects if in extension or website mode
const isExtension =
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.id;

if (isExtension) {
  document.body.classList.add("ext-mode");
} else {
  document.body.classList.add("web-mode");
}


let inputs = []

const inputElement = document.getElementById("input-el")
const inputButton = document.getElementById("input-btn")
const delButton = document.getElementById("del-btn")
const tabLinkButton = document.getElementById("tablink-btn")
const ulElement = document.getElementById("ul-el")

const switchTabButtons = document.getElementsByClassName("switch-btn");
const themeButtons = document.getElementsByClassName("theme-btn")
const themeCSS = document.getElementById("theme-css")

// array of inputs in local storage
const storedInputs = JSON.parse(localStorage.getItem("inputs"))
if (storedInputs)
{
    inputs = storedInputs
    update(inputs)
}

// set theme
let savedTheme = localStorage.getItem("theme")
setTheme(savedTheme || "default")

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

inputElement.addEventListener("keydown", function({key}) {
    if (key === 'Enter')
    {
        inputs.push(inputElement.value)
        inputElement.value = ""
        // save 
        localStorage.setItem("inputs", JSON.stringify(inputs))
        update(inputs)
    }
})

// save tab
tabLinkButton.addEventListener("click", function() {
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
for (let i = 0 ; i < switchTabButtons.length ; i++)
{
    switchTabButtons[i].addEventListener("click", function() {
        switchTab(this.dataset.tab)
        console.log(this.dataset.tab)
    })
}

function switchTab(tab) 
{
    let tabContent = document.getElementsByClassName("tab-content")

    // hide tabs
    for (let i = 0 ; i < tabContent.length ; i++) 
    {
        tabContent[i].style.display = "none"
    }
    // show tab (based on argument)
    document.getElementById(tab).style.display = "block"
}

// change theme
// console.log(themeButtons)
for (let i = 0 ; i < themeButtons.length ; i++) {
    let theme = themeButtons[i].dataset.theme
    themeButtons[i].addEventListener("click", function() {
        setTheme(theme)
    })
}
function setTheme(theme) {
    // console.log("in function " + theme)
    if (theme == "default") {
        themeCSS.href = "./themes/default.css"
        localStorage.setItem("theme", "default")
    } else if (theme == "strawberry") {
        themeCSS.href = "./themes/strawberry.css"
        localStorage.setItem("theme", "strawberry")
    } else if (theme == "chocolate") {
        themeCSS.href = "./themes/chocolate.css"
        localStorage.setItem("theme", "chocolate")
    }
}