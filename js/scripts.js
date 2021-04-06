console.log("Linked to html, correctly.")

// Create the search template
let searchTemplate = document.createElement('template')
searchTemplate.innerHTML = (
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`
);
searchTemplate = searchTemplate.content.childNodes[0];

// Append the search template to the dom
searchContainer = document.querySelector('.search-container');
searchContainer.appendChild(searchTemplate);


console.log(searchContainer);

