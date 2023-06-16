const $dashboardView = document.querySelector('[data-view="dashboard"]');
const $searchView = document.querySelector('[data-view="search-results"]');
const $loadingView = document.querySelector('[data-view="loading"]');
const $gameInfoView = document.querySelector('[data-view="game-info"]');
const $ratingView = document.querySelector('[data-view="rate"]');
const $seeAllView = document.querySelector('[data-view="see-all"]');
const $favoriteView = document.querySelector('[data-view="favorites"]');

const $navbar = document.querySelector('nav');
const $logo = document.querySelector('#logo');
const $navDashboardButton = document.querySelector('#nav-dashboard');
const $navFavoriteButton = document.querySelector('#nav-favorites');

const $wantToPlayRow = document.querySelector('#want-to-play');
const $playedRow = document.querySelector('#played');
const $seeAllWantButton = document.querySelector('#all-want-to-play');
const $seeAllPlayedButton = document.querySelector('#all-played');

const $seeAllRow = document.querySelector('#see-all');
const $seeAllHeadline = document.querySelector('#see-all-headline');

const $favoritesRow = document.querySelector('#favorites');
const $searchForm = document.querySelector('#search');

const $gameInfoGroup = document.querySelector('#game-info-group');
const $playedButton = document.querySelector('#played-button');
const $wantButton = document.querySelector('#want-button');
const $thumbsUpButton = document.querySelector('#thumbs-up');
const $thumbsDownButton = document.querySelector('#thumbs-down');
const $favoriteButton = document.querySelector('.star');

let currentGame;

// Navigation Code //
// Functions
function navManager(event) {
  if (event.target === $logo || event.target === $navDashboardButton) {
    buildDashboard(data);
    $dashboardView.classList.remove('hidden');
    $gameInfoView.classList.add('hidden');
    $searchView.classList.add('hidden');
    $seeAllView.classList.add('hidden');
    $favoriteView.classList.add('hidden');
  }
  if (event.target === $navFavoriteButton) {
    $favoriteView.classList.remove('hidden');
    $dashboardView.classList.add('hidden');
    $gameInfoView.classList.add('hidden');
    $searchView.classList.add('hidden');
    $seeAllView.classList.add('hidden');
    renderFavorites(data);
  }
}

// Events
$navbar.addEventListener('click', navManager);
// End Navbar Code //

// Dashboard code //
// Functions
function buildDashboard(data) {
  $playedRow.replaceChildren();
  $wantToPlayRow.replaceChildren();
  const played = [];
  const want = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].played === true) {
      played.push(data[i]);
    } else if (data[i].want === true) {
      want.push(data[i]);
    }
  }

  if (played.length > 16) {
    played.splice(16);
    $seeAllPlayedButton.classList.remove('hidden');
  }
  if (want.length > 16) {
    want.splice(16);
    $seeAllWantButton.classList.remove('hidden');
  }

  $playedRow.appendChild(renderGames(played, 'col-1-8'));

  $wantToPlayRow.appendChild(renderGames(want, 'col-1-8'));
}

function renderGames(array, columnWidthClass) {
  const $gameRow = document.createElement('div');
  $gameRow.setAttribute('class', 'row');
  for (let i = 0; i < array.length; i++) {
    const $gameWrap = document.createElement('div');
    $gameWrap.setAttribute('class', columnWidthClass);
    $gameWrap.setAttribute('data-item', 'game');
    $gameWrap.setAttribute('id', array[i].id);
    const $gameLink = document.createElement('a');
    const $gameImgWrap = document.createElement('div');
    $gameImgWrap.setAttribute('class', 'cover-img-wrap');
    const $gameImg = document.createElement('img');
    $gameImg.setAttribute('class', 'cover-img');
    $gameImg.setAttribute('src', array[i].background_image);
    $gameImg.setAttribute('alt', array[i].name);

    $gameRow.appendChild($gameWrap);
    $gameWrap.appendChild($gameLink);
    $gameLink.appendChild($gameImgWrap);
    $gameImgWrap.appendChild($gameImg);
  }
  return $gameRow;
}

// Events
document.addEventListener('DOMContentLoaded', event => {
  buildDashboard(data);
  $loadingView.classList.add('hidden');
});

$dashboardView.addEventListener('click', event => {
  let gameID;
  if (event.target.closest('[data-item="game"]')) {
    gameID = event.target.closest('[data-item="game"]').id;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Number(gameID)) {
        window.scrollTo(0, 0);
        $dashboardView.classList.add('hidden');
        $gameInfoView.classList.remove('hidden');
        updateGameInfo(data[i]);
      }
    }
  }

  if (event.target === $seeAllPlayedButton) {
    seeAllPLayed(data);
    $dashboardView.classList.add('hidden');
    $seeAllView.classList.remove('hidden');
  }

  if (event.target === $seeAllWantButton) {
    seeAllWant(data);
    $dashboardView.classList.add('hidden');
    $seeAllView.classList.remove('hidden');
  }
});
// End Dashboard Code//

// Favorites Code //
// Functions
function renderFavorites(data) {
  $favoritesRow.replaceChildren();
  const favorites = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].favorite === true) {
      favorites.push(data[i]);
    }
  }
  $favoritesRow.appendChild(renderGames(favorites, 'col-1-4'));
}

// Events
$favoriteView.addEventListener('click', event => {
  let gameID;
  if (event.target.closest('[data-item="game"]')) {
    gameID = event.target.closest('[data-item="game"]').id;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Number(gameID)) {
        window.scrollTo(0, 0);
        $favoriteView.classList.add('hidden');
        $gameInfoView.classList.remove('hidden');
        updateGameInfo(data[i]);
      }
    }
  }
});
// End Favorites Code //

// See All Code //
// Functions
function seeAllPLayed(data) {
  $seeAllRow.replaceChildren();
  const played = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].played === true) {
      played.push(data[i]);
    }
  }
  $seeAllRow.appendChild(renderGames(played, 'col-1-8'));
  $seeAllHeadline.textContent = 'Played';
}

function seeAllWant(data) {
  $seeAllRow.replaceChildren();
  const want = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].want === true) {
      want.push(data[i]);
    }
  }
  $seeAllRow.appendChild(renderGames(want, 'col-1-8'));
  $seeAllHeadline.textContent = 'Want to Play';
}

// Events
$seeAllView.addEventListener('click', event => {
  let gameID;
  if (event.target.closest('[data-item="game"]')) {
    gameID = event.target.closest('[data-item="game"]').id;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Number(gameID)) {
        window.scrollTo(0, 0);
        $seeAllView.classList.add('hidden');
        $gameInfoView.classList.remove('hidden');
        updateGameInfo(data[i]);
      }
    }
  }
});
// End See All Code//

// Search Code //
// Functions
function searchGames() {
  const $searchQuery = $searchForm[0].value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rawg.io/api/games?key=70f3566e2dca40338ef7b433dfc63e7b&page=1&page_size=12&search=' + $searchQuery);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const results = xhr.response.results;
    $searchView.appendChild(buildSearchResults(results));
    $loadingView.classList.add('hidden');
    $searchView.classList.remove('hidden');
  });
  xhr.send();
}

function buildSearchResults(results) {
  const $searchResults = document.querySelector('#search-results');
  if ($searchResults) {
    $searchResults.remove();
  }

  const $resultRow = document.createElement('div');
  $resultRow.setAttribute('class', 'row search');
  $resultRow.setAttribute('id', 'search-results');

  for (let i = 0; i < results.length; i++) {
    const $game = document.createElement('div');
    $game.setAttribute('class', 'col-1-3 flex-group-vert');
    $game.setAttribute('data-item', 'game');
    $game.setAttribute('data-id', results[i].id);

    const $gameLink = document.createElement('a');

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
    $gameLink.appendChild($title);
    $imgWrap.appendChild($coverImg);
    $resultRow.appendChild($game);
  }

  return $resultRow;
}

// Events
$searchView.addEventListener('click', event => {
  let gameID;
  if (event.target.closest('[data-item="game"]')) {
    gameID = event.target.closest('[data-item="game"]').getAttribute('data-id');
  }
  findCurrentGame(gameID);
  $loadingView.classList.remove('hidden');
  $searchView.classList.add('hidden');
  window.scrollTo(0, 0);
});

$searchForm.addEventListener('submit', event => {
  $loadingView.classList.remove('hidden');
  $gameInfoView.classList.add('hidden');
  $dashboardView.classList.add('hidden');
  $favoriteView.classList.add('hidden');
  event.preventDefault();
  searchGames();
  $searchForm.reset();
});
// End Search Code //

// Game Info Code //
// Funcitons
function findCurrentGame(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rawg.io/api/games/' + id + '?key=70f3566e2dca40338ef7b433dfc63e7b');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    currentGame = xhr.response;
    updateGameInfo(currentGame);
    $loadingView.classList.add('hidden');
    $gameInfoView.classList.remove('hidden');
  });
  xhr.send();
}

function updateGameInfo(game) {
  currentGame = game;
  const $gameMainImg = document.querySelector('.info-main-img');
  const $glowImg = document.querySelector('.glow-img');
  const $gameTitle = document.querySelector('#game-title');
  const $gameDescription = document.querySelector('#game-description');
  $gameMainImg.setAttribute('src', game.background_image);
  $gameMainImg.setAttribute('alt', game.name);
  $glowImg.setAttribute('src', game.background_image);
  $gameTitle.textContent = game.name;
  $gameDescription.innerHTML = game.description;
  updateButtonState();
}

function updateButtonState() {
  $wantButton.classList.remove('active');
  $playedButton.classList.remove('active');
  $thumbsUpButton.classList.remove('active');
  $thumbsDownButton.classList.remove('active');
  $favoriteButton.classList.add('hidden');
  $ratingView.classList.add('hidden');

  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === currentGame.id) {
        if (data[i].played === true) {
          $playedButton.classList.add('active');
          $wantButton.classList.remove('active');
          $ratingView.classList.remove('hidden');
          $favoriteButton.classList.remove('hidden');
        } else if (data[i].want === true) {
          $wantButton.classList.add('active');
          $playedButton.classList.remove('active');
          $ratingView.classList.add('hidden');
          $favoriteButton.classList.add('hidden');
        }
        if (data[i].thumbsUp === true) {
          $thumbsUpButton.classList.add('active');
          $thumbsDownButton.classList.remove('active');
        } else if (data[i].thumbsDown === true) {
          $thumbsUpButton.classList.remove('active');
          $thumbsDownButton.classList.add('active');
        }
        if (data[i].favorite === true) {
          $favoriteButton.classList.add('active');
        } else if (data[i].favorite === false) {
          $favoriteButton.classList.remove('active');
        }
      }
    }
  }
}

function createGameData() {
  const game = {};
  game.id = currentGame.id;
  game.name = currentGame.name;
  game.description = currentGame.description;
  game.background_image = currentGame.background_image;
  game.want = false;
  game.played = false;
  game.favorite = false;
  game.thumbsUp = false;
  game.thumbsDown = false;
  data.unshift(game);
}

function updateGameStatus(event) {
  if (data.length !== 0) {
    let gameInData = false;
    if (event.target === $playedButton) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === currentGame.id) {
          gameInData = true;
          data[i].played = true;
          data[i].want = false;
        }
      }
      if (gameInData === false) {
        createGameData();
        data[0].played = true;
      }
    }
    if (event.target === $wantButton) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === currentGame.id) {
          gameInData = true;
          data[i].played = false;
          data[i].want = true;
        }
      }
      if (gameInData === false) {
        createGameData();
        data[0].want = true;
      }
    }
  } else {
    if (event.target === $playedButton) {
      createGameData();
      data[0].played = true;
    }
    if (event.target === $wantButton) {
      createGameData();
      data[0].want = true;
    }
  }
}

function updateGameRating(event) {
  if (event.target === $thumbsUpButton) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === currentGame.id) {
        data[i].thumbsUp = true;
        data[i].thumbsDown = false;
      }
    }
  }
  if (event.target === $thumbsDownButton) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === currentGame.id) {
        data[i].thumbsUp = false;
        data[i].thumbsDown = true;
      }
    }
  }
  if (event.target === $favoriteButton) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === currentGame.id) {
        if (data[i].favorite === false) {
          data[i].favorite = true;
        } else { data[i].favorite = false; }
      }
    }
  }
}

// Events
$gameInfoGroup.addEventListener('click', event => {
  updateGameStatus(event);
  updateGameRating(event);
  updateButtonState();
});
// End Game Info Code //
