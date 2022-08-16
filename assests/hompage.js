var beginNight = document.querySelector('#btn')

function handleSubmit(event) {
    event.preventDefault();

    var queryString = './index.html';

    location.assign(queryString);
}

beginNight.addEventListener('click',handleSubmit);