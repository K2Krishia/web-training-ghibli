import {html, render} from 'https://unpkg.com/lit-html?module';

const logo = (logo) => html`
    <img src=${logo}>
`;

const movieCard = (movies) => html`
    ${movies.map((movie) => html`
        <div class="card">
            <h1>${movie.title}</h1>
            <p>${movie.description}...</p>
        </div>
    ` 
    )}
`;

render(logo('logo.png'), document.querySelector('#root'));

fetch('https://ghibliapi.herokuapp.com/films', {
    method: 'GET'
    }) 
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then(function (data) {
        render(movieCard(data), document.querySelector('#container'));
        console.log('done')
    })
    .catch(function (err) {
        console.log(err);
        // const errorMessage = document.createElement('marquee')
        // errorMessage.textContent = `Gah, it's not working!`
        // app.appendChild(errorMessage)
    })