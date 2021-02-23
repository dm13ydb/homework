const users = [];
const id = Symbol.for('id');
const actions = ['Edit', 'View', 'Remove'];
const $usersTable = document.querySelector('.users-table');
const $addUserButton = document.querySelector('.users-control-room__add-button');
const $controlForm = document.querySelector('.users-control-room__form');
const submitButton = $controlForm.querySelector('input[type=submit]');

// Ниже массив с тестовыми пользователями, для наглядности. В функции renderUsers при отсутсвтвии пользователей в local storage будут добавляться эти и они уже будут начальыми в local storage.
// Это можно убрать и почистить лишнии проверки на id в функциях, но пока оставил так

let testUsers = [
    {
    [id]: 1,
    name: 'Jack',
    surname: 'White',
    age: 26,
    adress: 'USA, California',
    skills: ['JS', 'Python'],
    },
    {
    [id]: 5,
    name: 'Bill',
    surname: 'Jonson',
    age: 36,
    adress: 'USA, California',
    skills: ['JS', 'PHP'],
    }
]

class User {
    constructor(formData) {
        this[id] = formData[id] ? formData[id] : this.generateFreeId();
        this.name = formData.name;
        this.surname = formData.surname;
        this.age = formData.age;
        this.adress = formData.adress;
        this.skills = formData.skills;
        this.active = true;
    }

    generateFreeId() {
        let newId = 1;
        while(users.find(user => user[id] === newId)) { newId++ };
        return newId;
    }

    edit(formData, userRow) {
        for (let key of Object.keys(formData)) {
            if (Array.isArray(formData[key])) {

                if (formData[key].join() !== this[key].join()) {
                    Array.from(userRow.children).find(column => column.innerHTML === this[key].join(', ')).innerHTML = formData[key].join(', ');
                    this[key] = formData[key];
                }

            } else if (this[key] !== formData[key]) {
                Array.from(userRow.children).find(column => column.innerHTML === this[key].toString()).innerHTML = formData[key];
                this[key] = formData[key];
            }
        }
        return this;
    }

    delete(usersCollection) {
        usersCollection.splice(usersCollection.indexOf(this), 1);
    }
}

function createRow(userData, headerRow) {
    let $tr = document.createElement('tr');
    let headers = getHeaders(headerRow);

    $tr.dataset.id = userData[id];

    for (let column of headers) {
        let $td = document.createElement('td');

        switch(column) {
            case 'id' : $td.innerHTML = userData[id];
            break;
            case 'skills' : $td.innerHTML = userData[column].join(', ');
            break;
            case 'actions' : createButtonsCollection(actions).forEach(item => $td.append(item));
            break;
            default: $td.innerHTML = userData[column] === undefined ? '' : userData[column];
        }

        $tr.append($td);
    }

    return $tr;
}

function getHeaders(headerRow) {
    let row = document.querySelector(headerRow).children;
    return Array.from(row, item => item.innerHTML.toLowerCase());
}

function createActionButton(action) {
    let button = document.createElement('button');

    button.innerHTML = action;
    button.classList.add('users-table__action-btn');
    button.classList.add(`users-table__action-btn_${action.toLowerCase()}`);
    
    return button;
}

function createButtonsCollection(actions) {
    let buttonCollection = [];

    for (let action of actions) {
        buttonCollection.push(createActionButton(action));
    }

    return buttonCollection;
}

function getFormData(form = $controlForm) {
    let formData = {};

    for (let element of form.elements) {
        if (element.type === 'checkbox' && element.name && element.value) {

            if (!formData[element.name]) {
                formData[element.name] = [];
            }

            if (element.checked) {
                formData[element.name].push(element.parentElement.innerText.trim());
            }

        } else if (element.type === 'number') {
            formData[element.name] = element.value ? +element.value : '';
        } else if (element.type === 'text' || element.tagName === 'TEXTAREA') {
            formData[element.name] = element.value;
        }
    }

    return formData;
}

function setFormData(currentUser, form = $controlForm) {
    for (let element of form.elements) {
        if (element.type === 'checkbox' && element.name && element.value ) {
            element.checked = currentUser[element.name].find(skill => skill.toLowerCase() === element.value);
        } else if (element.type === 'number' || element.type === 'text' || element.tagName === 'TEXTAREA') {
            element.value = currentUser[element.name];
        }
    }
}

function disableFormInputs(status) {
    for (let element of $controlForm) {
        if (element !== submitButton) element.disabled = status;            
        submitButton.style.display = status ? 'none' : 'inline-block';
    }
}

function submitButtonControl() {
    let primeData = getFormData();
    submitButton.disabled = true;

    $controlForm.oninput = () => {
        let changedData = getFormData();

        for (let key of Object.keys(changedData)) {
            if (Array.isArray(changedData[key])) {

                if (changedData[key].join() !== primeData[key].join()) {
                    submitButton.disabled = false;
                    return;
                }

            } else if (changedData[key] !== primeData[key]) {
                submitButton.disabled = false;
                return;   
            }
        }
        submitButton.disabled = true;
    }
}

function createUser(data) {
    let user = new User(data);
    users.push(user);
    return user;
}

function addUser(event) {
    event.preventDefault();
    let user = createUser(getFormData());
    updateLocalStorage(users);
    $usersTable.querySelector('tbody').append(createRow(user, 'thead tr'));
    $controlForm.reset();
    $controlForm.classList.remove('show');
}

function editUser(currentUser, currentRow, event) {
    event.preventDefault();
    let formData = getFormData();
    if (!confirm('Are you sure you want to edit this user?')) return;
    currentUser.edit(formData, currentRow);
    updateLocalStorage(users);
    $controlForm.reset();
    $controlForm.classList.remove('show');
}

function removeUser(currentUser, currentRow) {
    if (!confirm('Are you sure you want to remove this user?')) return;
    currentRow.remove();
    currentUser.active = false;
    currentUser.delete(users);
    updateLocalStorage(users);
    $controlForm.classList.remove('show');
}

function checkLocalStorage() {
    return Array.isArray(JSON.parse(localStorage.getItem('users'))) ? true : false;
}

function updateLocalStorage(users) {
    for (let user of users) {
        user.id = user[id];
    }
    localStorage.setItem('users', JSON.stringify(users));
}

function renderUsers() {
    let usersLocalData;
    if (checkLocalStorage()) {
        usersLocalData = JSON.parse(localStorage.getItem('users'));
    } else {
        usersLocalData = testUsers;
    }

    for (let user of usersLocalData) {
        user[id] = user[id] ? user[id] : user.id;
        delete user.id;
        createUser(user);
        $usersTable.querySelector('tbody').append(createRow(user, 'thead tr'));
    }
    updateLocalStorage(users);
}

$addUserButton.addEventListener('click', () => {
    $controlForm.reset();
    disableFormInputs(false);
    submitButtonControl();
    $controlForm.classList.add('show');
    $controlForm.onsubmit = addUser;
})

$usersTable.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        let currentRow = event.target.parentElement.parentElement;
        let currentUserId = +currentRow.dataset.id;
        let currentUser = users.find(user => user[id] === currentUserId);

        if (event.target.innerHTML === 'Edit') {
            setFormData(currentUser);
            disableFormInputs(false);
            submitButtonControl();
            $controlForm.classList.add('show');
            $controlForm.onsubmit = event => editUser(currentUser, currentRow, event);
        }

        if (event.target.innerHTML === 'View') {
            setFormData(currentUser);
            disableFormInputs(true);
            $controlForm.classList.add('show');   
        }

        if (event.target.innerHTML === 'Remove') {
            removeUser(currentUser, currentRow);
        }
    }
})

renderUsers();