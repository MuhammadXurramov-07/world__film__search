const selectElm = (e, a = document) => a.querySelector(e, a)


let elForm = selectElm('.form')
let elTemplate = selectElm('.template').content
let card = selectElm('.card__wrapper')
let input = selectElm('.input')
let select = selectElm('.selectInt')
let selectOp = selectElm('.selectOp')
let nextBtn = selectElm('.next')
let prevBtn = selectElm('.prev')



function renderArr(arr, list) {
    list.innerHTML = null
    arr?.forEach(item => {
        let cloneTemplate = elTemplate.cloneNode(true)
        selectElm('.card__img', cloneTemplate).src = item.Poster
        selectElm('.title', cloneTemplate).textContent = item.Title
        selectElm('.year', cloneTemplate).textContent = item.Year
        list.appendChild(cloneTemplate)
    });
}

let count = 1

nextBtn.addEventListener('click', (e)=> {
    count++
    alfitch()
})
prevBtn.addEventListener('click', (e)=> {
    count--
    alfitch()
})

let type = "movie"
let a = false

elForm.addEventListener('submit', (e) => {
    e.preventDefault()
    nextBtn.addEventListener('click', ()=> {
        count++
        prevBtn.disabled = false
        console.log('next');
        aaaa()
    })  
    prevBtn.addEventListener('click', ()=> {
        console.log('prew');
        if(count >= 2){
            count--
        }else if(count < 2){
            prevBtn.disabled = true
        }
        aaaa()
    })
    a = true
    let inputValue = input.value.trim()
    
    if(select.value.trim() == "series") {
        type = "series"
    } else if(select.value.trim() == "movie") {
        type = "movie"
    } else if(select.value.trim() == "episode") {
        type = "episode"
    }
     
    function aaaa() {   
        fetch(`http://www.omdbapi.com/?apikey=d15cac9c&s=${inputValue}&page=${count}&type=${type}`)
        .then(res => res.json())
        .then(data => renderArr(data.Search, card))
    }
    aaaa()
    
    input.value = null
})

function alfitch() {
    if(a == false) {
        fetch(`http://www.omdbapi.com/?apikey=d15cac9c&s=${"avengers"}&page=${count}&type=${type}`)
        .then(res => res.json())
        .then(data => renderArr(data.Search, card))
    }
}
alfitch()




input.focus()