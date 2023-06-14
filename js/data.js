/* exported data */
var data = [];

window.addEventListener('beforeunload', event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

const savedGames = localStorage.getItem('data');

if (savedGames !== null) {
  data = JSON.parse(savedGames);
}
