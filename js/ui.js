export function displayCountryDetails(country) {
    const { name, capital, population, region, languages, flags } = country;
    const countryName = name.common;

    document.getElementById('countryDetails').innerHTML = `
        <h2>${countryName}</h2>
        <img src="${flags.svg}" alt="Flag of ${countryName}">
        <p><strong>Capital:</strong> ${capital ? capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> ${population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Languages:</strong> ${Object.values(languages).join(', ')}</p>
        <button onclick="addToFavorites('${countryName}')">Add to Favorites</button>
    `;
}

export function displayImageGallery(images, query) {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = images.map(image => `
        <img src="${image.urls.small}" alt="${query}">
    `).join('');
}

export function renderFavoritesList(favorites) {
    document.getElementById('favoritesList').innerHTML = favorites.map(favorite => `
        <li>
            ${favorite.title}
            <button onclick="updateFavorite(${favorite.id}, 'Updated Country Name')">Update</button>
            <button onclick="deleteFavorite(${favorite.id})">Delete</button>
        </li>
    `).join('');
}

export function updatePaginationControls(currentPage, totalPages) {
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;
    document.getElementById('pageInfo').textContent = `Page ${currentPage}`;
}
