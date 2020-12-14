function factory(arr) {
    let i = 0;
    return function() {
        if (i >= arr.length){
            alert('Out of Array Elements. Function reseted');
            i = 0;
            return null;
        }
        return arr[i++];
    }
}

let step = factory([2,8,9,2,4]);

console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());
console.log(step());