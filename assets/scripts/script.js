const apiKey = '339f18bb88e49509ba211e440d6e6260';
const urlList = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
const urlImage = 'https://image.tmdb.org/t/p/w300';

function getUrlSearch(query) {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=1`;
}

const contentContainer = document.getElementById('content');

document.getElementById('searchInput').addEventListener('input', search);

async function search() {
  const searchValue = document.getElementById('searchInput').value;

  console.log(searchValue);
  if (!searchValue || searchValue !== '' || searchValue !== ' ') {
    console.log('here')
    const response = await fetch(getUrlSearch(searchValue));
    const result = await response.json();
  
    const data = result.results;

    if (Array.isArray(data)) {
      contentContainer.innerHTML = '';
  
      data.forEach(function (movie) {
        const cards = `
        <div class="card mt-5" style="width: 18rem;">
          <img class="card-img-top" src="${urlImage + movie.backdrop_path}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.overview}</p>
            <p class="card-text mt-2 smalltxt">Release : ${movie.release_date}</p>
          </div>
            <div class="card footer bg-info">
              <p class="score mt-3">&#9733; ${movie.vote_average}</p>
            </div>
          </div>
        <br>`
    
        const elements = document.createElement('div');
        elements.innerHTML = cards;
        elements.className = "col-lg-4 mt-4"
        contentContainer.appendChild(elements);
      });
    };
  }
}

async function main() {
  const response = await fetch(urlList);
  const result = await response.json();

  const data = result.results;

  console.log(data)

  contentContainer.innerHTML = '';
  
  data.forEach(function (movie) {
    const cards = `
    <div class="card mt-5" style="width: 18rem;">
      <img class="card-img-top" src="${urlImage + movie.backdrop_path}">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">${movie.overview}</p>
        <p class="card-text mt-2 smalltxt">Release : ${movie.release_date}</p>
      </div>
        <div class="card footer bg-info">
          <p class="score mt-3">&#9733; ${movie.vote_average}</p>
        </div>
      </div>
    <br>`

    const elements = document.createElement('div');
    elements.innerHTML = cards;
    elements.className = "col-lg-4 mt-4"
    contentContainer.appendChild(elements);
  });
}

main();