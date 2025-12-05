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
                const separator = document.createElement("li");
                separator.innerHTML = `<hr class="dropdown-divider">`;
                newDropdown.appendChild(separator);
            }

            const entry = document.createElement("li");
            entry.innerHTML = `
                <a class="dropdown-item d-flex align-items-center" href="${article.location}">
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

function populateArticleNavigation() {
    console.log("hi");
    const articleContent = document.getElementById("article-content");
    const mainList = document.getElementById("main-navigation-list");

    let currentH2Entry = document.getElementById("top-navigation-entry");
    let headers = articleContent.querySelectorAll('h2, h3');

    for (const header of headers) {
        // if the header doesn't have an ID, go to the next one
        if (!header.id) {
            continue;
        }

        let newEntry = document.createElement("li");
        newEntry.innerHTML = `<a href="#${header.id}">${header.innerHTML}</a>`;

        let destList = mainList;
        if (header.tagName.toLowerCase() === "h3") {
            const subListArray = currentH2Entry.getElementsByTagName("ul");
            if (subListArray.length > 0) {
                // get existing sublist
                destList = subListArray[0];
            } else {
                // create and add sublist
                destList = document.createElement("ul");
                destList.classList.add("navigation-list");
                currentH2Entry.appendChild(destList);
            }
        } else {
            currentH2Entry = newEntry;
        }

        destList.appendChild(newEntry);
    }
}

populateArticleNavigation();
