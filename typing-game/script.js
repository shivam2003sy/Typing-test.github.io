const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
document.getElementById('start').addEventListener("click",()=>{
  quoteIndex=Math.floor(Math.random() * quotes.length); // randomly choosen a number from 0 to lengh of quotes list 
  quote = quotes[quoteIndex]//got a random quotes from the list 
  words =  quote.split(' ') // break a quote into a list of words with space  spilt 
  wordIndex = 0
  document.getElementById("typed-value").disabled = false;
  
  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  const quoteElement = document.getElementById('quote');
  quoteElement.innerHTML = spanWords.join("");
  quoteElement.childNodes[0].className = "highlight";
  const messageElement = document.getElementById("message");
  messageElement.innerText = "";

  const typedValueElement=document.getElementById ('typed-value')
  typedValueElement.value = ''
  typedValueElement.focus();
  startTime =new Date().getTime();
})

typedValueElement.addEventListener('input', () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished  ${quote.length} letters in ${elapsedTime / 1000} seconds.`;
    messageElement.innerText = message;
    document.getElementById("typed-value").disabled = true;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = '';
  } else {
    // error state
    typedValueElement.className = 'error';
  }
})