import { fetchCountryData, fetchCountryImages, addToFavorites, getFavorites } from './api.js';
import { displayCountryDetails, displayImageGallery, renderFavoritesList, updatePaginationControls } from './ui.js';

let currentPage = 1;
let totalPages = 1;

document.getElementById('searchBtn').addEventListener('click', async () => {
    const countryInput = document.getElementById('countryInput').value.trim();
    if (!countryInput) return;

    try {
        const countryData = await fetchCountryData(countryInput);
        displayCountryDetails(countryData[0]);

        const imageData = await fetchCountryImages(countryInput, currentPage);
        displayImageGallery(imageData.results, countryInput);

        totalPages = Math.ceil(imageData.total / 10);
        updatePaginationControls(currentPage, totalPages);
    } catch (error) {
        console.error('Error searching for country:', error);
    }
});

document.getElementById('prevPageBtn').addEventListener('click', async () => {
    if (currentPage > 1) {
        currentPage--;
        const countryInput = document.getElementById('countryInput').value.trim();
        if (!countryInput) return;

        try {
            const imageData = await fetchCountryImages(countryInput, currentPage);
            displayImageGallery(imageData.results, countryInput);

            updatePaginationControls(currentPage, totalPages);
        } catch (error) {
            console.error('Error fetching previous page of images:', error);
        }
    }
});

document.getElementById('nextPageBtn').addEventListener('click', async () => {
    if (currentPage < totalPages) {
        currentPage++;
        const countryInput = document.getElementById('countryInput').value.trim();
        if (!countryInput) return;

        try {
            const imageData = await fetchCountryImages(countryInput, currentPage);
            displayImageGallery(imageData.results, countryInput);

            updatePaginationControls(currentPage, totalPages);
        } catch (error) {
            console.error('Error fetching next page of images:', error);
        }
    }
});

window.addToFavorites = async (countryName) => {
    try {
        await addToFavorites(countryName);
        alert(`${countryName} added to favorites!`);
        const favorites = await getFavorites();
        renderFavoritesList(favorites);
    } catch (error) {
        console.error('Error adding to favorites:', error);
    }
};

window.updateFavorite = async (id, newCountryName) => {
    try {
        await updateFavorite(id, newCountryName);
        alert(`Favorite updated to ${newCountryName}`);
        const favorites = await getFavorites();
        renderFavoritesList(favorites);
    } catch (error) {
        console.error('Error updating favorite:', error);
    }
};

window.deleteFavorite = async (id) => {
    try {
        await deleteFavorite(id);
        alert(`Favorite deleted`);
        const favorites = await getFavorites();
        renderFavoritesList(favorites);
    } catch (error) {
        console.error('Error deleting favorite:', error);
    }
};

(async () => {
    try {
        const favorites = await getFavorites();
        renderFavoritesList(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
})();
