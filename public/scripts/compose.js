// Escape script tags to protect from XSS
function escape(str) {
  var span = document.createElement('div');
  span.appendChild(document.createTextNode(str));
  return span.innerHTML;
}

// Creates a new Tweet Element 
function createTweetElement(tweet) {
  const { user, content, created_at } = tweet
  const { name, avatars, handle } = user;
  const { small } = avatars;
  const { text } = content;

  const $tweetElement = `
  <article class="tweet-container">
    <header class="tweet-header-container">
      <div class="article-header-flex-container">
        <img src=${small}>
        <h2>${name}</h2>
      </div>
      <h5>${handle}</h5>
    </header>
    <p class="tweet-text-container">${escape(text)}</p>
    <hr />
    <div class="tweet-footer-container">
      <footer>${created_at}</footer>
    <div class="tweet-footer-icons-container">
      <i class="material-icons">flag</i>
      <i class="material-icons">sync</i>
      <i class="material-icons">favorite</i>
    </div>
  </article>      
  `
  return $tweetElement;
}