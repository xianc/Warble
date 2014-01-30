$(function () {
    var input = $('form > input[type=text]');

    var add = $('form > input[value=Add]');
    add.bind('click', function (e) {
        var v = input.val();
        if (v) {
            list_add(input.val());
            bind_li();
        }
        return false;
    });

    var del = $('form > input[value=Delete]');
    del.bind('click', function (e) {
        var v = input.val();
        if (v)
            list_delete(input.val());
        return false;
    });

    var rot = $('form > input[value=Rotate]');
    rot.bind('click', function (e) {
        list_move_bottom();
        return false;
    });

    function bind_li() {
        var li = $('li');
        li.unbind('click');
        li.bind('click', function (e) {
            var text = $(this).text();
            if (text)
                list_delete(text);
            setTimeout(function () {
                list_add(text);
                bind_li();
            }, 3000);
        });
    }

    bind_li();
});


function list_add(html) {
    var li = '<li>' + html + '</li>';
    $('ul#list').append(li);
}


function list_move_bottom() {
    var last = $('ul#list :last-child');
    $('ul#list').prepend(last);
}


function list_delete(text) {
    var items = $('ul#list > li');
    var x     = [];
    items.each(function (index) {
        var litext = $(this).text();
        if (litext === text) {
            x.push($(this));
        }
    });
    for (var i = 0; i < x.length; i++) {
        x[i].detach();
    }
}