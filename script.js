function runAlerts() {
    alert('Welcome to JavaScript Practice!');

    let userName = prompt('Please enter your name:');
    if (userName === null || userName.trim() === '') {
        userName = 'Guest';
    }
    alert('Hello, ' + userName + '!');

    document.getElementById('alertOutput').textContent = 'Hello, ' + userName + '!';
}

runAlerts();
document.getElementById('alertBtn').addEventListener('click', runAlerts);


let stringValue = 'Hello, World!';
let numberValue = 42;
let booleanValue = true;
let nullValue = null;
let undefinedValue;

console.log('--- Data Types ---');
console.log('String:', stringValue, typeof stringValue);
console.log('Number:', numberValue, typeof numberValue);
console.log('Boolean:', booleanValue, typeof booleanValue);
console.log('Null:', nullValue, typeof nullValue);
console.log('Undefined:', undefinedValue, typeof undefinedValue);

document.getElementById('typesOutput').textContent =
    'String: ' + stringValue + '\n' +
    'Number: ' + numberValue + '\n' +
    'Boolean: ' + booleanValue + '\n' +
    'Null: ' + nullValue + '\n' +
    'Undefined: ' + undefinedValue;


let x = 15;
let y = 27;

document.getElementById('sumBtn').addEventListener('click', function() {
    let sum = x + y;
    alert('The sum of x and y is: ' + sum);
    document.getElementById('sumOutput').textContent = 'x = ' + x + ', y = ' + y + ', x + y = ' + sum;
});


let firstName = 'Yernur';
let lastName = 'Nassipkali';

document.getElementById('nameBtn').addEventListener('click', function() {
    let fullName = firstName + ' ' + lastName;
    alert('Full Name: ' + fullName);
    document.getElementById('nameOutput').textContent = 'Full Name: ' + fullName;
});


document.getElementById('calculateButton').addEventListener('click', function() {
    let num1 = parseFloat(document.getElementById('number1').value);
    let num2 = parseFloat(document.getElementById('number2').value);

    if (isNaN(num1) || isNaN(num2)) {
        alert('Please enter two numbers.');
        return;
    }

    let result =
        'Sum: ' + num1 + ' + ' + num2 + ' = ' + (num1 + num2) + '\n' +
        'Difference: ' + num1 + ' - ' + num2 + ' = ' + (num1 - num2) + '\n' +
        'Multiplication: ' + num1 + ' * ' + num2 + ' = ' + (num1 * num2) + '\n' +
        'Division: ' + num1 + ' / ' + num2 + ' = ' + (num2 !== 0 ? num1 / num2 : 'cannot divide by zero') + '\n' +
        'Remainder: ' + num1 + ' % ' + num2 + ' = ' + (num2 !== 0 ? num1 % num2 : 'cannot divide by zero');

    alert(result);
    console.log('--- Arithmetic ---\n' + result);
    document.getElementById('calcOutput').textContent = result;
});


let counter = 0;
console.log('--- Counter ---');
console.log('Before increment:', counter);
counter++;
console.log('After increment:', counter);
counter--;
console.log('After decrement:', counter);

document.getElementById('counterOutput').textContent =
    'Before increment: 0\nAfter increment: 1\nAfter decrement: ' + counter;


function greetUser(name) {
    return 'Hello, ' + name + '! Nice to meet you.';
}

document.getElementById('greetBtn').addEventListener('click', function() {
    let name = document.getElementById('greetName').value.trim() || 'Guest';
    let greeting = greetUser(name);
    alert(greeting);
    document.getElementById('greetOutput').textContent = greeting;
});
