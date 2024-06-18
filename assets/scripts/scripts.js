const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnTwitter = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let listQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeLoaded() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function validateAuthor(author) {
    return !author ? "Unknown" : author;
}

function pickQuote(quotes) {
    let rindx = Math.floor(Math.random() * quotes.length);
    return quotes[rindx];
}

function displayQuote(quotes) {
    let quote = pickQuote(quotes);
    quoteText.classList.remove('long-quote');
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    }
    quoteText.textContent = quote.text;
    authorText.textContent = validateAuthor(quote.author);
    completeLoaded();
}

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Get quotes from API
async function fetchAPIQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const resp = await fetch(apiUrl);
        listQuotes = await resp.json();
        displayQuote(listQuotes);
    } catch (err) {
        // heres the error
        console.log(err)
    }
}

function loadAQuote() {
    displayQuote(localQuotes);
}

btnNewQuote.addEventListener('click', fetchAPIQuotes);
btnTwitter.addEventListener('click', tweetQuote);

// on load
fetchAPIQuotes();
//loadAQuote();