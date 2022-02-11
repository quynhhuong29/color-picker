let colors = [
    {
        id: 1,
        color: "#3C5186"
    }, 
    {
        id: 2,
        color: "#9B72AA"
    },
    {
        id: 3,
        color: "#C6B4CE"
    }
]

var input = document.querySelector(".color-input")
var ul = document.querySelector("ul")
//Render colors
const renderColor = (colors) => {
    //remove all ul child
    var lis = document.querySelectorAll("ul li")
    lis.forEach((li) => {
        li.remove()
    })

    //load colors ra giao dien
    colors.forEach((val) => {
        var li = document.createElement("li")
        li.className = "color-item"
        li.setAttribute('data-id', val.id)
        li.style.cssText += `background-color: ${val.color}`
        li.innerHTML = `<span class="color-name">${val.color}</span>
                        <i data-id = ${val.id} class="fas fa-times delete"></i>`
        ul.appendChild(li)
    })
}

function isValidColor(color) {
    var s = new Option().style
    s.color = color
    return s.color !== ''
}

const handleAddColor = () => {
    var inputValue = input.value
    if(!inputValue){
        input.style.border = "1px solid red"
    } else if(isValidColor(inputValue)){
        colors.push({
            id: colors.length + 1,
            color: inputValue
        })
        renderColor(colors)
        //empty input
        input.value = ""
        //change color border input
        input.style.border = "1px solid black"
    } else {  
        input.style.border = "1px solid red"
    }
}


renderColor(colors)

//load background body
document.addEventListener("click", function(e) {
    e.preventDefault()
    var target = e.target
    var btnAdd = target.closest(".submit")
    var bgColor = target.closest(".color-item")
    var btnDelete = target.closest(".delete")
    if(btnAdd){
        handleAddColor()
    }
    if(btnDelete) {
        var id = btnDelete.dataset.id
        var idx = colors.findIndex(val => val.id == id)
        colors.splice(idx,1)
        renderColor(colors)
    }
    if(bgColor) {
        var id = bgColor.dataset.id
        var idx = colors.findIndex(val => val.id == id)
        document.querySelector("body").style.backgroundColor = colors[idx].color
    }
})
