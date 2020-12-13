// getMaxArgs записывает в массив обработанные(функцией getMaxArrValue) значения переданных аргументов и возвращает их в виде строки через запятую

function getMaxArgs() {
    let MaxArg = [];
    for (let i = 0; i < arguments.length; i++) {
        MaxArg[i] = getMaxArrValue(arguments[i]);
    }
    return MaxArg.join(',');
}

// getMaxArgs возвращает максимальное значение из любого массива не важно на сколько многомерного

function getMaxArrValue(arr) {
    let MaxValue = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length) {
            let temp = getMaxArrValue(arr[i]);
            if (temp > MaxValue) {
                MaxValue = temp;
            };
        } 
        if (arr[i] > MaxValue) {
            MaxValue = arr[i];
        }
    }
    return MaxValue;    
}


let arr = [
    [
        [99,3,4],
        [103,8,7],
    ],
    [1,5,100],
    [2,7,8],
]

let arr1 = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
]

let arr2 = [
    [10,11,12],
    [13,14,15],
    [16,17,18],
]

let arr3 = [
    [105,2,3],
    [4,999,6],
    [7,8,789],
]

let arr4 = [
    [8,9,1004],
]

let arr5 = [
    [
        [7,8,923],
        [256,345,234],
        [111,234,232],
    ],
    [567,121,43],
    [
        [
            [
                [567,234,2567],
                [
                    [1234,2344,2344],
                    [567,123,4567],
                ],
                [213,77,444],
            ],
            [123,3432,123],
            [123,435,123],
            [1231,5,2,6],
        ],
        [2,5,7],
    ],
    [234,2423,998]
];

console.log(getMaxArgs(arr5, arr, arr1, arr2, arr3, arr4));