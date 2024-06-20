// fetch quotes from an API
async function fetchNonCORSAPIQuotes() {
    loading();
    const apiCORS = 'http://localhost:3000/quotes/random';
    try {
        const resp = await fetch(apiCORS);
        listQuotes = await resp.json();
        console.log(listQuotes);
        displayQuote(listQuotes);
    } catch (err) {
        console.log('error catch:', err);
    }
}
