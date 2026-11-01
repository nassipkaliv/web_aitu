$(document).ready(function () {
    console.log('jQuery is ready!');


    $('#changeButton').click(function () {
        $('#idText').text('This text was changed by ID');
        $('.classText').html('This text was changed by <b>class</b>');
        $('em').text('This text was changed by tag');

        $('#idText').css('color', 'red');
        $('.classText').css({ color: 'green', 'font-size': '20px' });
        $('em').css('background-color', 'yellow');
    });


    $('#hideButton').click(function () {
        $('#hideText').hide();
    });

    $('#showButton').click(function () {
        $('#hideText').show();
    });

    $('#toggleButton').click(function () {
        $('#hideText').toggle();
    });


    $('#fadeInButton').click(function () {
        $('#fadeImage').fadeIn(800);
    });

    $('#fadeOutButton').click(function () {
        $('#fadeImage').fadeOut(800);
    });

    $('#fadeToggleButton').click(function () {
        $('#fadeImage').fadeToggle(800);
    });


    $('#slideUpButton').click(function () {
        $('#panel').slideUp();
    });

    $('#slideDownButton').click(function () {
        $('#panel').slideDown();
    });

    $('#slideToggleButton').click(function () {
        $('#panel').slideToggle();
    });


    let itemNumber = 3;

    $('#addItemButton').click(function () {
        $('#list').append('<li>Item ' + itemNumber + '</li>');
        itemNumber++;
    });

    $('#addFirstButton').click(function () {
        $('#list').prepend('<li>Item ' + itemNumber + '</li>');
        itemNumber++;
    });

    $('#removeItemButton').click(function () {
        $('#list li').last().remove();
    });


    $('#changeImageButton').click(function () {
        if ($('#photo').attr('src') === 'images/gallery-img1.jpeg') {
            $('#photo').attr('src', 'images/gallery-img3.jpeg');
        } else {
            $('#photo').attr('src', 'images/gallery-img1.jpeg');
        }
    });

    $('#changeLinkButton').click(function () {
        $('#link').attr('href', 'https://www.w3schools.com/jquery/');
        $('#link').text('W3Schools jQuery Tutorial');
    });


    $('#nameInput').on('input', function () {
        $('#nameOutput').text($('#nameInput').val());
    });

    $('#emailInput').on('input', function () {
        $('#emailOutput').text($('#emailInput').val());
    });


    $('#animateButton').click(function () {
        $('#box1').animate({ width: '150px', height: '150px', left: '250px', top: '50px' }, 1000);
    });

    $('#resetButton1').click(function () {
        $('#box1').stop().css({ width: '80px', height: '80px', left: '0px', top: '0px' });
    });


    $('#sequenceButton').click(function () {
        $('#box2')
            .animate({ left: '300px' }, 800)
            .animate({ top: '150px' }, 800)
            .animate({ width: '40px', height: '40px' }, 800)
            .animate({ left: '0px', top: '0px', width: '80px', height: '80px' }, 800);
    });


    $('#combineButton').click(function () {
        $('#box3').animate({ opacity: 0.3, width: '160px', height: '160px', left: '300px', top: '50px' }, 1500);
    });

    $('#resetButton3').click(function () {
        $('#box3').stop().css({ opacity: 1, width: '80px', height: '80px', left: '0px', top: '0px' });
    });


    $('.accordion-header').click(function () {
        const content = $(this).next();
        $('.accordion-content').not(content).slideUp();
        content.slideToggle();
    });
});
