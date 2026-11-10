$(document).ready(function () {
    console.log('jQuery is ready!');

    $('#changeBtn').click(function () {
        $('#idText').text('This text was changed by ID').css('color', 'red');
        $('.classText').html('This text was changed by <b>class</b>').css({ color: 'green', fontSize: '20px' });
        $('em').text('This text was changed by tag').css('background', 'yellow');
    });

    $('#hideBtn').click(function () {
        $('#text').hide();
    });
    $('#showBtn').click(function () {
        $('#text').show();
    });
    $('#toggleBtn').click(function () {
        $('#text').toggle();
    });

    $('#fadeInBtn').click(function () {
        $('#fadeImg').fadeIn(800);
    });
    $('#fadeOutBtn').click(function () {
        $('#fadeImg').fadeOut(800);
    });
    $('#fadeToggleBtn').click(function () {
        $('#fadeImg').fadeToggle(800);
    });

    $('#slideUpBtn').click(function () {
        $('#panel').slideUp();
    });
    $('#slideDownBtn').click(function () {
        $('#panel').slideDown();
    });
    $('#slideToggleBtn').click(function () {
        $('#panel').slideToggle();
    });

    let count = 3;

    $('#addBtn').click(function () {
        $('#list').append('<li>Item ' + count + '</li>');
        count++;
    });
    $('#addTopBtn').click(function () {
        $('#list').prepend('<li>Item ' + count + '</li>');
        count++;
    });
    $('#removeBtn').click(function () {
        $('#list li').last().remove();
    });

    $('#imgBtn').click(function () {
        let src = $('#photo').attr('src');
        if (src == 'images/gallery-img1.jpeg') {
            $('#photo').attr('src', 'images/gallery-img3.jpeg');
        } else {
            $('#photo').attr('src', 'images/gallery-img1.jpeg');
        }
    });
    $('#linkBtn').click(function () {
        $('#link').attr('href', 'https://www.w3schools.com/jquery/').text('W3Schools jQuery Tutorial');
    });

    $('#nameInput').on('input', function () {
        $('#nameOutput').text($(this).val());
    });
    $('#emailInput').on('input', function () {
        $('#emailOutput').text($(this).val());
    });

    $('#animateBtn').click(function () {
        $('#box1').animate({ width: 150, height: 150, left: 250, top: 50 }, 1000);
    });
    $('#reset1').click(function () {
        $('#box1').stop().css({ width: 80, height: 80, left: 0, top: 0 });
    });

    $('#startBtn').click(function () {
        $('#box2').animate({ left: 300 }, 800);
        $('#box2').animate({ top: 150 }, 800);
        $('#box2').animate({ width: 40, height: 40 }, 800);
        $('#box2').animate({ left: 0, top: 0, width: 80, height: 80 }, 800);
    });

    $('#combineBtn').click(function () {
        $('#box3').animate({ opacity: 0.3, width: 160, height: 160, left: 300, top: 50 }, 1500);
    });
    $('#reset3').click(function () {
        $('#box3').stop().css({ opacity: 1, width: 80, height: 80, left: 0, top: 0 });
    });

    $('.accordion-header').click(function () {
        $('.accordion-content').not($(this).next()).slideUp();
        $(this).next().slideToggle();
    });
});
