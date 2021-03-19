let slider = document.querySelector('.slider');
let sliderBox = slider.querySelector('.slider__items');
let imgCount = sliderBox.querySelectorAll('.slider__item').length;
let buttonNext = slider.querySelector('.slider__buttonNext');
let buttonPrevious = slider.querySelector('.slider__buttonPrevious');
let counter = imgCount;
let sliderBoxPosition = 0;

if (imgCount > 1) {
    buttonNext.classList.add('show');
}

slider.addEventListener('click', function(event) {
    if (event.target === buttonNext) {
        counter--;
        sliderBoxPosition -= 720;
        sliderBox.style.left = `${sliderBoxPosition}px`;
    }

    if (event.target === buttonPrevious) {
        counter++;
        sliderBoxPosition += 720;
        sliderBox.style.left = `${sliderBoxPosition}px`;
    }

    if (counter !== imgCount) {
        buttonPrevious.classList.add('show');
    } else {
        buttonPrevious.classList.remove('show');
    }

    if (counter === 1) {
        buttonNext.classList.remove('show');
    } else {
        buttonNext.classList.add('show');
    }

}) 