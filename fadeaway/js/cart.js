function showCart() {
    const cart = getCart();

    $('#cartPage').toggle(cart.length > 0);
    $('#emptyCart').toggle(cart.length === 0);

    $('#cartItems').empty();
    cart.forEach(function (item) {
        const product = findProduct(item.id);

        $('#cartItems').append(`
            <div class="cart-item" data-id="${product.id}">
                <a class="cart-photo" href="product.html?id=${product.id}">
                    <img src="${getPhoto(product, 1)}" alt="${product.brand} ${product.title}">
                </a>
                <div class="cart-info">
                    <h3><a href="product.html?id=${product.id}">${product.title}</a></h3>
                    <p class="product-brand">${product.brand}</p>
                    <p class="product-price">${getPriceHtml(product)}</p>
                    <div class="quantity-box">
                        <button type="button" class="minus" aria-label="Less">&minus;</button>
                        <span>${item.quantity}</span>
                        <button type="button" class="plus" aria-label="More">+</button>
                    </div>
                </div>
                <button type="button" class="remove-btn" aria-label="Remove ${product.title}">
                    <i class="bi bi-trash3" aria-hidden="true"></i>
                </button>
            </div>`);
    });

    showSummary(cart);
}

function showSummary(cart) {
    let count = 0;
    let original = 0;
    let total = 0;

    cart.forEach(function (item) {
        const product = findProduct(item.id);
        count += item.quantity;
        original += product.oldPrice * item.quantity;
        total += product.price * item.quantity;
    });

    $('#summaryCount').text(count + (count === 1 ? ' item' : ' items'));
    $('#summaryOriginal').text(formatPrice(original));
    $('#summaryDiscount').text('- ' + formatPrice(original - total));
    $('#summaryTotal').text(formatPrice(total));
}

function changeQuantity(id, change) {
    const cart = getCart();
    const item = cart.find(function (cartItem) {
        return cartItem.id === id;
    });

    item.quantity += change;
    if (item.quantity < 1) {
        item.quantity = 1;
    }

    saveCart(cart);
    showCart();
}

function removeItem(id) {
    const cart = getCart().filter(function (item) {
        return item.id !== id;
    });
    saveCart(cart);
}

function checkOrderForm() {
    const results = [
        checkField($('#orderName'), $('#orderName').val().trim().length >= 2, 'Please enter your name.'),
        checkField($('#orderPhone'), $('#orderPhone').val().replace(/\D/g, '').length >= 11, 'Please enter the full number, for example +7 700 123 45 67.'),
        checkField($('#orderAddress'), $('#orderAddress').val().trim().length >= 5, 'Please enter the delivery address.')
    ];
    return !results.includes(false);
}

$(document).ready(function () {
    showCart();

    const user = getUser();
    if (user) {
        $('#checkoutBtn').text('Checkout');
        $('#orderName').val(user);
    } else {
        $('#checkoutBtn').text('Sign in to checkout');
    }

    $('#cartItems').on('click', '.plus', function () {
        changeQuantity($(this).closest('.cart-item').data('id'), 1);
    });

    $('#cartItems').on('click', '.minus', function () {
        changeQuantity($(this).closest('.cart-item').data('id'), -1);
    });

    $('#cartItems').on('click', '.remove-btn', function () {
        const row = $(this).closest('.cart-item');

        row.slideUp(250, function () {
            removeItem(row.data('id'));
            showCart();
        });
    });

    $('#checkoutBtn').click(function () {
        if (getUser()) {
            bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutModal')).show();
        } else {
            location.href = 'login.html?from=cart';
        }
    });

    $('#orderForm').on('submit', function (event) {
        event.preventDefault();

        if (!checkOrderForm()) {
            showToast('Please check the delivery details.', 'error');
            return;
        }

        const orderNumber = Date.now().toString().slice(-6);
        $('#orderNumber').text('#' + orderNumber);
        $('#orderForm').hide();
        $('#orderDone').fadeIn(300);

        saveCart([]);
        showCart();
    });
});
