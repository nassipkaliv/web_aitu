const params = new URLSearchParams(location.search);
let searchText = (params.get('q') || '').trim();

const prices = products.map(function (product) {
    return product.price;
});
const minPrice = Math.min.apply(null, prices);
const maxPrice = Math.max.apply(null, prices);

function getCheckedValues(name) {
    return $('input[name="' + name + '"]:checked').map(function () {
        return $(this).val();
    }).get();
}

function getFilteredProducts() {
    const brands = getCheckedValues('brand');
    const categories = getCheckedValues('category');
    const priceLimit = Number($('#priceRange').val());
    const text = searchText.toLowerCase();

    const result = products.filter(function (product) {
        const brandOk = brands.length === 0 || brands.includes(product.brand);
        const categoryOk = categories.length === 0 || categories.includes(product.category);
        const textOk = (product.brand + ' ' + product.title).toLowerCase().includes(text);
        return brandOk && categoryOk && textOk && product.price <= priceLimit;
    });

    switch ($('#sortSelect').val()) {
        case 'cheap':
            result.sort(function (a, b) {
                return a.price - b.price;
            });
            break;
        case 'expensive':
            result.sort(function (a, b) {
                return b.price - a.price;
            });
            break;
        case 'rating':
            result.sort(function (a, b) {
                return b.rating - a.rating;
            });
            break;
    }

    return result;
}

function showProducts() {
    const result = getFilteredProducts();

    $('#priceValue').text(formatPrice(Number($('#priceRange').val())));
    $('#productCount').text(result.length + (result.length === 1 ? ' product' : ' products'));
    $('#searchNote').toggle(searchText !== '');
    $('#searchNoteText').text(searchText);

    if (result.length === 0) {
        $('#productGrid').hide().empty();
        $('#noResults').fadeIn(200);
        return;
    }

    $('#noResults').hide();
    $('#productGrid').hide().html(result.map(productCard).join('')).fadeIn(250);
}

function clearFilters() {
    searchText = '';
    $('#filters input[type="checkbox"]').prop('checked', false);
    $('#priceRange').val(maxPrice);
    $('#sortSelect').val('default');
    history.replaceState(null, '', 'products.html');
    $('.nav-link').removeClass('active');
    $('.nav-link[href="products.html"]').addClass('active');
    showProducts();
}

$(document).ready(function () {
    $('#priceRange').attr('min', minPrice).attr('max', maxPrice).val(maxPrice);

    const brand = params.get('brand');
    if (brand) {
        $('input[name="brand"]').filter(function () {
            return $(this).val() === brand;
        }).prop('checked', true);
        $('.nav-link').removeClass('active');
        $('.nav-link[href="products.html?brand=' + encodeURIComponent(brand) + '"]').addClass('active');
    }

    showProducts();

    $('#filters input[type="checkbox"], #sortSelect').on('change', showProducts);

    $('#priceRange').on('input', function () {
        $('#priceValue').text(formatPrice(Number($(this).val())));
    }).on('change', showProducts);

    $('.clear-filters').click(clearFilters);

    $('#filterToggle').click(function () {
        $('#filters').slideToggle(250);
    });
});
