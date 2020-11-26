/* Я решил написать несколько вариантов.
Так как в ТЗ требуется много уточнений.
Первый и второй используя только то что прошли на первых двух лекциях. 
Остальные варианты используя то что когда-то сам читал. Как по мне самый логичный по поведению 4 вариант.
*/

// ------------------------------------------------- 1.Последовательный вариант -------------------------------------------------

let cylinderRadius = prompt('Please enter cylinder radius','');             // Обявдяем переменную радиуса. Сразу не приводим данные к числу, так как тогда не сможем проверить на отмену

if (cylinderRadius === null) {                                              // Проверяем на отмену в модальном окне
    alert('To launch the programm again, please refresh the page')          // Сообщаем что надо сделать для перезапуска программы
}
else if (isNaN(+cylinderRadius) || +cylinderRadius === 0) {                 // Проверяем на корректное число, ноль или пустую строку и пробелы, так как при таких значениях вычесления далее не имеют смысла
    alert('Please refresh the page and enter correct value');               // Сообщаем что надо сделать для перезапуска программы и просим ввести корректное значение
} else {
    let cylinderHeight = prompt('Please enter cylinder height','')          // Раз первые 2 проверки не сработали, значит радиус введен верно, и теперь можно попрости ввести высоту

    if (cylinderHeight === null) {                                          // Далее аналогичные проверка для высоты как и для радиуса     
        alert('To launch the programm again, please refresh the page')          
    }
    else if (isNaN(+cylinderHeight) || +cylinderHeight === 0) {
        alert('Please refresh the page and enter correct value');
    } else {                                                                // Раз оба значения верные, можем выполнить расчет по формулам
        let cylinderArea = Math.PI * Math.pow(cylinderRadius,2);            
        let cylinderCapacity = cylinderArea * cylinderHeight;
        document.write(                                                     // И вывести данные в указанном формате  
            
            'Обьем цилиндра с площадью основы *' + cylinderArea + '*,<br>',
            'радиусом *' + +cylinderRadius + '* и высотой *' + +cylinderHeight + '* равен:<br>', //Тут приводим к числу радиус и высоту, так как если ввести пробел перед цифрами, в результате отобразится этот пробел
            '--------------------<br>',
            'V = ' + cylinderCapacity + '.<br>',
            '-------------------<br>',
            'end. <br>'

        );
    }
}

// ------------------------------------------------- 2.Вариант с вводом сначала всех значений -------------------------------------------------

/*
let cylinderRadius = prompt('Please enter cylinder radius','');                         // Просто просим ввести оба значения
let cylinderHeight = prompt('Please enter cylinder height','');

if (isNaN(+cylinderRadius) ||                                                           // Проверка на неудволетворяющие значения, которые не дадут вычислить результат
    isNaN(+cylinderHeight)  || 
    cylinderRadius == null || 
    cylinderHeight === null || 
    +cylinderRadius === 0 || 
    +cylinderHeight === 0) {
    alert('Please input only correct values');                                          // Просьба ввести корректные значения  
} else {
    let cylinderArea = Math.PI * Math.pow(cylinderRadius,2);                            // Если результаты верные - вычисляем аналогично первому варианту
    let cylinderCapacity = cylinderArea * cylinderHeight;
        document.write(
            
            'Обьем цилиндра с площадью основы *' + cylinderArea + '*,<br>',
            'радиусом *' + +cylinderRadius + '* и высотой *' + +cylinderHeight + '* равен:<br>',
            '--------------------<br>',
            'V = ' + cylinderCapacity + '.<br>',
            '-------------------<br>',
            'end. <br>'

        );

}
*/

// ------------------------------------------------- 3.Последовательный вариант с алертами и расчетом в функциях -------------------------------------------------

/*
function checkValue(_userValue) {                                               // Выносим проверку введенного значения из первого варианта в функцию, чтобы не писать одинаковый код
    if (_userValue === null) {                        
        alert('To launch the programm again, please refresh the page');
    }
    else if (isNaN(+_userValue) || +_userValue === 0) {
        alert('Please refresh the page and enter correct value');
    } else {
        return true;                                                            // Тут вернем истину чтобы можно было использовать в условии программы
    }
}

function countCylinderCapacity(_userRadius,_userHeight) {                       // Выносим расчет в отдельную функцию, это не обязательно но мне так показалось удобнее

let _cylinderArea = Math.PI * Math.pow(_userRadius,2);
let _cylinderCapacity = _cylinderArea * _userHeight;
document.write(
    
    'Обьем цилиндра с площадью основы *' + _cylinderArea + '*,<br>',
    'радиусом *' + _userRadius + '* и высотой *' + _userHeight + '* равен:<br>',
    '--------------------<br>',
    'V = ' + _cylinderCapacity + '.<br>',
    '-------------------<br>',
    'end. <br>'
);
}

let cylinderRadius = prompt('Please enter cylinder radius','');                 
    if (checkValue(cylinderRadius) === true) {                                  // Только если функция вернет истину, то есть пользователь введет верное значение радиуса, есть смысл запрашивать значение высоты
        let cylinderHeight = prompt('Please enter cylinder height','');
        if (checkValue(cylinderHeight) === true) {                              // Если и значение высоты верное, то можно вычислять
            countCylinderCapacity(+cylinderRadius,+cylinderHeight);
        }
    }
*/

// ------------------------------------------------- 4.Последовательный вариант с циклом -------------------------------------------------
/*
function checkValue(_userValue) {                                                // Функция проверки введеного значения на корректность
    if (_userValue === null) {                                              
        alert('To launch the programm again, please refresh the page');
        return true;
    } else if (isNaN(+_userValue) || +_userValue === 0) {   
        alert('Please enter correct value');              
        return false;               
    }
}

function countCylinderCapacity(_userRadius,_userHeight) {                       // Функция расчета

    let _cylinderArea = Math.PI * Math.pow(_userRadius,2);
    let _cylinderCapacity = _cylinderArea * _userHeight;
    document.write(
        
        'Обьем цилиндра с площадью основы *' + _cylinderArea + '*,<br>',
        'радиусом *' + _userRadius + '* и высотой *' + _userHeight + '* равен:<br>',
        '--------------------<br>',
        'V = ' + _cylinderCapacity + '.<br>',
        '-------------------<br>',
        'end. <br>'
    );
    }

do {                                                                                      // Цикл с постусловием для значения радиуса
    let cylinderRadius = prompt('Please enter cylinder radius','');                       // Просим ввести значение радиуса
    var radiusStatus = checkValue(cylinderRadius);                                        // Объявляем переменную статуса проверки, которая будет возвращать функция проверки значения. Объявлем через var так как let ограничивается областью видимости тела цикла, а нам значение этой переменной пригодится в условии.
        if (radiusStatus === undefined) {                                                 // Функция вернет undefined если в услвоиях функции не выолнятся оба указаных условия, что будет значит что значение введено верно и можно продолжить работу. В противном случае мы перейдем к условию цикла.
            do {                                                                          // Цикл с постусловием для значения высоты
                let cylinderHeight = prompt('Please enter cylinder height','');           // Просим ввести значение высоты
                var heightStatus = checkValue(cylinderHeight);                            // Статус проверки высоты, аналогичный статусу проверки радиуса, присваивается той же функцией проверки значения
                if (heightStatus === undefined) {                                         // Функция вернет undefined если значение высоты будет введено верно, а раз оба значения получены, можно вычислить результат
                    countCylinderCapacity(+cylinderRadius,+cylinderHeight);               // Вычисление результата
                }
            } while (heightStatus === false);                                             // Если функция вернет false, что равносильно тому что пользователь ввел не удовлетворяющее значение высоты, то мы попросим пользователя ввести корректное значение. Цикл будет выполнятся пока пользователь или не введет корректное значение, или не закроет модальное окно.
        }
} while (radiusStatus === false);                                                         // Аналогично вышеописанной высоте, только для радиуса.
*/

// ------------------------------------------------- 5.Вариант с вводом сначала всех значений с циклом -------------------------------------------------
/*
function checkValue(_userValue) {                                                         // Функция проверки введенного значения
    if (_userValue === null) {                                              
        return true;
    } else if (isNaN(+_userValue) || +_userValue === 0) {               
        return false;               
    }
}

function countCylinderCapacity(_userRadius,_userHeight) {                                 // Функция вычисления результата

    let _cylinderArea = Math.PI * Math.pow(_userRadius,2);
    let _cylinderCapacity = _cylinderArea * _userHeight;
    document.write(
        
        'Обьем цилиндра с площадью основы *' + _cylinderArea + '*,<br>',
        'радиусом *' + _userRadius + '* и высотой *' + _userHeight + '* равен:<br>',
        '--------------------<br>',
        'V = ' + _cylinderCapacity + '.<br>',
        '-------------------<br>',
        'end. <br>'
    );
    }

do {                                                                                       // Цикл с постусловием для обоих значений
    let cylinderRadius = prompt('Please enter cylinder radius','');                        // Просим ввести радиус
    let cylinderHeight = prompt('Please enter cylinder height','');                        // Просим ввести высоту
    var radiusStatus = checkValue(cylinderRadius);                                         // Проверяем радиус
    var heightStatus = checkValue(cylinderHeight);                                         // Проверяем высоту
    if  (                                                                                  // Улсовие при котором программа завершится но перед этим мы сообщим что сделать чтобы снова запустить программу
        (radiusStatus === true && heightStatus === true) ||                                // Если пользователь закроет 2 модальных окна предпологаем что он хочет выйти
        (radiusStatus === undefined && heightStatus === true) ||                           // Аналогично предпологаем что если пользователь закрывает второе модальное окно он хочет выйти, то есть когда ввел сначала верное первое значение и потом закрыл окно;
        (radiusStatus === false && heightStatus === true)                                  // или первое неверное, и закрыл окно
        ) {
            alert('To launch the programm again, please refresh the page');                 // Само сообщение что надо сделать для запуска программы
            } else if (radiusStatus === undefined && heightStatus === undefined) {          // Следующее условие, если оба значения введены верно и соотвествующиее статусы нам вернула функция, то можно производить расчет
                countCylinderCapacity(+cylinderRadius,+cylinderHeight);                     // Вызываем функцию расчета
            } else {                                                                        // Если первый 2 условия не выполняются, значит одно из значений введено неверно и надо попросить пользователя ввести верные значения
                alert('Please enter correct values');                                       // Сообщение с простбой ввести верные значения
    }
} while (                                                                                   // Условия цикла которая запускает модальные окна с просьбой ввести радиус и высоту снова:
        (radiusStatus === false && heightStatus === false) ||                               // Если оба значения введены неверно;
        (radiusStatus === true && heightStatus === undefined) ||                            // Если пользователь закрыл первое модальное окно, но при это ввел верное второе значение;
        (radiusStatus === true && heightStatus === false) ||                                // Если пользователь закрыл первое модальное окно, но ввел неверное второе значение(возможно что такое условие лучше подходит для того чтобы закрыть программу, но это не точно:) )
        (radiusStatus === undefined && heightStatus === false) ||                           // Если пользователь ввел верное перове и неверное второе значения;
        (radiusStatus === false && heightStatus === undefined)                              // Если пользователь ввел неверное первое и верное второе значения.
        );
*/