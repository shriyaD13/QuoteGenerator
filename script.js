const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const  twitterBtn= document.getElementById('twitter');
const newQuoteBTn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// add the spinner
function showSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide the spinner
function hideSpinner(){
  if(!loader.hidden)
  {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  showSpinner();

  // craeting a proxyUrl
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // if author is unknown
    if(data.quoteAuthor === '')
    {
      authorText.innerText = 'unknown';
    }
    else {
      authorText.innerText = data.quoteAuthor;
    }

    // reduce the size for larger quotes
    if(data.quoteText.length > 120)
    {
      quoteText.classList.add('long-quote');
    }
    else
    {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    hideSpinner();
  } catch (e) {
    var i=1;
    if(i<10){
      getQuote();
      i++;
    }
  }
}

function tweetQuote(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBTn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);


// On load
getQuote();
