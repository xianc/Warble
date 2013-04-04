// Ready Handler
$(function () {
    // Add event listener to form button:
    $('form#test > input[type=submit]').bind('click',
                               function (event) {
                                 var v = $('form#test > input[name=t1]').val();
                                 $('#' + v).toggleClass('highlight');
                                 event.preventDefault();
                                 event.stopPropagation();
                                 // or return false does both.
                               });

    // Add event listeners to each paragraph:
    $('p').bind('mouseenter', function (event) {
        $(this).addClass('color_blue');
    });

    $('p').bind('mouseout', function (event) {
        $(this).removeClass('color_blue');
    });

    // Effects:
    $('p').bind('click', function (event) {
        var that = this;
        $(that).fadeOut(500, function () {
            setTimeout(function () {
                $(that).fadeIn();
            }, 3000);
        });
    });
});
