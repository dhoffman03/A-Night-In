var beginNight = document.querySelector('#btn')

function handleSubmit(event) {
    event.preventDefault();

    var queryString = './search.html';

    location.assign(queryString);
}

beginNight.addEventListener('click',handleSubmit);