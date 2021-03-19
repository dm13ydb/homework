const users = [
    {
        name: 'Jack',
        surname: 'White',
        age: 26,
        adress: 'USA, California',
        skills: ['JS', 'Phyton'],
    },
    {
        name: 'Bill',
        surname: 'Jonson',
        age: 36,
        adress: 'USA, California',
        skills: ['JS', 'PHP'],
    }
];

const userId = Symbol('id');
const columnsData = [userId, 'name', 'surname', 'age', 'adress', 'skills'];
const actionButtons = ['Edit', 'View', 'Remove'];
const $usersTable = document.querySelector('.users-table');
const $addUserButton = document.querySelector('.users-control-room__add-button');
const $controlForm = document.querySelector('.users-control-room__form');

function createUser(user) {
    let $userRow = document.createElement('ul');

    $userRow.classList.add('users-table__row');

    user[userId] = document.querySelector('.users-table__row') ? +document.querySelector('.users-table__row:last-of-type li:first-child').innerHTML + 1 : 1;

    $userRow.dataset.id = user[userId];

    for (let data of columnsData) {
        let $userCol = document.createElement('li');
        $userCol.innerHTML = user[data] === undefined ? '' : Array.isArray(user[data]) ? user[data].join(', ') : user[data];
        $userRow.append($userCol);
    }

    $userRow.append(createActionButtons(user[userId]));

    return $userRow;
}

function createActionButtons(userId) {
    let $actionButtonsCell = document.createElement('li');

    for (let data of actionButtons) {
        let $actionButton = document.createElement('input');
        $actionButton.setAttribute('type','button');
        $actionButton.setAttribute('value', data);
        $actionButton.dataset.id = userId;
        $actionButton.classList.add('users-table__action-btn');
        $actionButton.classList.add(`users-table__action-btn_${data.toLowerCase()}`);
        $actionButtonsCell.append($actionButton);
    }

    return $actionButtonsCell;
}

function addUser(user) {
    $usersTable.append(createUser(user));
}

(function(users) {
    for (let user of users) {
        addUser(user);
    }
})(users);

function getFormData() {
    let data = {};
    let elements = $controlForm.elements;

    for (let element of elements) {
        if (element.type === 'text' || element.tagName === 'TEXTAREA') {
            data[element.name] = element.value; 
        } else if (element.type === 'number' ) {
            data[element.name] = element.value === '' ? '' : +element.value; 
        } else if (element.type === 'checkbox') {
            if (!data.skills) {
                data.skills = [];
            }
            if (element.checked) {
                data.skills.push(element.name);
            }
        }
    }

    return data;
}

function newUser(event) {    
    event.preventDefault();
    let userData = getFormData();
    addUser(userData);
    users.push(userData);
    $controlForm.classList.remove('show');
    $controlForm.reset();
    $controlForm.removeEventListener('submit', newUser);
}

$addUserButton.addEventListener('click', function() {
    $controlForm.reset();
    $controlForm.removeEventListener('submit', editHandler);
    $controlForm.removeEventListener('submit', newUser);
    disableFormInputs(false);
    $controlForm.classList.add('show');
    $controlForm.addEventListener('submit', newUser);
})

function editUser(user, row, event) {
    event.preventDefault();
    if (!confirm('Are you sure you want to edit this user?')) return;

    let data = getFormData();
    let keys = Object.keys(data);
    

    for (let key of keys) {
        if (data[key] !== user[key]) {
            user[key] = data[key];
            let currentColumn = columnsData.indexOf(key) + 1;
            row.querySelector(`li:nth-child(${currentColumn})`).innerHTML = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
        }
    }

    $controlForm.classList.remove('show');
    $controlForm.reset();
    $controlForm.removeEventListener('submit', editHandler);
}

function getCurrentUser(event) {
    let currentUserId = +event.target.dataset.id;
    let currentUser = users.find(user => user[userId] === currentUserId);
    return currentUser;
}

function setFormData(user) {
    let elements = $controlForm.elements;

    for (let element of elements) {
        if (element.type === 'checkbox' && Array.isArray(user.skills) && user.skills.includes(element.name)) {
            element.checked = true;
        } else if (element.name) {
            element.value = user[element.name];
        }
    }
}

function disableFormInputs(status) {
    let submitButton = $controlForm.querySelector('input[type=submit]');
    for (let element of $controlForm) {
        if (status) {
            element.disabled = true;
            submitButton.style.display = 'none';
        } else {
            element.disabled = false;
            submitButton.style.display = 'inline-block';
        }
    }
}

function removeUser(user, row) {
    if (!confirm('Are you sure you want to remove this user?')) return;
    row.remove();
    users.splice(users.indexOf(user), 1);
}

let editHandler;

$usersTable.addEventListener('click', function(event) {
    if (event.target.type === 'button') {
        let currentUser = getCurrentUser(event);
        let currentRow = Array.from($usersTable.querySelectorAll('.users-table__row')).find(row => +row.dataset.id === currentUser[userId]);

        if (event.target.value === 'Edit') {
            $controlForm.reset();
            $controlForm.removeEventListener('submit', editHandler);
            $controlForm.removeEventListener('submit', newUser);
            setFormData(currentUser);
            disableFormInputs(false);
            $controlForm.classList.add('show');
            $controlForm.addEventListener('submit', editHandler = editUser.bind(null, currentUser, currentRow));
        } else if (event.target.value === 'View') {
            $controlForm.reset();
            setFormData(currentUser);
            disableFormInputs(true);
            $controlForm.classList.add('show');
        } else if (event.target.value === 'Remove') {
            removeUser(currentUser, currentRow);
            
        }
    }
})