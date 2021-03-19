let $selector = document.querySelector('.figure_select');
let $form = document.querySelector('.options');
let $widthBlock = $form.querySelector('.width');
let $heighBlock = $form.querySelector('.height');
let $sizeBlock = $form.querySelector('.size');
let $formTitle = $form.querySelector('.title');
let size = $form.querySelector('input[name="size"]');
let width = $form.querySelector('input[name="width"]');
let height = $form.querySelector('input[name="height"]');
let color = $form.querySelector('input[name="color"]');
let text = $form.querySelector('input[name="text"]');
let container = document.querySelector('.container');

$selector.addEventListener('change', function() {
    if (this.value === 'rectangle') {
        $widthBlock.classList.remove('hide');
        $heighBlock.classList.remove('hide');
        $sizeBlock.classList.add('hide');
        $formTitle.innerHTML = 'Rectangle';
        $form.classList.remove('hide');
    } else {
        $widthBlock.classList.add('hide');
        $heighBlock.classList.add('hide');
        $sizeBlock.classList.remove('hide');
        if (this.value === 'square') {
            $formTitle.innerHTML = 'Square';
        } else {
            $formTitle.innerHTML = 'Circle';
        }
        $form.classList.remove('hide');
    }
})

$form.addEventListener('submit', function(event) {
    event.preventDefault();
    let $div = document.createElement('div');
    if ($formTitle.innerHTML === 'Square') {
        $div.style.width = size.value + 'px';
        $div.style.height = size.value + 'px';
    } else if ($formTitle.innerHTML === 'Rectangle') {
        $div.style.width = width.value + 'px';
        $div.style.height = height.value + 'px';    
    } else {
        $div.style.width = 0;
        $div.style.height = 0;   
        $div.style.border = `${size.value}px solid ${color.value}`;
        $div.style.borderRadius = '50%';
    }

    $div.classList.add('figure');
    $div.style.backgroundColor = color.value;
    $div.innerHTML = text.value;
    container.append($div);     
})

container.addEventListener('click', function(event) {
    if (event.target.classList.contains('figure')) {
        event.target.remove();
    }
})