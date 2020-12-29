// Реализовал все 3 метода в одном документе. Добавил их к прототипу Array, как было сказано, хотя расширение стандартных методов в встроенных протатипах и не приветсвуется.
// Примеры работы можно посмотреть в console.log

// -------------------- Аналог метода push --------------------
Array.prototype.myPush = function() {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}

console.log('---------- push and myPush comparing ----------')

let arr1 = [1, 2, 5];

console.log('---------- original push ----------')

console.log(arr1.push(7, 8, 'something', true, null, undefined, {name: 'John', age: 25}, function someFunc() {}));
console.log(arr1);

let arr2 = [1, 2, 5];

console.log('---------- my push ----------')

console.log(arr2.myPush(7, 8, 'something', true, null, undefined, {name: 'John', age: 25}, function someFunc() {}));
console.log(arr2);

// -------------------- Аналог метода join --------------------

Array.prototype.myJoin = function(separator = ',') {
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


console.log('---------- join and myJoin comparing ----------')

let arr3 = [1, 2, 5, 0, 7, 8, 'something', true, false, null, undefined, {name: 'John', age: 25}, function someFunc() {}];

console.log('---------- original join ----------')

console.log(arr3);
console.log(arr3.join());
console.log(arr3.join(0));
console.log(arr3.join(999));
console.log(arr3.join(' '));
console.log(arr3.join('\\/'));

console.log('---------- my join ----------')

console.log(arr3);
console.log(arr3.myJoin());
console.log(arr3.myJoin(0));
console.log(arr3.myJoin(999));
console.log(arr3.myJoin(' '));
console.log(arr3.myJoin('\\/'));

// -------------------- Аналог метода reverse --------------------

Array.prototype.myReverse = function() {
    for (let i = 0; i < this.length / 2; i++){
        let temp = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = temp;
    }
    return this;
}

console.log('---------- reverse and myReverse comparing ----------')

let arr4 = [1, null, 2, undefined, 5, 0, 7, {name: 'John', age: 25}, 8, false, function someFunc() {}, true];

console.log('---------- original reverse ----------')

console.log(arr4);
arr4.reverse();
console.log(arr4);

let arr5 = [1, null, 2, undefined, 5, 0, 7, {name: 'John', age: 25}, 8, false, function someFunc() {}, true];

console.log('---------- my reverse ----------')

console.log(arr5);
arr5.myReverse();
console.log(arr5);