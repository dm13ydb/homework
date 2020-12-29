// Тут мы просто расширяем стандартные массивы своим классом.
// При этом так как нас интересуют только методы, мы можем использовать констуктор оригинальных массивов, чтобы не делать свой, по этому я его закомментировал.

class MyArray extends Array {
    // constructor() {
    //     super();
    //     if (arguments.length === 1 && typeof arguments[0] === 'number') {
    //         for (let i = 0; i < arguments[0]; i++) {
    //             let key = i;
    //             this[key];
    //             this.length = arguments[0];
    //         }
    //     } else {
    //         for (let i = 0; i < arguments.length; i++) {
    //             let key = i;
    //             this[key] = arguments[i];
    //             this.length = arguments.length;
    //         }
    //     }
    // }

    myPush() {
        for (let i = 0; i < arguments.length; i++) {
            this[this.length] = arguments[i];
        }
        return this.length;
    }

    myJoin(separator = ',') {
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
    }

    myReverse() {
        for (let i = 0; i < this.length / 2; i++){
            let temp = this[i];
            this[i] = this[this.length - 1 - i];
            this[this.length - 1 - i] = temp;
        }
        return this;
    }
}

// По аналогии с вариантом через функцию конструктор, только тут уже через класс - создаем массив с нашими методами.

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

// Проверка что конструктор MyArray доступен. В нашем случае это будет тот же конструткор стандартного Array. Если расскоментировать конструктор в классе, то будет уже использовать классовый.

let arrtest2 = new arrMyTest.constructor(1, 2, 5);
console.log(arrtest2);