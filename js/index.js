document.addEventListener("DOMContentLoaded", function() {});


fetch('http://localhost:3000/books')
.then(res => res.json())
.then(data => {
    console.log(data)
    data.forEach((book) => {
        renderBooks(book)

    })
})


function renderBooks(books) {
    let list = document.getElementById('list')
    let titles = document.createElement('li')
    titles.textContent = books.title

    list.append(titles)

    titles.addEventListener('click', () => {
        showDetails(books)
    })
}


function showDetails(books) {
    let panelDiv = document.getElementById('show-panel')

    let title = document.createElement('h1')
    title.textContent = books.title

    let subtitle = document.createElement('h2')
    subtitle.textContent = books.subtitle

    let description = document.createElement('p')
    description.textContent = books.description

    let thumbnail = document.createElement('img')
    thumbnail.src = books.img_url

    let author = document.createElement('h2')
    author.textContent = books.author
    
    usersList = document.createElement('ul')
    
    books.users.forEach((user) => {
        let userItem = document.createElement('li')
        userItem.textContent = user.username
        usersList.append(userItem)
    })

    const likeButton = document.createElement('button')
    likeButton.textContent = 'Like'

    likeButton.addEventListener('click', () => {
        addLike(books)
    })

    panelDiv.append(title, subtitle, description, thumbnail, author, usersList, likeButton)

}


function addLike(books) {

    const userLikes = {
        'users': [...books.users, {'id' : 11, 'username':'connor'}]
    }

    fetch(`http://localhost:3000/books/${books.id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/JSON'
        },
        body: JSON.stringify(userLikes)
    })


}