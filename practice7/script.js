const themeButton = document.querySelector('#themeButton');
const nameInput = document.getElementById('nameInput');
const greeting = document.querySelector('.greeting');
const moreText = document.getElementById('moreText');
const readMoreButton = document.getElementById('readMoreButton');
const timeText = document.getElementById('timeText');
const lastKey = document.getElementById('lastKey');
const bookForm = document.getElementById('bookForm');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookCategory = document.getElementById('bookCategory');
const bookError = document.getElementById('bookError');
const filterSelect = document.getElementById('filterSelect');
const bookList = document.getElementById('bookList');
const bookStats = document.getElementById('bookStats');


let audioContext;

function playSound(frequency) {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    oscillator.frequency.value = frequency;
    volume.gain.value = 0.1;
    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
}


function toggleTheme() {
    document.body.classList.toggle('night');
    const isNight = document.body.classList.contains('night');
    themeButton.textContent = isNight ? 'Day mode' : 'Night mode';
    playSound(isNight ? 300 : 600);
}

themeButton.addEventListener('click', toggleTheme);


function getGreeting() {
    const hour = new Date().getHours();

    switch (Math.floor(hour / 6)) {
        case 0:
            return 'Good night';
        case 1:
            return 'Good morning';
        case 2:
            return 'Good afternoon';
        default:
            return 'Good evening';
    }
}

function showGreeting() {
    const name = nameInput.value.trim();
    greeting.textContent = getGreeting() + ', ' + (name || 'guest') + '!';
}

nameInput.addEventListener('input', showGreeting);


readMoreButton.addEventListener('click', function () {
    moreText.classList.toggle('open');
    readMoreButton.textContent = moreText.classList.contains('open') ? 'Read Less' : 'Read More';
    playSound(500);
});


function showTime() {
    timeText.textContent = 'Now: ' + new Date().toLocaleTimeString();
    playSound(700);
}

document.getElementById('timeButton').addEventListener('click', showTime);


document.addEventListener('keydown', function (event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        return;
    }

    lastKey.textContent = event.key;

    switch (event.key.toLowerCase()) {
        case 'n':
            toggleTheme();
            break;
        case 't':
            showTime();
            break;
    }
});


const library = {
    books: [
        { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', category: 'Fiction' },
        { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science' },
        { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History' }
    ],

    addBook(title, author, category) {
        this.books.push({ title: title, author: author, category: category });
    },

    removeBook(bookToRemove) {
        this.books = this.books.filter(function (book) {
            return book !== bookToRemove;
        });
    },

    getBooks(category) {
        if (category === 'All') {
            return this.books;
        }
        return this.books.filter(function (book) {
            return book.category === category;
        });
    }
};

function createBookItem(book) {
    const item = document.createElement('li');
    item.textContent = book.title + ' — ' + book.author + ' ';

    const category = document.createElement('span');
    category.className = 'category';
    category.textContent = '(' + book.category + ')';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        library.removeBook(book);
        playSound(200);
        showBooks();
    });

    item.appendChild(category);
    item.appendChild(deleteButton);
    return item;
}

function showBooks() {
    const books = library.getBooks(filterSelect.value);

    bookList.innerHTML = '';
    books.map(createBookItem).forEach(function (item) {
        bookList.appendChild(item);
    });

    const counts = { Fiction: 0, Science: 0, History: 0 };
    for (const book of library.books) {
        counts[book.category]++;
    }

    bookStats.textContent = 'Showing ' + books.length + ' of ' + library.books.length + ' books. ' +
        'Fiction: ' + counts.Fiction + ', Science: ' + counts.Science + ', History: ' + counts.History + '.';
}

bookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();

    if (title === '' || author === '') {
        bookError.textContent = 'Please enter the title and the author.';
        playSound(150);
        return;
    }

    bookError.textContent = '';
    library.addBook(title, author, bookCategory.value);
    bookForm.reset();
    playSound(800);
    showBooks();
});

filterSelect.addEventListener('change', showBooks);


showGreeting();
showBooks();
