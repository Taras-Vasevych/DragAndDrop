const words = [
    "Один",
    "Два",
    "Три",
    "Четыре",
    "Пять",
    "Шесть",
    "Семь",
    "Восемь",
    "Девять",
    "Десять"    
];

const unsorted = [...words];
for(let i = unsorted.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i+1));
    [unsorted[i], unsorted[j]] = 
        [unsorted[j], unsorted[i]];
}

const listItems = [];
function createList() {
    unsorted.forEach((value, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('draggable', 'true');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `<p>${value}</p>`;
        listItems.push(listItem);
        draggableList.appendChild(listItem);
    })    
}
createList();





const buttonDefaultText = "Проверить порядок";
const buttonPressedText = "Продолжить сортировку";
const buttonText = document.querySelector('#checkBtn p');
buttonText.innerText = buttonDefaultText;

function checkOrder() {
    for(let i = 0; i < listItems.length; i++) {
        if(listItems[i].innerText === words[i]) {
            listItems[i].classList.add('correct');
        }
        else {
            listItems[i].classList.add('incorrect');
        }
    }
}


checkBtn.addEventListener("mousedown", checkBtnFunction);

function checkBtnFunction() {
    checkBtn.removeEventListener("mousedown", checkBtnFunction);
    document.addEventListener("mouseup", function lisener() {
        console.log('mouse up');
        document.removeEventListener('mouseup', lisener);
        document.addEventListener('mousedown', toDefault);
        document.body.style.backgroundColor = "pink";
    });
    checkOrder();
    console.log('Check function!!!');
    checkBtn.classList.add('pressed');
    buttonText.innerText = buttonPressedText;    
}

function toDefault(event) {
    console.log('PreDEfault');
    document.removeEventListener('mousedown', toDefault);
    function toDefaultInner() {
        console.log('toDefault');
        checkBtn.classList.remove('pressed');
        buttonText.innerText = buttonDefaultText;
        for (const listItem of listItems) {
            listItem.classList.remove('correct', 'incorrect');
        }
    }
    if (event.target.closest('button')) {
        document.addEventListener('mouseup', function lisener(){
            removeEventListener('mouseup', lisener);
            setTimeout(toDefaultInner, 0);            
        });
    }
    else setTimeout(toDefaultInner, 0);
}



// function toDefault(event) {
//     console.log('button unpressed');
//     document.removeEventListener('mousedown', onDocumentClick);
//     checkBtn.removeEventListener('click', toDefault);
//     checkBtn.classList.remove('pressed');
//     buttonText.innerText = buttonDefaultText;
//     for (const listItem of listItems) {
//         listItem.classList.remove('correct', 'incorrect');
//     }
//     setTimeout(() => {checkBtn.addEventListener("mousedown", checkBtnFunction)}, 0);
// }

// function checkBtnFunction() {
//     console.log('button pressed');
//     checkBtn.removeEventListener("mousedown", checkBtnFunction);
//     checkBtn.classList.add('pressed');
//     checkOrder();
//     buttonText.innerText = buttonPressedText;
//     document.addEventListener('mouseup', checkBtnFunctionHelper);
// }

// function checkBtnFunctionHelper() {
//     document.removeEventListener('mouseup', checkBtnFunctionHelper);
//     setTimeout( () => {checkBtn.addEventListener('click', toDefault)}, 0);
//     setTimeout( () => {document.addEventListener('mousedown', onDocumentClick)}, 0);

// }

// function onDocumentClick(event) {
//     if (event.target.closest('button')) {
//         return;
//     }
//     toDefault();
// }


// function toDefault() {}


function dragEnter() {
    this.classList.add('over')
    console.log('enter')
}

function dragLeave() {
    this.classList.remove('over')
    console.log('leave')
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    draggables.forEach(item => {
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}






