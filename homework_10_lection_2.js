// На самом деле не расширяя стандартные методы встроенного прототипа массивов, можно сделать свой класс, который будет содержать эти методы.
// Единственное что нам надо будет создавать такие масиивы, с помощью этого класса и это будут не совсем массивы, а объекты напоминающие массивы. 
// У стандартных массивов наших методов не будет. Но псевдомассивам созданным через наш класс, будут доступны методы стандартных массивов.

// Объект с методами и он же содержит свойство __proto__ с ссылкой на протатип массивов и свойство constructor со ссылкой на функцию конструктор(как оно есть по умолчанию),
// Единственное что в данном случае, методу myPush пришлось добавить инкримент свойства length, так как тут мы будем его вызывать не у оригинального массива, а у нашего псевдомассива.

let myMethods = {
    constructor: MyArray,
    myPush: function() {
        for (let i = 0; i < arguments.length; i++) {
            this[this.length] = arguments[i];
            this.length++;
        }
        return this.length;
    },
    myJoin: function(separator = ',') {
        separator = String(separator);
        let result = '';
        for (let i = 0; i < this.length; i++) {
            if(this[i] === null || this[i] === undefined) {
                result += '';
            } else {
                result += this[i];
            }
            if(i !== this.length - 1) {
                result += separator;
            }
        }
        return result;
    },
    myReverse: function() {
        for (let i = 0; i < this.length / 2; i++){
            let temp = this[i];
            this[i] = this[this.length - 1 - i];
            this[this.length - 1 - i] = temp;
        }
        return this;
    },
};

// Устанавливаем протатип для нашего объекта myMethods. Можно было прямо в нем сделать __proto__ = Array.prototype, но это не очень хороший способ.

Object.setPrototypeOf(myMethods, Array.prototype);

// Сама функция констркуткор. Посторался сделать схожей с конструктором оригинальных массивов.

function MyArray() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        for (let i = 0; i < arguments[0]; i++) {
            let key = i;
            this[key];
            this.length = arguments[0];
        }
    } else {
        for (let i = 0; i < arguments.length; i++) {
            let key = i;
            this[key] = arguments[i];
            this.length = arguments.length;
        }
    }
}

// Инструкция что протатипом нашей функции конструктора должен являтся объект myMethdots.

MyArray.prototype = myMethods;

// Пример псевдомассива созданным нашим новым классом и примененя к нему как родных методов класса, так и методов оригинальных массивов.

let arrMyTest = new MyArray('', 1, null, undefined, true, false, {name: 'John', age: 25}, function someOtherFunct() {});
arrMyTest.push(7);
arrMyTest.myPush(999);
console.log(arrMyTest);
console.log(arrMyTest.join());
console.log(arrMyTest.myJoin());
console.log(arrMyTest.myReverse());
console.log(arrMyTest.reverse().reverse());

// Ну и такой же массив созданный стандартным способом и его методы для сравнения.

let arrTest = new Array('', 1, null, undefined, true, false, {name: 'John', age: 25}, function someOtherFunct() {});
arrTest.push(7);
arrTest.push(999);
console.log(arrTest);
console.log(arrTest.join());
console.log(arrTest.reverse());

// Проверка что конструктор MyArray доступен.

let arrtest2 = new arrMyTest.constructor(1, 2, 5);
console.log(arrtest2);

// Если убрать ссылку у свойства конструктора на нашу функцию конструктор, то будет использован конструктор Array

delete myMethods.constructor;

let arrtest3 = new arrMyTest.constructor(1, 2, 5);
console.log(arrtest3);