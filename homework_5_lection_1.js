// Снова несколько вариантов для первой задачи. Второй и третий более универсальные.

// Задача 1 Вариант 1. Работает только для единиц и нулей.

let arr = [0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1];  // Можно задать любой произвольный массив из единиц и нулей.
let sum = 0;                                    // Буферная переменная для подсчета количества подряд идущих нулей или едениц.
let arr2 = [];                                  // Буферный массив куда будем записывать количество подряд идущих нулей или едениц.
let value = !!arr[0];                           // Переключатель значения для условия в цикле. Берем значение первой переменной массива и приводим его к булевому типу.

for (let i = 0; i <= arr.length; i++) {         // Стандартно перебираем все элементы массива;
    if (arr[i] === +value) {                    // Условие, если значение элемента массива соответсвует значению переключателя приведенному к числовому типу,
        sum++;                                  // Увеличиваем буферную переменную на еденицу;
    } else {                                    // В противном случае, то есть когда цикл "запнется",
        arr2.push(sum);                         // Записываем в буферный массив значение буферной переменной,
        sum = 1;                                // Присвайваем буферной переменной еденицу(не обнуляем, так как первый раз "запнувшись" уже начинает счет элементв отличного от предидущего),
        value = !value;                         // Присваиваем переключателю обратное значение,
    }                                           // Со следующей итерации проверка в условии уже будет для другого значения, то есть если у нас был ноль, теперь станет еденица.
}

arr = arr2;                                     // Присваиваем изначальному массиву значение буферного.

console.log (arr);                              // Итого массив сжат как того требует ТЗ.

// Задача 1 Вариант 2. Еще подумал и немного доработал. Теперь можно сжимать любые одинаковые элементы примитивных типов идущих подряд.
/*
let arr = [undefined, undefined, 2,2,2,'a','a',5,5, false, false, true, true, true, 'string', 'string', 'string', 'a', null, null, null, 123n, 123n];
let sum = 0;
let arr2 =[];
let value = arr[0];

for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === value) {
        sum++;
    } else {
        arr2.push(sum);
        sum = 1;
        value = arr[i];                          // Присваиваем значение элемента на котором цикл "запнулся";
    }
}

arr = arr2;

console.log (arr);
*/

// Задача 1 Вариант 3. Еще один вариант без буфферного массива с методом splice.
/*
let arr = [undefined, undefined, 2,2,2,'a','a',5,5, false, false, true, true, true, 'string', 'string', 'string', 'a', null, null, null, 123n, 123n];
let sum = 0;
let value = arr[0];
let j = 0;                                      // Счетчик для метода splice

for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === value) {
        sum++;
    } else {
        arr.splice(j, sum, sum);                // Начиная с нулеовго элемента, удаляем идущие подряд одинаковые значения которые складывали(их сумма является их количеством), вместо них записываем значение их суммы.
        j++;                                    // Увеличиваем счетчик на еденицу, так как работать уже будем со следующим элементом.
        sum = 0;
        value = arr[j];
        i = j - 1;
    }
}

//----- Еще как вараинт можно вообще убрать переменную j, так кароче, но наверное читается немного хуже.

//for (let i = 0; i <= arr.length; i++) {
//    if (arr[i] === value) {
//        sum++;
//    } else {
//        arr.splice(i - sum, sum, sum);
//        value = arr[i - sum + 1];
//        i = i - sum;
//        sum = 0;
//    }
//}

console.log (arr);
*/