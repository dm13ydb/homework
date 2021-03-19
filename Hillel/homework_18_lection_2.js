const users = [];
const id = Symbol.for('id');
const actions = ['Edit', 'View', 'Remove'];
const $usersTable = document.querySelector('.users-table');
const $addUserButton = document.querySelector('.users-control-room__add-button');
const $controlForm = document.querySelector('.users-control-room__form');
const submitButton = $controlForm.querySelector('input[type=submit]');

class User {
    constructor(formData) {
        this[id] = this.generateFreeId();
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
    let $ul = document.createElement('ul');
    let headers = getHeaders(headerRow);

    $ul.classList.add('users-table__row');
    $ul.dataset.id = userData[id];

    for (let column of headers) {
        let $li = document.createElement('li');

        switch(column) {
            case 'id' : $li.innerHTML = userData[id];
            break;
            case 'skills' : $li.innerHTML = userData[column].join(', ');
            break;
            case 'actions' : createButtonsCollection(actions).forEach(item => $li.append(item));
            break;
            default: $li.innerHTML = userData[column] === undefined ? '' : userData[column];
        }

        $ul.append($li);
    }

    return $ul;
}

function getHeaders(headerRow) {
    let row = document.querySelector(headerRow).children;
    return Array.from(row, item => item.innerHTML.toLowerCase());
}

function createActionButton(action) {
    let button = document.createElement('input');

    button.setAttribute('type', 'button');
    button.setAttribute('value', action);
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

function addUser(event) {
    event.preventDefault();
    let user = new User(getFormData());
    users.push(user);
    $usersTable.append(createRow(user, '.users-table__header'));
    $controlForm.reset();
    $controlForm.classList.remove('show');
}

function editUser(currentUser, currentRow, event) {
    event.preventDefault();
    let formData = getFormData();
    if (!confirm('Are you sure you want to edit this user?')) return;
    currentUser.edit(formData, currentRow);
    $controlForm.reset();
    $controlForm.classList.remove('show');
}

function removeUser(currentUser, currentRow) {
    if (!confirm('Are you sure you want to remove this user?')) return;
    currentRow.remove();
    currentUser.active = false;
    currentUser.delete(users);
    $controlForm.classList.remove('show');
}

$addUserButton.addEventListener('click', () => {
    $controlForm.reset();
    disableFormInputs(false);
    submitButtonControl();
    $controlForm.classList.add('show');
    $controlForm.onsubmit = addUser;
})

$usersTable.addEventListener('click', event => {
    if (event.target.type === 'button') {
        let currentRow = event.target.parentElement.parentElement;
        let currentUserId = +currentRow.dataset.id;
        let currentUser = users.find(user => user[id] === currentUserId);

        if (event.target.value === 'Edit') {
            setFormData(currentUser);
            disableFormInputs(false);
            submitButtonControl();
            $controlForm.classList.add('show');
            $controlForm.onsubmit = event => editUser(currentUser, currentRow, event);
        }

        if (event.target.value === 'View') {
            setFormData(currentUser);
            disableFormInputs(true);
            $controlForm.classList.add('show');   
        }

        if (event.target.value === 'Remove') {
            removeUser(currentUser, currentRow);
        }
    }
})


// Ниже 2 тестовых пользователя с функцией для их добавления. Это можно удалить.

function addTestUser(userData) {
    let user = new User(userData);
    users.push(user);
    $usersTable.append(createRow(user, '.users-table__header'));
}

let firstTestUserData = {
    name: 'Jack',
    surname: 'White',
    age: 26,
    adress: 'USA, California',
    skills: ['JS', 'Python'],
}

let secondTestUserData = {
    name: 'Bill',
    surname: 'Jonson',
    age: 36,
    adress: 'USA, California',
    skills: ['JS', 'PHP'],
}

addTestUser(firstTestUserData);
addTestUser(secondTestUserData);