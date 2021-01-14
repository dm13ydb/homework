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

citiesSearch.addEventListener('input', function() {

    this.value = this.value.replace(/[\\+?*()\[\]$}{}^><|.]/, '');
    let regexp = new RegExp(`^${this.value}`, `i`);

    for (let i = 0; i < citiesList.length; i++) {
        if (!regexp.test(citiesList[i].innerHTML) || this.value.length === 0) {
            citiesList[i].classList.remove('red');
        } else {
            citiesList[i].classList.add('red');
        }
    }
});