let cities = [
    "Винница", "Днепр", "Донецк",
    "Житомир", "Запорожье", "Ивано-Франковск",
    "Киев", "Кропивницкий", "Луганск",
    "Луцк", "Львов", "Николаев",
    "Одесса", "Полтава", "Ровно",
    "Сумы", "Тернополь", "Ужгород",
    "Харьков", "Херсон", "Хмельницкий",
    "Черкассы", "Чернигов", "Черновцы"
];

let $input = document.createElement('input');

document.body.append($input);

let $ul = document.createElement('ul');

for (let i = 0; i < cities.length; i++) {
    let $li = document.createElement('li');
    $li.textContent = cities[i];
    $ul.append($li);
}

document.body.append($ul);

let citiesSearch = document.querySelector('input');
let citiesList = document.querySelectorAll('li');

function checkCoincidence(city) {
    let coincidence = '';
    for (let i = 0; i < citiesSearch.value.length; i++) {
        coincidence += city[i];
    }
    if (coincidence === citiesSearch.value &&
        coincidence !== '') {
        return true;
    }
    return false;
}

setInterval(() => {
    for (let i = 0; i < citiesList.length; i++) {
        if (checkCoincidence(citiesList[i].innerHTML)) {
            citiesList[i].style.color = 'red';
        } else {
            citiesList[i].style.color = 'black';
        }
    }
}, 0);