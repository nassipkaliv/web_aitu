const CART_KEY = 'fadeaway-cart';
const USER_KEY = 'fadeaway-user';

function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₸';
}

function findProduct(id) {
    return products.find(function (product) {
        return product.id === Number(id);
    });
}

function getPhoto(product, number) {
    return 'images/products/' + product.slug + '/' + number + '.webp';
}

function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
    }
    return '<span class="stars" aria-label="' + rating + ' out of 5 stars">' + stars + '</span>';
}

function getPriceHtml(product) {
    let html = formatPrice(product.price);
    if (product.oldPrice > product.price) {
        html += ' <del>' + formatPrice(product.oldPrice) + '</del>';
    }
    return html;
}

function productCard(product) {
    return `
        <div class="col">
            <article class="product-card">
                <div class="product-photo">
                    <a href="product.html?id=${product.id}">
                        <img src="${getPhoto(product, 1)}" alt="${product.brand} ${product.title}" loading="lazy">
                    </a>
                    <button type="button" class="add-btn add-to-cart" data-id="${product.id}" aria-label="Add ${product.title} to cart">
                        <i class="bi bi-bag-plus"></i>
                    </button>
                </div>
                ${getStars(product.rating)}
                <h3 class="product-title"><a href="product.html?id=${product.id}">${product.title}</a></h3>
                <p class="product-brand">${product.brand}</p>
                <p class="product-price">${getPriceHtml(product)}</p>
            </article>
        </div>`;
}

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(id, quantity) {
    const cart = getCart();
    const item = cart.find(function (cartItem) {
        return cartItem.id === id;
    });

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ id: id, quantity: quantity });
    }

    saveCart(cart);
    showToast(findProduct(id).title + ' added to cart');
}

function updateCartBadge() {
    let count = 0;
    getCart().forEach(function (item) {
        count += item.quantity;
    });

    $('#cartBadge').text(count).toggle(count > 0);
}

function showToast(text) {
    $('#toastText').text(text);
    bootstrap.Toast.getOrCreateInstance(document.getElementById('cartToast')).show();
}

function getUser() {
    return localStorage.getItem(USER_KEY);
}

function isEmail(value) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

function setFieldError(field, message) {
    field.addClass('is-invalid').removeClass('is-valid');
    field.siblings('.invalid-feedback').text(message);
}

function setFieldOk(field) {
    field.addClass('is-valid').removeClass('is-invalid');
}

function showSearchResults(text) {
    const results = $('#searchResults').empty();
    if (text === '') {
        return;
    }

    const found = products.filter(function (product) {
        return (product.brand + ' ' + product.title).toLowerCase().includes(text);
    });

    if (found.length === 0) {
        results.append($('<p class="search-empty">').text('Nothing found for "' + text + '"'));
        return;
    }

    found.slice(0, 5).forEach(function (product) {
        results.append(`
            <a class="search-item" href="product.html?id=${product.id}">
                <img src="${getPhoto(product, 1)}" alt="">
                <span>${product.title}<small>${product.brand}</small></span>
                <b>${formatPrice(product.price)}</b>
            </a>`);
    });
}

$(document).ready(function () {
    updateCartBadge();
    $('#year').text(new Date().getFullYear());

    const user = getUser();
    if (user) {
        $('#userGreeting').text('Hello, ' + user + '!');
        $('#userHint').text('Thanks for being with us.');
        $('#loginLink').hide();
        $('#logoutBtn').show();
    }

    $('#logoutBtn').click(function () {
        localStorage.removeItem(USER_KEY);
        location.reload();
    });

    $(document).on('click', '.add-to-cart', function () {
        addToCart($(this).data('id'), 1);
    });

    $(window).on('scroll', function () {
        const scrolled = $(window).scrollTop();
        $('#header').toggleClass('scrolled', scrolled > 50);

        if (scrolled > 500) {
            $('#backTop').fadeIn(200);
        } else {
            $('#backTop').fadeOut(200);
        }
    }).trigger('scroll');

    $('#backTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    $('#mainNav').on('show.bs.collapse', function () {
        $('#header').addClass('menu-open');
    }).on('hidden.bs.collapse', function () {
        $('#header').removeClass('menu-open');
    });

    $('#searchModal').on('shown.bs.modal', function () {
        $('#searchInput').trigger('focus');
    });

    $('#searchInput').on('input', function () {
        showSearchResults($(this).val().trim().toLowerCase());
    });

    $('#searchForm').on('submit', function (event) {
        event.preventDefault();
        const text = $('#searchInput').val().trim();
        if (text !== '') {
            location.href = 'products.html?q=' + encodeURIComponent(text);
        }
    });

    $('#subscribeForm').on('submit', function (event) {
        event.preventDefault();
        const email = $('#subscribeEmail');

        if (!isEmail(email.val().trim())) {
            setFieldError(email, 'Please enter a valid email, for example name@mail.com.');
            $('#subscribeOk').hide();
            return;
        }

        email.removeClass('is-invalid').val('');
        $('#subscribeOk').fadeIn(300);
    });
});
