const $ = document
const titleInput = $.getElementById('title')
const authorInput = $.getElementById('author')
const yearInput = $.getElementById('year')
const addBookButton = $.querySelector('.btn-warning')
const bookListElem = $.getElementById('book-list')

let newBooksArray = []


function addBookHandler (event) {
    event.preventDefault()

    if (titleInput.value === '' || authorInput.value === '' || yearInput.value === '' || yearInput.value.length > 4){
        alert('Please Input The Values Or Correct Values')
    } else {

        let titleValue = titleInput.value
        let authorValue = authorInput.value
        let yearValue = yearInput.value
        
        let newBookObj = {
            id: newBooksArray.length + 1,
            title: titleValue,
            author : authorValue,
            year: yearValue
        }
    
        makeEmptyInputs()
        
        newBooksArray.push(newBookObj)
        setlocalStorage(newBooksArray)
        newBookTrowGeneratore(newBooksArray)
    
    }
    

}


function makeEmptyInputs () {

    titleInput.value = '' 
    authorInput.value = ''
    yearInput.value = '' 
    titleInput.focus()
}


function setlocalStorage (BookArray) {
    localStorage.setItem('book', JSON.stringify(BookArray))
}

function newBookTrowGeneratore (BookArray) {

    // let newTrElem, newThTitleElem , newThAuthorElem , newThYearElem
    bookListElem.innerHTML = ''
    BookArray.forEach(function(book){

        bookListElem.insertAdjacentHTML('beforeend', `<tr><th>${book.title}</th><th>${book.author}</th><th>${book.year}</th></tr>`)


    }) 
}

function getLocalStorage () {
    let localStorageData = JSON.parse(localStorage.getItem('book'))
    if(localStorageData){
        newBooksArray = localStorageData
    } else {
        newBooksArray = []
    }

    newBookTrowGeneratore(newBooksArray)
    
    
}


addBookButton.addEventListener('click', addBookHandler)
window.addEventListener('load', getLocalStorage)
window.addEventListener('keydown', function (event){
    if (event.key === 'Enter') {
        addBookHandler()
    }
})

bookListElem.addEventListener('click', function(event){
    console.log(event.target.tagName);
    
    if (event.target.tagName === 'TH'){
        event.target.parentElement.remove()
    }

    
})


