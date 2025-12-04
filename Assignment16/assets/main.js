const ARTICLES = [
    {
        title: "League of Legends",
        description: "Multiplayer video game developed by Riot Games",
        location: "/article/League_of_Legends"
    },
    {
        title: "Reddit",
        description: "American social news and discussion site",
        location: "/article/Reddit"
    },
    
];
const MAX_SEARCH_ENTRIES = 4;

const searchDiv = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const searchDropdown = document.getElementById("search-dropdown");

// handle enter press to pick first

searchDiv.addEventListener("focusin", (event) => {
    if (!searchDiv.contains(event.relatedTarget)) {
        populateSearch(searchInput.value.trim());
        searchInput.ariaExpanded = true;
        searchDropdown.classList.add("show");
    }
});

searchDiv.addEventListener("focusout", (event) => {
    if (!searchDiv.contains(event.relatedTarget)) {
        searchInput.ariaExpanded = false;
        searchDropdown.classList.remove("show");
    }
});

searchInput.addEventListener("input", (event) => {
    populateSearch(event.target.value.trim());
});

function populateSearch(searchTerm) {
    // create scratch area to store new children
    const newDropdown = document.createDocumentFragment();

    // populate with new entries
    let added = 0;
    for (let i = 0; i < ARTICLES.length; i++) {
        const article = ARTICLES[i]

        const lowerSearchTerm = searchTerm.toLowerCase();
        if (article.title.toLowerCase().includes(lowerSearchTerm)
            || article.description.toLowerCase().includes(lowerSearchTerm)) {
            if (added > 0) {
                const separator = document.createElement("hr");
                newDropdown.appendChild(separator);
            }

            const entry = document.createElement("li");
            entry.innerHTML = `
                <a class="dropdown-item d-flex flex-row" href="${article.location}">
                    <div class="me-2">
                        <img class="search-thumbnail" src="${article.location}/assets/thumbnail.png" alt="${article.title} Thumbnail">
                    </div>
                    <div class="d-flex flex-column">
                        <h4 class="my-0">${article.title}</h4>
                        <p class="my-0">${article.description}</p>
                    </div>
                </a>
            `;
            newDropdown.appendChild(entry);

            added++;

            if (added >= MAX_SEARCH_ENTRIES) {
                break;
            }
        }
    }

    searchDropdown.replaceChildren(...newDropdown.children);
}
