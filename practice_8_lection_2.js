function factory(arr) {
    let i = 0;
    return function(callback) {
        if (callback) {
            let j = arr[i++];
            return callback(j);
        } else {
            return arr[i++];
        }
        
    }
}

let sqr = function(arg) {
    return arg ** 2;
}

let cube = function(arg) {
    return arg ** 3;
}

let step = factory([2,8,9,2,4]);

console.log(step(sqr));
console.log(step(sqr));
console.log(step(sqr));
console.log(step(sqr));
console.log(step(sqr));