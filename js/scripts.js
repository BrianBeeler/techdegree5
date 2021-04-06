console.log("Linked to html, correctly.")


let createAndAppendTo = (htmlStr, parentTag) => {
    searchContainer  = document.querySelector(parentTag);
    searchContainer.insertAdjacentHTML('beforeend', htmlStr)
}

// Create the search template

createAndAppendTo((
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" onclick="searchUsers()" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`
), '.search-container');



// Fetch User Info

function fetchData(url, onSuccess, onFailure) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .then(onSuccess)
        .catch(onFailure);
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.status))
    }
}

modals = {};
userData = []

fetchData('https://randomuser.me/api/?results=12', 
    onSuccess = (data) => {
        console.log(data);
        data.results.forEach((user)=> {
    
            let html = createHTMLForUser(user)
            createAndAppendTo(html, '#gallery')
            modalHtml = createPopupHtmlForUser(user)
            modals[user.login.uuid] = modalHtml
        })
        userData = data.results;

    }, 
    onFailure = () => {

})

let createHTMLForUser = (user) => {
    return (
    `<div class="card" onclick="createPopup('${user.login.uuid}')">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>`)
}

let createPopupHtmlForUser = (user) => {
   return (
   `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong onclick='removeModel()'>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${user.picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${formatBirthday(user.dob.date)}</p>
            </div>
        </div>

        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn" onclick="renderPrevModal('${user.login.uuid}')">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn" onclick="renderNextModal('${user.login.uuid}')">Next</button>
        </div>
    </div>`)
}

function formatBirthday(birthday) {
    let burthday = new Date(birthday)
    return `${burthday.getMonth()}/${burthday.getDate()}/${burthday.getYear()}`;
}
function createPopup(uuid) {
    let userTemplate = modals[uuid];
    console.log("userTemplate", userTemplate);
    createAndAppendTo(userTemplate,'body');
}

function removeModel() {
    let modal = document.querySelector('.modal-container');
    modal.remove();
}

function renderPrevModal(uuid) {
    console.log(userData)
    let index = userData.findIndex((item) => {
        return item.login.uuid === uuid
    })

    if (index === 0) {
        index = userData.length-1;
    } else{
        index--;
    }

    removeModel()
    createPopup(userData[index].login.uuid)
}

function renderNextModal(uuid) {
    console.log("next rendering")
    let index = userData.findIndex((item) => {
        return item.login.uuid === uuid
    })
    if (index === (userData.length-1) ) {
        index = 0
    } else {
        index++
    }

    removeModel()
    createPopup(userData[index].login.uuid)

}

function searchUsers() {
    let searchTerm = document.querySelector('#search-input').value;
    filteredData = userData.filter( (user) => {
        return user.name.first.includes(searchTerm) || user.name.last.includes(searchTerm)
    })


    document.querySelector('#gallery').innerHTML = '';


    filteredData.forEach((user) => {
        let html = createHTMLForUser(user)
        createAndAppendTo(html, '#gallery')
    })
 

}