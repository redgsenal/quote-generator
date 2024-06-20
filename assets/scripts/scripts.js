const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnTwitter = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let errorCount = 0;

let listQuotes = [];

function randomPickAPIURL() {
    const rpick = Math.floor(Math.random() * 10);
    return (rpick % 2) == 0 ? 'https://jacintodesign.github.io/quotes-api/data/quotes.json' : 'http://localhost:3000/quotes/random';
}

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeLoaded() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function validateAuthor(author) {
    return (!author || author === '') ? "Unknown" : author;
}

function pickQuote(quotes) {
    console.log('quotes:', quotes);
    if (!quotes || quotes.length == 0) {
        return null;
    }
    if (quotes.length == 1) {
        return quotes[0];
    }
    const rindx = Math.floor(Math.random() * quotes.length);
    const result = quotes[rindx];
    return (result.text && result.author) ? result : null
}

function displayQuote(quotes) {
    let quote = pickQuote(quotes);
    if (quote == null) {
        completeLoaded();
        return;
    }
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

function showErrorMessage() {
    const errorQuote = [{
        text: "To err is human.",
        author: "Alexander Pope"
    }];
    displayQuote(errorQuote);
}

// Get quotes from API
async function fetchAPIQuotes() {
    showLoadingSpinner();
    const apiUrl = randomPickAPIURL();
    console.log(apiUrl);
    try {
        const resp = await fetch(apiUrl);
        listQuotes = await resp.json();
        displayQuote(listQuotes);
    } catch (err) {
        // heres the error
        console.log(err)
        console.log('re-run fetch quotes')
        if (errorCount++ > 5) {
            errorCount = 0;
            showErrorMessage();
            return;
        }
        fetchAPIQuotes();
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