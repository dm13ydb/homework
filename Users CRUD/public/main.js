class Users {
    constructor(actions) {
        this.actions = actions;
        this._id = Symbol.for('id');
    }

    create(data) {
        let user = {};
        user[this._id] = this.generateFreeId();
        user.name = data.name;
        user.surname = data.surname;
        user.age = data.age;
        user.adress = data.adress;
        user.skills = data.skills;
        user.active = true;
        return user;
    }

    generateFreeId() {
        let newId = 1;
        while(this.list.find(user => user[this._id] === newId)) { newId++ };
        return newId;
    }

    async get(id) {
        const response = id ? await fetch(`/users/${id}`) : await fetch('/users');
        return this.list = await response.json();
    }


    async send(data) {
        data.id = data[this._id];
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        })
    }

    async edit(data) {
        const response = await fetch(`/users/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        })
    }

    async delete(data) {
        const response = await fetch(`/users/${data[this._id]}`, {
            method: 'DELETE',
        })
    }
}

class UsersTable {
    constructor(tableClass, addButtonClass, formClass, submitButtonClass) {
        this.$table = document.querySelector(tableClass);
        this.$addButton = document.querySelector(addButtonClass);
        this.$form = document.querySelector(formClass);
        this.$submit = this.$form.querySelector(submitButtonClass);
    }

    render() {
        users.get()
        .then(list => list.forEach(user => {
            user[users._id] = user.id;
            delete user.id;
            this.$table.querySelector('tbody').append(this.createRow(user, 'thead tr'));
        }))
    }

    createRow(user, headerRow) {
        let $tr = document.createElement('tr');
        let headers = this.getHeaders(headerRow);

        $tr.dataset.id = user[users._id];

        for (let column of headers) {
            let $td = document.createElement('td');
    
            switch(column) {
                case 'id' : $td.innerText = user[users._id];
                break;
                case 'skills' : $td.innerText = user[column].join(', ');
                break;
                case 'actions' : this.createButtonsCollection(users.actions).forEach(item => $td.append(item));
                break;
                default: $td.innerText = user[column] === undefined ? '' : user[column];
            }
    
            $tr.append($td);
        }
    
        return $tr;
    }

    getHeaders(headerRow) {
        let row = document.querySelector(headerRow).children;
        return Array.from(row, item => item.innerHTML.toLowerCase());
    }

    createButtonsCollection(actions) {
        let buttonCollection = [];
    
        for (let action of actions) {
            buttonCollection.push(this.createActionButton(action));
        }
    
        return buttonCollection;
    }

    createActionButton(action) {
        let button = document.createElement('button');
    
        button.innerText = action;
        button.classList.add('users-table__action-btn');
        button.classList.add(`users-table__action-btn_${action.toLowerCase()}`);
        
        return button;
    }

    disableFormInputs(status) {
        for (let element of this.$form) {
            if (element !== this.$submit) element.disabled = status;            
            this.$submit.style.display = status ? 'none' : 'inline-block';
        }
    }

    submitButtonControl() {
        let primeData = this.getFormData();
        this.$submit.disabled = true;
    
        this.$form.oninput = () => {
            let changedData = this.getFormData();
    
            for (let key of Object.keys(changedData)) {
                if (Array.isArray(changedData[key])) {
    
                    if (changedData[key].join() !== primeData[key].join()) {
                        this.$submit.disabled = false;
                        return;
                    }
    
                } else if (changedData[key] !== primeData[key]) {
                    this.$submit.disabled = false;
                    return;   
                }
            }
            this.$submit.disabled = true;
        }
    }

    getFormData(form = this.$form) {
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

    setFormData(currentUser, form = this.$form) {
        for (let element of form.elements) {
            if (element.type === 'checkbox' && element.name && element.value ) {
                element.checked = currentUser[element.name].find(skill => skill.toLowerCase() === element.value);
            } else if (element.type === 'number' || element.type === 'text' || element.tagName === 'TEXTAREA') {
                element.value = currentUser[element.name];
            }
        }
    }

    addUser(event) {
        event.preventDefault();
        let user = users.create(usersTable.getFormData());
        users.send(user)
        .then(() => {
            users.list.push(user);
            usersTable.$table.querySelector('tbody').append(usersTable.createRow(user, 'thead tr'));
            usersTable.$form.reset();
            usersTable.$form.classList.remove('show');
        })
        .catch((err) => {
            alert(`Something went wrong. Please try again.
            
            Error details:
            
            ${err}`);
        })
        
    }

    editUser(currentUser, currentRow, event) {
        event.preventDefault();
        let formData = this.getFormData();
        if (!confirm('Are you sure you want to edit this user?')) return;
        formData.id = currentUser[users._id];
        users.edit(formData)
        .then(() => {
            delete formData.id;

            for (let key of Object.keys(formData)) {
                if (Array.isArray(formData[key]) && formData[key].join() !== currentUser[key].join()) {
                    Array.from(currentRow.children).find(column => column.innerText === currentUser[key].join(', ')).innerText = formData[key].join(', ');
                    currentUser[key] = formData[key];
                }
                else if (currentUser[key] !== formData[key]) {
                    Array.from(currentRow.children).find(column => column.innerText === currentUser[key].toString()).innerText = formData[key];
                    currentUser[key] = formData[key];
                }
            }
            usersTable.$form.reset();
            usersTable.$form.classList.remove('show');
        })
        .catch((err) => {
            alert(`Something went wrong. Please try again.
            
            Error details:
            
            ${err}`);
        })
    }

    removeUser(currentUser, currentRow) {
        if (!confirm('Are you sure you want to remove this user?')) return;
        users.delete(currentUser)
        .then(() => {
            users.list.splice(users.list.indexOf(currentUser), 1);
            currentRow.remove();
            usersTable.$form.classList.remove('show');
        })
        .catch((err) => {
            alert(`Something went wrong. Please try again.
            
            Error details:
            
            ${err}`);
        })
    }
}

let users = new Users(['Edit', 'View', 'Remove']);
let usersTable = new UsersTable('.users-table', '.users-control-room__add-button', '.users-control-room__form', 'input[type=submit]');

usersTable.render();

usersTable.$addButton.addEventListener('click', () => {
    usersTable.$form.reset();
    usersTable.disableFormInputs(false);
    usersTable.submitButtonControl();
    usersTable.$form.classList.add('show');
    usersTable.$form.onsubmit = usersTable.addUser;
})

usersTable.$table.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        let currentRow = event.target.parentElement.parentElement;
        let currentUserId = +currentRow.dataset.id;
        let currentUser = users.list.find(user => user[users._id] === currentUserId)

        if (event.target.innerHTML === 'Edit') {
            usersTable.setFormData(currentUser);
            usersTable.disableFormInputs(false);
            usersTable.submitButtonControl();
            usersTable.$form.classList.add('show');
            usersTable.$form.onsubmit = event => usersTable.editUser(currentUser, currentRow, event);
        }

        if (event.target.innerHTML === 'View') {
            usersTable.setFormData(currentUser);
            usersTable.disableFormInputs(true);
            usersTable.$form.classList.add('show');   
        }

        if (event.target.innerHTML === 'Remove') {
            usersTable.removeUser(currentUser, currentRow);
        }
    }
})