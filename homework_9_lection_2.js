// Надеюсь верно понял задание. Тут он не только текст проверяет а любое значение. Если нужно искать только текст,
// Например если пользователь ввел число, а нам все же надо искать именно строку а не число то в сравнении надо 
// someString поменять на String(someString);

function inArray(someString, someArray) {
    for (i in someArray) {
        if (someString === someArray[i]){
            return true;
        }
    }
    return false;
}

console.log(inArray('hello', ['svnj', 'hello', 'cvpoq']));
console.log(inArray(23, [1, 2, 8, 23, 44]));
console.log(inArray('hello', ['svnj', 8, 'hello', 23, 1, 'cvpoq' , 44]));
console.log(inArray(23, ['svnj', 8, 'hello', 23, 1, 'cvpoq' , 44]));
console.log(inArray('goodbye', ['svnj', 'hello', 'cvpoq']));
console.log(inArray('23', [1, 2, 8, 23, 44]));
console.log(inArray('23', ['svnj', 8, 'hello', 23, 1, 'cvpoq' , 44]));
console.log(inArray('23', ['svnj', 8, 'hello', '23', 1, 'cvpoq' , 44]));
console.log(inArray(false, ['svnj', 8, 'hello', '23', 1, 'cvpoq' , 44, undefined, null, 0, '0', '']));
console.log(inArray(true, ['svnj', 8, 'hello', '23', 1, 'cvpoq' , 44, undefined, null, 0, '0', '']));
console.log(inArray(false, ['svnj', 8, 'hello', false, '23', 1, 'cvpoq' , 44, undefined, null, 0, '0', '']));
console.log(inArray(true, ['svnj', true, 8, 'hello', '23', 1, 'cvpoq' , 44, undefined, null, 0, '0', '']));
console.log(inArray(undefined, ['svnj', 8, 'hello', false, '23', 1, 'cvpoq' , 44, null, 0, '0', '']));
console.log(inArray(null, ['svnj', true, 8, 'hello', '23', 1, 'cvpoq' , 44, undefined, 0, '0', '']));
console.log(inArray(undefined, ['svnj', 8, 'hello', false, '23', 1, undefined, 'cvpoq' , 44, null, 0, '0', '']));
console.log(inArray(null, ['svnj', true, 8, 'hello', '23', null, 1, 'cvpoq' , 44, undefined, 0, '0', '']));