// Снова несколько вариантов сделал.  
// Первый - то что проходили и не универсальный только для трехзначного числа.
// Второй и третий уже с массивами более универсальные для разных чисел, если будет необходимо убрать проверку на трехзначное число.

// 1. Вариант

let number;

do {                                                                                            // Цикл с постусловием с выводом модального окна.
                                                                                                
    number = prompt('Please enter three digit number','');                                      // С просьбой ввести трехзначное число.
    if (number === null) {                                                                      // Если пользователь закрыд модальное окно.
        alert('To launch the programm again, please refresh the page');                         // Сообщаем что нужно сделать для запуска программы снова.
        break;                                                                                  // Выходим из цикла.
    } else if (isNaN(number) || number > 999 || number < 100) {                                 // Если введено не трехзначное число.
            alert('I asked for three digit number, please try again');                          // Сообщаем чтобы попробывали снова.
        }                                                                                       
    } while (isNaN(number) || number > 999 || number < 100);                                    // Повторяем пока пользователь не введет валдиное число или не закроет модальное окно.

if (number !== null) {                                                                          // Выполняем программу только если пользователь не закрыл модальное окно.
                                                                                                
let digit1 = Math.floor(number / 100);                                                          // Находим первую цифру трехзначнаго числа путем деления числа на 100 и его округления
let digit2 = Math.floor((number - digit1 * 100) / 10);                                          // Находим вторую цифру трехзначнаго числа путем деления на 10 округленной разницы исходного числа и первой цифры умноженной на 100
let digit3 = Math.floor((number - digit1 * 100) % 10);                                          // Находим третью цифру трехзначного числа путем нахождения остатка от деления на 10 округленной разницы исходного числа и первой цифры умноженной на 100
let sum = digit1 + digit2 + digit3;                                                             // Сумма цифр
let mult = digit1 * digit2 * digit3;                                                            // Произведение цифр, единственно что не указано в ТЗ отбрасывать ли ноль если он является одной из цифр числа и умножать только натуральные(в арифметики) числа.

// let mult;                                                                                    // Произведение цифр с проверкой на ноль второй и третьей цифры и его отбрасыванием в произведении.
// 
// if if (digit2 === 0) {
//         mult = digit1 * digit3;
//     } else if (digit3 === 0) {
//         mult = digit1 * digit2;
//     } else {
//         mult = digit1 * digit2 * digit3;
//     }

document.write('----------------------<br>');                                                   // Выводим дефисы для соблюдения указанного формата. В ТЗ не указано необходимо ли их выводить если у нас не будет правдивых условий, по этому они выводятся всегда. В противном случае надо делать проверку на вывод, если у нас выполняется хотябы одно правдивое условие.

if (sum % 2 === 0) {                                                                            // Проверка на четность суммы цифр числа. Число четное если делится без остатка на два.
    document.write('Сумма цифр числа ' + number + ' четная.<br>');                              // Если условие верное выводим сообщение
}

if (sum % 5 === 0) {                                                                            // Проверка на кратность пяти сумы цифр числа. Число кратно другому числу, если при деление на это число не остается остатка от деления.
    document.write('Сумма цифр числа ' + number + ' кратна 5.<br>');                            
}

if (mult > 100) {
    document.write('Произведение цифр числа ' + number + ' больше 100.<br>');                   // Проверка произведения цифр числа.
}

if (digit1 === digit2 && digit2 === digit3) {                                                   // Проверка идентичности всех цифр числа.
    document.write('Все цифры числа ' + number + ' одинаковые.<br>');
}

if (digit1 === digit2 || digit2 === digit3 || digit1 === digit3) {                              // Проверка идентичности хотябы двух цифр числа. Тут логично не выводить сообщение если все цифры идентичны.
    document.write('Среди цифр числа ' + number + ' есть одинаковые.<br>');
}
                                                                                                // То есть сделать например так
// if (digit1 === digit2 || digit2 === digit3 || digit1 === digit3) {                           // Проверить что хотябы две цифры идентичны   
//     if (digit1 === digit2 && digit2 === digit3) {                                            // Тогда возможна идентичность и трех цифр
//         document.write('Все цифры числа ' + number + ' одинаковые.<br>');                    // Вывести сообщение если идентичность трех валидна
//     } else {                                                                                 
//         document.write('Среди цифр числа ' + number + ' есть одинаковые.<br>');              // Или другое сообщение об идетичности только двух
//     }
// }
                                                                                                // Тут еще можно конкретнее сделать - указывать какие именно цифры одинаковые, хотя в ТЗ этого нет. Если использовать в варианте с проверкой на идентичность трех цифр, то это будут else if, вместо последнего else.
// if (digit1 === digit2) {                                                                     
//     document.write('Среди цифр числа ' + number + ' первая и вторая цфиры одинаковые.<br>');
// }
// 
// if (digit2 === digit3) {
//     document.write('Среди цифр числа ' + number + ' вторая и тертья цфиры одинаковые.<br>');
// }
// 
// if (digit1 === digit3) {
//     document.write('Среди цифр числа ' + number + ' первая и третья цфиры одинаковые.<br>');
// }

document.write('----------------------<br>');                                                   // Аналогичные дефисы как и в начале.

}


// 2. Вариант с циклом который высчитывает арефметически цифры входящие в число и записывает их в массив. Тут уже не отклоняясь от ТЗ, хотя и тут можно все нюансы дописать как в первом варианте.
/*
let number, digits = [] , sum = 0, mult = 1;

do {

    number = prompt('Please enter three digit number','');
    if (number === null) {
        alert('To launch the programm again, please refresh the page');
        break;
    } else if (isNaN(number) || number > 999 || number < 100) {
            alert('I asked for three digit number, please try again');
        }
    } while (isNaN(number) || number > 999 || number < 100);

if (number !== null) {

for (let i = number, j; i > 0; i = j) {                                                         // Цикл дла расклада числа на соствляющиего его цифры
    j = Math.floor(i / 10);                                                                     // И записи их в массив
    let digit = i - j * 10;
    digits.unshift(digit);
}

for (let i = 0; i < digits.length; i++) {                                                       // Цикл для подсчета суммы и произведения цифр числа
    sum += digits[i];
    mult *= digits[i];
}

document.write('----------------------<br>');

if (sum % 2 === 0) {
    document.write('Сумма цифр числа ' + number + ' четная.<br>');
}

if (sum % 5 === 0) {
    document.write('Сумма цифр числа ' + number + ' кратна 5.<br>');
}

if (mult > 100) {
    document.write('Произведение цифр числа ' + number + ' больше 100.<br>');
}

if (digits[0] === digits[1] && digits[1] === digits[2]) {
    document.write('Все цифры числа ' + number + ' одинаковые.<br>');
}

if (digits[0] === digits[1] || digits[1] === digits[2] || digits[0] === digits[2]) {
    document.write('Среди цифр числа ' + number + ' есть одинаковые.<br>');
}

document.write('----------------------<br>');

}
*/

// 3. Вариант с методом массива split
/*
let number, digits = [], sum = 0, mult = 1;

do {

    number = prompt('Please enter three digit number','');
    if (number === null) {
        alert('To launch the programm again, please refresh the page');
        break;
    } else if (isNaN(number) || number > 999 || number < 100) {
            alert('I asked for three digit number, please try again');
        }
    } while (isNaN(number) || number > 999 || number < 100);

if (number !== null) {

digits = number.split('');

for (let i = 0; i < digits.length; i++) {
    sum += +digits[i];
    mult *= digits[i];
}

document.write('----------------------<br>');

if (sum % 2 === 0) {
    document.write('Сумма цифр числа ' + number + ' четная.<br>');
}

if (sum % 5 === 0) {
    document.write('Сумма цифр числа ' + number + ' кратна 5.<br>');
}

if (mult > 100) {
    document.write('Произведение цифр числа ' + number + ' больше 100.<br>');
}

if (digits[0] === digits[1] && digits[1] === digits[2]) {
    document.write('Все цифры числа ' + number + ' одинаковые.<br>');
}

if (digits[0] === digits[1] || digits[1] === digits[2] || digits[0] === digits[2]) {
    document.write('Среди цифр числа ' + number + ' есть одинаковые.<br>');
}

document.write('----------------------<br>');

}
*/