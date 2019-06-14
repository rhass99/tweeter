$(document).ready(function () {
  loadTweets();
});

// escape script tags
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
    <footer class="tweet-footer-container">${created_at}</footer> 
  </article>      
  `
  return $tweetElement;
}

// Creates a tweet list of elements from list of tweets
function renderTweets(tweets) {
  tweets.forEach((entry) => {
    let $tweet = createTweetElement(entry);
    $('#tweets-container').prepend($tweet);
  })
}

// Get Request to retrieve tweet array from DB
function loadTweets() {
  $.ajax({
    type: 'GET',
    url: `/tweets`,
    dataType: 'JSON'
  })
  .done((tweets) => renderTweets(tweets));
}
