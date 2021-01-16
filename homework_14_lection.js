let $inputSlider = document.createElement('input');
let $inputNumber = document.createElement('input');
let $meter = document.createElement('div');

$inputSlider.setAttribute('type', 'range');
$inputSlider.setAttribute('min', '0');
$inputSlider.setAttribute('max', '100');
$inputSlider.setAttribute('value', '0');

$inputNumber.setAttribute('type', 'number');
$inputNumber.setAttribute('min', '0');
$inputNumber.setAttribute('max', '100');
$inputNumber.setAttribute('value', '0');

$meter.classList.add('meter');

document.body.addEventListener('input', function(e) {
    if (e.target.getAttribute('type') === 'range') {
        $inputNumber.value = $inputSlider.value;
    }

    $inputNumber.value = $inputNumber.value.replace(/[e\+\-]/i, '');

    if ($inputNumber.value > 100) {
        $inputNumber.value = 100;
    }

    $inputSlider.value = $inputNumber.value;

    if ($inputNumber.value === '') {
        $inputSlider.value = 0;
    }

    if ($inputSlider.value <= 50) {
        $meter.style.backgroundImage = `linear-gradient(to top, green ${$inputSlider.value}px, white ${$inputSlider.value}px)`
    } else if ($inputSlider.value <= 75) {
        $meter.style.backgroundImage = `linear-gradient(to top, green 50px, yellow 50px, yellow ${$inputSlider.value}px, white ${$inputSlider.value}px)`
    } else {
        $meter.style.backgroundImage = `linear-gradient(to top, green 50px, yellow 50px, yellow 75px, red 75px, red ${$inputSlider.value}px, white ${$inputSlider.value}px)`
    }

})

document.body.append($inputSlider);
document.body.append($inputNumber);
document.body.append($meter);