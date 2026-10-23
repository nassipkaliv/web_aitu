console.log('Name: Yernur Nassipkali');
console.log('Group: SE-2517');
alert('Hello, JavaScript World!');


let university = 'Astana IT University';
let groupNumber = 2517;
let isStudent = true;

console.log('university:', university, typeof university);
console.log('groupNumber:', groupNumber, typeof groupNumber);
console.log('isStudent:', isStudent, typeof isStudent);

let a = 20;
let b = 6;

console.log('a + b =', a + b);
console.log('a - b =', a - b);
console.log('a * b =', a * b);
console.log('a / b =', a / b);
console.log('a % b =', a % b);

let firstName = 'Yernur';
let lastName = 'Nassipkali';
let fullName = firstName + ' ' + lastName;

console.log('Full name: ' + fullName);
console.log('I study at ' + university + ' in group SE-' + groupNumber + '.');


const changeText = document.getElementById('changeText');

document.getElementById('changeTextButton').addEventListener('click', function () {
    changeText.textContent = 'The text was changed with JavaScript!';
});


const styleBox = document.getElementById('styleBox');
const colors = ['#ffcdd2', '#c8e6c9', '#fff9c4', '#bbdefb'];
let colorIndex = 0;
let fontSize = 16;

document.getElementById('colorButton').addEventListener('click', function () {
    styleBox.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
});

document.getElementById('fontButton').addEventListener('click', function () {
    fontSize = fontSize + 4;
    if (fontSize > 32) {
        fontSize = 16;
    }
    styleBox.style.fontSize = fontSize + 'px';
});


const itemList = document.getElementById('itemList');

document.getElementById('addItemButton').addEventListener('click', function () {
    const newItem = document.createElement('li');
    newItem.textContent = 'Item ' + (itemList.children.length + 1);
    itemList.appendChild(newItem);
});

document.getElementById('removeItemButton').addEventListener('click', function () {
    if (itemList.lastElementChild) {
        itemList.removeChild(itemList.lastElementChild);
    }
});


const hoverBox = document.getElementById('hoverBox');

hoverBox.addEventListener('mouseover', function () {
    hoverBox.style.backgroundColor = '#ffb74d';
});

hoverBox.addEventListener('mouseout', function () {
    hoverBox.style.backgroundColor = '#90caf9';
});


const typingInput = document.getElementById('typingInput');
const typingOutput = document.getElementById('typingOutput');

typingInput.addEventListener('keyup', function () {
    typingOutput.textContent = typingInput.value;
});


const signupForm = document.getElementById('signupForm');
const formMessage = document.getElementById('formMessage');

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name === '' || email === '' || password === '') {
        formMessage.textContent = 'Please fill in all fields: Name, Email and Password.';
        formMessage.className = 'error';
        return;
    }

    formMessage.textContent = 'The form was sent. Thank you, ' + name + '!';
    formMessage.className = 'success';
    signupForm.reset();
});


const tasks = [];
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function showTasks() {
    taskList.innerHTML = '';

    tasks.forEach(function (task, index) {
        const item = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', function () {
            task.done = checkbox.checked;
            showTasks();
        });

        const text = document.createElement('span');
        text.textContent = ' ' + task.text;
        if (task.done) {
            text.className = 'done';
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            tasks.splice(index, 1);
            showTasks();
        });

        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(deleteButton);
        taskList.appendChild(item);
    });

    console.log('Tasks:', tasks);
}

document.getElementById('addTaskButton').addEventListener('click', function () {
    const text = taskInput.value.trim();
    if (text === '') {
        return;
    }

    tasks.push({ text: text, done: false });
    taskInput.value = '';
    showTasks();
});
