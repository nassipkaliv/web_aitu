$(document).ready(function () {
    const heroProducts = products.filter(function (product) {
        return product.tag === 'hero';
    });

    heroProducts.forEach(function (product, index) {
        $('#heroSlides').append(`
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <div class="container">
                    <div class="row align-items-center hero-row" data-word="${product.brand}">
                        <div class="col-lg-5 order-2 order-lg-1 hero-text">
                            <p class="hero-brand">${product.brand}</p>
                            <h2 class="hero-title">${product.title}</h2>
                            <p class="hero-description">${product.description}</p>
                            <p class="hero-price">${getPriceHtml(product)}</p>
                            <a class="btn btn-red" href="product.html?id=${product.id}">Shop Now</a>
                        </div>
                        <div class="col-lg-7 order-1 order-lg-2 text-center">
                            <img class="hero-photo" src="${getPhoto(product, 1)}" alt="${product.brand} ${product.title}">
                        </div>
                    </div>
                </div>
            </div>`);

        $('#heroDots').append(`
            <button type="button" data-bs-target="#hero" data-bs-slide-to="${index}"
                class="${index === 0 ? 'active' : ''}" aria-label="Slide ${index + 1}"></button>`);
    });

    new bootstrap.Carousel(document.getElementById('hero'), { interval: 4000, ride: 'carousel' });

    products.filter(function (product) {
        return product.tag === 'featured';
    }).forEach(function (product) {
        $('#featuredRow').append(`
            <a class="featured-item" href="product.html?id=${product.id}">
                <span class="featured-title">${product.title}</span>
                <img src="${getPhoto(product, 1)}" alt="${product.brand} ${product.title}" loading="lazy">
                <span class="product-price">${getPriceHtml(product)}</span>
            </a>`);
    });

    $('.featured-arrow').click(function () {
        const row = $('#featuredRow');
        const step = $('.featured-item').outerWidth(true);
        const direction = $(this).data('direction');

        row.stop().animate({ scrollLeft: row.scrollLeft() + step * direction }, 400);
    });

    products.slice(0, 11).forEach(function (product) {
        $('#topProducts').append(productCard(product));
    });

    $('#topProducts').append(`
        <div class="col">
            <a class="browse-card" href="products.html">
                Browse All <br> Products <i class="bi bi-arrow-right"></i>
            </a>
        </div>`);
});
