function factory(arr) {
    let i = 0;
    return function(callback) {
        if (i >= arr.length){
            alert('Out of Array Elements. Function reseted');
            i = 0;
            return null;
        }
        if (callback) {
            return callback(arr[i++]);
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
console.log(step(cube));
console.log(step(cube));
console.log(step(cube));
console.log(step(cube));
console.log(step(cube));
console.log(step(cube));