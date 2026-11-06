function showGallery(product) {
    for (let number = 1; number <= product.photos; number++) {
        $('#thumbs').append(`
            <button type="button" class="thumb ${number === 1 ? 'active' : ''}" data-number="${number}" aria-label="Photo ${number}">
                <img src="${getPhoto(product, number)}" alt="">
            </button>`);
    }

    $('#mainPhoto').attr('src', getPhoto(product, 1)).attr('alt', product.brand + ' ' + product.title);

    if (product.photos === 1) {
        $('#thumbsColumn').hide();
        $('#photoColumn').removeClass('col-md-10');
    }

    $('.thumb').click(function () {
        const number = $(this).data('number');

        $('.thumb').removeClass('active');
        $(this).addClass('active');

        $('#mainPhoto').stop(true, true).fadeOut(120, function () {
            $(this).attr('src', getPhoto(product, number)).fadeIn(200);
        });
    });
}

function showPrice(product) {
    $('#price').html(getPriceHtml(product));

    const saved = product.oldPrice - product.price;
    if (saved > 0) {
        const percent = Math.round(saved / product.oldPrice * 100);
        $('#saved').text('You save ' + formatPrice(saved) + ' (' + percent + '%)');
    }
}

$(document).ready(function () {
    const id = new URLSearchParams(location.search).get('id');
    const product = findProduct(id);

    if (!product) {
        $('#productPage').hide();
        $('#notFound').show();
        return;
    }

    document.title = product.title + ' | FADEAWAY';

    $('#crumbTitle, #title').text(product.title);
    $('#brand').text(product.brand);
    $('#stars').html(getStars(product.rating));
    $('#description, #overviewText').text(product.description);
    $('#specBrand').text(product.brand);
    $('#specModel').text(product.title);
    $('#specCategory').text(product.category);
    $('#specColor').text(product.color);

    showGallery(product);
    showPrice(product);

    let quantity = 1;

    $('#plusBtn').click(function () {
        quantity++;
        $('#quantity').text(quantity);
    });

    $('#minusBtn').click(function () {
        if (quantity > 1) {
            quantity--;
            $('#quantity').text(quantity);
        }
    });

    $('#addBtn').click(function () {
        addToCart(product.id, quantity);
    });

    const related = products.filter(function (item) {
        return item.category === product.category && item.id !== product.id;
    });

    related.slice(0, 4).forEach(function (item) {
        $('#related').append(productCard(item));
    });
});
