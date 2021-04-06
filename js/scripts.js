console.log("Linked to html, correctly.")


let createAndAppendTo = (htmlStr, parentTag) => {
    searchContainer  = document.querySelector(parentTag);
    searchContainer.insertAdjacentHTML('beforeend', htmlStr)
}

// Create the search template

createAndAppendTo((
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`
), '.search-container');

// createAndAppendTo((
//     `<div class="card">
//         <div class="card-img-container">
//             <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
//         </div>
//         <div class="card-info-container">
//             <h3 id="name" class="card-name cap">first last</h3>
//             <p class="card-text">email</p>
//             <p class="card-text cap">city, state</p>
//         </div>
//     </div>`
// ), '#gallery')


// createAndAppendTo((
//     `<div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>

//     // IMPORTANT: Below is only for exceeds tasks 
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
//     </div>`
// ), 'body')
// Append the search template to the dom



// Fetch function

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

fetchData('https://randomuser.me/api/?results=12', 
    onSuccess = (data) => {
        console.log(data);
        data.results.forEach((user)=> {
    
            let html = createHTMLForUser(user)
            createAndAppendTo(html, '#gallery')
            modalHtml = createPopupHtmlForUser(user)
            modals[user.login.uuid] = modalHtml
        })

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
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
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
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
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