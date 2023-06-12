const $searchForm = document.querySelector('#search');
const $searchView = document.querySelector('[data-view="search-results"]');
const $loadingView = document.querySelector('[data-view="loading"]');

function searchGames() {
  const $searchQuery = $searchForm[0].value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rawg.io/api/games?key=70f3566e2dca40338ef7b433dfc63e7b&page=1&page_size=12&search=' + $searchQuery);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const results = xhr.response.results;
    $searchView.appendChild(buildSearchResults(results));
    $loadingView.classList.add('hidden');
  });
  xhr.send();
}

$searchForm.addEventListener('submit', event => {
  $searchView.classList.remove('hidden');
  $loadingView.classList.remove('hidden');
  event.preventDefault();
  searchGames();
  $searchForm.reset();
});

function buildSearchResults(results) {
  const $searchResults = document.querySelector('#search-results');
  if ($searchResults) {
    $searchResults.remove();
  }

  const $gameRow = document.createElement('div');
  $gameRow.setAttribute('class', 'row');
  $gameRow.setAttribute('id', 'search-results');

  for (let i = 0; i < results.length; i++) {
    const $game = document.createElement('div');
    $game.setAttribute('class', 'col-1-3 flex-group-vert');

    const $gameLink = document.createElement('a');
    $gameLink.setAttribute('data-item', 'link');

    const $imgWrap = document.createElement('div');
    $imgWrap.setAttribute('class', 'cover-img-wrap search');

    const $coverImg = document.createElement('img');
    $coverImg.setAttribute('class', 'cover-img');
    $coverImg.setAttribute('src', results[i].background_image);
    $coverImg.setAttribute('alt', results[i].name);

    const $title = document.createElement('h2');
    $title.textContent = results[i].name;

    $game.appendChild($gameLink);
    $gameLink.appendChild($imgWrap);
    $game.appendChild($title);
    $imgWrap.appendChild($coverImg);
    $gameRow.appendChild($game);
  }
  return $gameRow;
}
