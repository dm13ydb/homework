// Опять не смог явно трактовать условия задание по этому сделал несколько вариантов

// Тут просто 2 объекта с разными полями.

let user1 = {
    id: 1,
    name: 'John',
    age: 30,
    someFunction: function() {
        console.log(this);
    },
    anotherFunction: () => {
            console.log(this);
    },
    places: [1, 1, 1, 1, 3, 1, 2, 5, 7],
    prizes: [1000, 500, 500, 5000, 2000, 1500, 7000],
    pet: {
        id: 1,
        type: 'cat',
        name: 'Pensacola',
        age: 2,
    },
    vehicles: [
        {
            id: 1,
            type: 'car',
            maker: 'Hyundai',
            model: 'i30',
        },
        {
            id: 2,
            type: 'car',
            maker: 'Ford',
            model: 'Windsater',
        },
        {
            id: 3,
            type: 'motorbike',
            maker: 'Bajaj',
            model: 'Avenger Street',
        }
    ]
}

let user2 = {
    id: 2,
    name: 'Jane',
    age: 25,
    someFunction: function() {
        console.log(this);
    },
    anotherFunction: () => {
            console.log(this);
    },
    places: [2, 2, 2, 1, 1, 5, 3, 1, 1],
    prizes: [2000, 300, 400, 9000, 2500, 1800, 7200],
    pet: {
        id: 1,
        type: 'dog',
        name: 'Enriki',
        age: 5,
    },
    vehicles: [
        {
            id: 1,
            type: 'car',
            maker: 'Mazda',
            model: '3',
        },
        {
            id: 2,
            type: 'motorbike',
            maker: 'Harley-Davidson',
            model: 'Electro Glide',
        }
    ],
    workhours: [8, 7, 4, 8, 8, 8, 4, 6.5, 7.5, 10.5],
    films: ['Star Wars', 'Battlestar Galactica', '23', 1998, 'Dead End'],
}

// Тут не учитвается уровень вложенности объектов. То есть если внутри объекта есть другой объект с массивом внутри, такое не считает.
// На сколько я помню говорили что это не надо.
// Так же я не стал выносить отдельные расчеты в друие функции. Например фукнции подсчета численных элементов в массиве.
// Ее я считаю что можно вынести, но так как такую функцию делали в пред идущем задании не стал тут уже менять.

// Вариант 1. Если трактовать "Посчитать сумму численных элементов в массивах." что у нас будут конкатинироваться массивы внутри объекта
// Но для каждого из них мы будем получать массив и считать его сумму.

// Функция перебирает переданные в нее объекты
// В каждом объекте перебирает его свойства
// Если свойство является массивом, конкатенирует его с заранее созданным пустым массивом(переменная arr)
// После чего перебирает элементы полученного единого массива объекта.
// Если элемент является числом и при этом не NaN. Суммирует значение с заранее созданной переменной sum.
// Эту ссуму в sum передает как элемент массива в переменную sums
// После чего функция возвращает нам суммы всех массивов каждого объекта в виде строки, через запятую

function getSumFromObjArrays() {
    let sums = [];
    for (i in arguments){
        let arr = [];
        let sum = 0;
        for (property in arguments[i]) {
            if (Array.isArray(arguments[i][property])){
                arr = arr.concat(arguments[i][property]);
            }
        }
        for (i in arr) {
            if (typeof(arr[i]) === 'number' && !isNaN(arr[i])) {
                sum += arr[i];
            }
        }
        sums.push(sum);
    }
    return sums.join(', ');
}

console.log(getSumFromObjArrays(user1, user2));

// Вариант 2. Если трактовать "переберёт оба объекта и сконкатениурет все поля-массивы." что у нас будут конкатинироваться массивы с обоих объектов
// То есть мы получим один массив и одну сумму.

// Функция перебирает переданные в нее объекты
// В каждом объекте перебирает его свойства
// Если свойство является массивом, конкатенирует его с заранее созданным пустым массивом(переменная arr) и переходит к следующему объекту
// После чего перебирает элементы полученного единого массива объектов
// Если элемент является числом и при этом не NaN. Суммирует значение с заранее созданной переменной sum.
// Возвращает сумму всех численных значение из всех массивов все переданных объектов.
/*
function getSumFromObjArrays() {
    let sum = 0;
    let arr = [];
    for (i in arguments){
        for (property in arguments[i]) {
            if (Array.isArray(arguments[i][property])){
                arr = arr.concat(arguments[i][property]);
            }
        }
    }
    for (i in arr) {
        if (typeof(arr[i]) === 'number' && !isNaN(arr[i])) {
        sum += arr[i];
        }
    }
    return sum;
}

console.log(getSumFromObjArrays(user1, user2));
*/
// Вариант 3. Я не совсем понимаю зачем нам тут конкатинировать массивы, если мы можем сразу считать сумму.
// По этому на всякий случай сразу сделал и такой вариант. Это аналог Варианта 2, только без конкатинации.
/*
function getSumFromObjArrays() {
    let sum = 0;
    for (i in arguments){
        for (property in arguments[i]) {
            if (Array.isArray(arguments[i][property])){
                for (j in arguments[i][property]) {
                    if (typeof(arguments[i][property][j]) === 'number' && !isNaN(arguments[i][property][j])) {
                        sum += arguments[i][property][j];
                    }
                }
            }
        }
    }
    return sum;
}

console.log(getSumFromObjArrays(user1, user2));
*/
// Вариант 4. Ну и также без конкатинации аналог для варианта 1.
/*
function getSumFromObjArrays() {
    let sums = [];
    for (i in arguments){
        let sum = 0;
        for (property in arguments[i]) {
            if (Array.isArray(arguments[i][property])){
                for (j in arguments[i][property]) {
                    if (typeof(arguments[i][property][j]) === 'number' && !isNaN(arguments[i][property][j])) {
                        sum += arguments[i][property][j];
                    }
                }
            }
        }
        sums.push(sum);
    }
    return sums.join(', ');
}

console.log(getSumFromObjArrays(user1, user2));
*/