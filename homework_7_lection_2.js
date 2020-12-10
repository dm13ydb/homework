// Задача 2. Тут я сделал всего 1 вариант. Он работает и слабых мест в нем я не нашел, по этому выдумывать еще что-то не стал.
// Можно еще сделать чтобы он строки которые можно привести к числу считал, хотя в условиях сказано именно числовых.
// Тогда просто другие проверки будет if (!isNaN(firstArray[i])) и суммировать будет +firstArray[i] чтобы сразу к числу приводить. Аналогично со вторым массивом.

function getArrayWithMaxSum (firstArray, secondArray) {
    let firstSum = 0;
    let secondSum = 0;
    for (let i = 0; i < firstArray.length; i++) {
        if (typeof firstArray[i] === 'number') {
            firstSum += firstArray[i];
        }
    }
    for (let i = 0; i < secondArray.length; i++) {
        if (typeof secondArray[i] === 'number') {
            secondSum += secondArray[i];
        }
    }
    if (firstSum > secondSum) {
        return firstArray;
    }
    return secondArray;
}

let arr = [1, 2, '', null, undefined, user = {name: 'Dmitriy', age: 30}, [45, 100, 2], 99, 'some string', '1000', '0']
let arr2 = [2, 3, '', null, undefined, user = {name: 'Dmitriy', age: 30}, [45, 100, 2], 99, 'some string', '1000', '0']

console.log(getArrayWithMaxSum(arr, arr2));