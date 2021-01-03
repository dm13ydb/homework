// Создаем класс SuperArray который расширяет стандартные массивы и экземпляром которого является двумерный масиив;
// Заполненный согласно ТЗ.

class SuperArray extends Array {
    constructor(n, m, options) {
        if(!n || !m || !options) {
            alert(`Please enter only the following format - (rows number, columns number, {min: minimum value, max: maximum value})`);
        }
        super(n);
        for (let i = 0; i < this.length; i++) {
            this[i] = new Array(m);
            for (let j = 0; j < this[i].length; j++) {
                this[i][j] = Math.floor(Math.random()*(options.max-options.min+1)+options.min);
            }
        }
    }

    // В тз про разделитель между элементами массива и переносы строк ничего не сказано, только про разделитель под массивом;
    // По этому я решил вывести элементы через пробел, а каждую строку массива в новой строке документа.

    render(separator) {
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this[i].length; j++) {
                document.write(this[i][j] + ` `);
            }
            document.write(`</br>`);
        }
        if (separator) {
            document.write(separator + `</br>`);
        }
        return this;
    }

    // Вполне очевидный метод с валидацей аргументов,

    clear(direction, k) {
        if (direction !== 'row'
        && direction !== 'column'
        ) {
            alert(`Please enter only row or column as the first option`);
            return this;
        }

        if (typeof k !== `number`
        || isNaN(k)
        || k > this.length
        || k > this[0].length
        || k < 1
        ) {
            alert(`Please enter only the number of existing array row or column as the second option`);
            return this;
        }

        if (direction === `row`) {
            for (let i = 0; i < this[k - 1].length; i++) {
                this[k - 1][i] = 0;
            }
        }

        if (direction === `column`) {
            for (let i = 0; i < this.length; i++) {
                this[i][k - 1] = 0;
            }
        }

        return this;
    }

    // Тут уже у меня возникает больше вопросов, так как вариантов реализации может быть много и это может влияет на реализацию других методов;
    // По этому я решил сделать в более игровой манере. То есть маркер будет у нас единственным, и таким, как указан в ТЗ;
    // Если мы уже ставили маркер и он есть в нашем экзепляре массива, то другой такойже поставить будет нельзя;
    // Поставить маркер можно только на координаты которые существуют;
    // Если мы создаем маркер, то в нашем экземпляре класса SuperArray мы создаем два свойства;
    // markerPosition это текущая позиция маркер, она нам нужна будет для метода goTo;
    // markerPositionValue это значение вместо которого мы поставили маркер(он как бы стоит на клетке с этим значением), его необходимо хранить.

    setMarker(position) {
        let marker = `&`

        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this[i].length; j++) {
                if (this[i][j] === marker) {
                    alert(`Marker has been already set. Please use goTo method to move it`);
                    return this;
                }
            }
        }

        if ( !position
        || typeof position.x !== `number`
        || isNaN(position.x)
        || position.x > this[position.y - 1].length
        || position.x < 1
        || typeof position.y !== `number`
        || isNaN(position.y)
        || position.y > this.length
        || position.y < 1
        ) {
            alert(`Please enter only the existing coordinate of array in format {x: column number, y: row number}`);
            return this;
        }

        this.markerPosition = {
            x: position.x,
            y: position.y,
        };
        this.markerPositionValue = this[position.y - 1][position.x - 1];
        this[position.y - 1][position.x - 1] = marker;
        return this;
    }

    // Тут я делаю проверку существует ли маркер. Если у него есть координаты, значит он существует;
    // Проверку делаю потому что если с помощью goTo можно было бы как и методом setMarker установить марке;
    // То реалищация setMarker не имеет смысла и ее можно перенести в goTo и немного поправить;
    // Тогда будет всего один метод и для установки и для перемещения;
    // И далее запускаем снова setMarker по тому что по сути нам надо дальше сделать тоже самое, как и при его установке;

    goTo(position) {
        if (!this.markerPosition) {
            alert(`Please set the marker first with setMarker method`);
            return this;
        }
        this[this.markerPosition.y - 1][this.markerPosition.x - 1] = this.markerPositionValue;
        this.setMarker(position);
        return this;
    }

    // Тут есть неочевидный момент, который не оговорен в тз пр этому реализовал 2 варианта;
    // Но в обоих вариантах мы будем использовать метод goTo;

    // Мы представляем что у нас есть "стенки", то есть если маркер находится например в первом столбце, то при значении left;
    // Левее уже двигаться некуда. По этому ничего не происходит маркер остается на том же месте;

    shift(direction) {
        if (direction !== `left`
        && direction !== `right`
        && direction !== `top`
        && direction !== `bottom`
        ) {
            alert(`Please enter only left, right, top or bottom`);
            return this;
        }

        if (!this.markerPosition) {
            alert(`Please set the marker first with setMarker method`);
            return this;
        }

        if (direction === `left` && this.markerPosition.x > 1) {
            this.goTo({x: this.markerPosition.x - 1, y: this.markerPosition.y});
            return this;
        }

        if (direction === `right` && this.markerPosition.x < this[this.markerPosition.y].length) {
            this.goTo({x: this.markerPosition.x + 1, y: this.markerPosition.y});
            return this;
        }

        if (direction === `top` && this.markerPosition.y > 1) {
            this.goTo({x: this.markerPosition.x, y: this.markerPosition.y - 1});
            return this;
        }

        if (direction === `bottom` && this.markerPosition.y < this.length) {
            this.goTo({x: this.markerPosition.x, y: this.markerPosition.y + 1});
            return this;
        }

        return this;
    }

    // Второй вариант я назвал shiftCopperfield так как мы представляем что при том же условии;
    // Находясь в первом столбце, то при значении left мы появимся с другой стороны, то есть в последнем столбце.

    shiftCopperfield(direction) {
        if (direction !== 'left'
        && direction !== 'right'
        && direction !== 'top'
        && direction !== 'bottom'
        ) {
            alert(`Please enter only left, right, top or bottom`);
            return this;
        }

        if (!this.markerPosition) {
            alert(`Please set the marker first with setMarker method`);
            return this;
        }

        if (direction === `left`) { 
            if (this.markerPosition.x === 1) {
                this.goTo({x: this[this.markerPosition.y - 1].length, y: this.markerPosition.y});
                return this;
            }
            this.goTo({x: this.markerPosition.x - 1, y: this.markerPosition.y});
            return this;
        }

        if (direction === `right`) {
            if (this.markerPosition.x === this[this.markerPosition.y].length) {
                this.goTo({x: 1, y: this.markerPosition.y});
                return this;
            }
            this.goTo({x: this.markerPosition.x + 1, y: this.markerPosition.y});
            return this;
        }

        if (direction === `top`) {
            if (this.markerPosition.y === 1) {
                this.goTo({x: this.markerPosition.x, y: this.length});
                return this;
            }
            this.goTo({x: this.markerPosition.x, y: this.markerPosition.y - 1});
            return this;
        }

        if (direction === `bottom`) {
            if (this.markerPosition.y === this.length) {
                this.goTo({x: this.markerPosition.x, y: 1});
                return this;
            }
            this.goTo({x: this.markerPosition.x, y: this.markerPosition.y + 1});
            return this;
        }

        return this;
    }
}

let superArray = new SuperArray(13, 12, {min: -10, max: 55});

superArray.render(`--------------------------------------------------`);
superArray.clear(`row`, 3);
superArray.render(`--------------------------------------------------`);
superArray.clear(`column`, 1);
superArray.render(`--------------------------------------------------`);
superArray.setMarker({x: 12, y: 13});
superArray.render(`--------------------------------------------------`);
superArray.goTo({x: 1, y: 13});
superArray.render(`--------------------------------------------------`);
superArray.shift(`bottom`);
superArray.render(`--------------------------------------------------`);
superArray.shift(`left`);
superArray.render(`--------------------------------------------------`);
superArray.shift(`top`);
superArray.render(`--------------------------------------------------`);
superArray.shift(`right`);
superArray.render(`--------------------------------------------------`);
superArray.goTo({x: 12, y: 1});
superArray.render(`--------------------------------------------------`);
superArray.shift(`right`);
superArray.render(`--------------------------------------------------`);
superArray.shift(`top`);
superArray.render(`--------------------------------------------------`);
superArray.shiftCopperfield(`right`);
superArray.render(`--------------------------------------------------`);
superArray.shiftCopperfield(`top`);
superArray.render(`--------------------------------------------------`);
superArray.shiftCopperfield(`left`);
superArray.render(`--------------------------------------------------`);
superArray.shiftCopperfield(`bottom`);
superArray.render(`--------------------------------------------------`);
superArray.shift(`bottom`);
superArray.render(`--------------------------------------------------`);
superArray.shift(`left`);
superArray.render(`--------------------------------------------------`);