const REST_COUNTRIES_API = 'https://restcountries.com/v3.1';
const UNSPLASH_API = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'JZjVL2NyTb6GlkbCoAGVZE-ZLBNbYXDVhp4XuwO79no'; 
const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com';

export async function fetchCountryData(name) {
    try {
        const response = await fetch(`${REST_COUNTRIES_API}/name/${name}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching country data:', error);
        throw error;
    }
}

export async function fetchCountryImages(query, page = 1) {
    try {
        const response = await fetch(`${UNSPLASH_API}?query=${query}&page=${page}&per_page=10&client_id=${UNSPLASH_ACCESS_KEY}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}

export async function addToFavorites(countryName) {
    try {
        const response = await fetch(`${JSONPLACEHOLDER_API}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: countryName,
                body: `Favorite country added: ${countryName}`,
                userId: 1,
            }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
}

export async function updateFavorite(id, newCountryName) {
    try {
        const response = await fetch(`${JSONPLACEHOLDER_API}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: newCountryName,
                body: `Favorite country updated to: ${newCountryName}`,
                userId: 1,
            }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error updating favorite:', error);
        throw error;
    }
}

export async function deleteFavorite(id) {
    try {
        const response = await fetch(`${JSONPLACEHOLDER_API}/posts/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
        console.error('Error deleting favorite:', error);
        throw error;
    }
}

export async function getFavorites() {
    try {
        const response = await fetch(`${JSONPLACEHOLDER_API}/posts?userId=1`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
}
