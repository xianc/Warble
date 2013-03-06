// Examples of Manipulation
$(function () {
    var textarea = $('form > textarea[name=update]');

    var add = $('form > input[value=Warble!]');
    add.bind('click', function (e) {
        var v = textarea.val();
        if (v) {
            list_add(textarea.val();
            bind_li();
        }
        return false;
    });

    var del = $('form > input[value=Delete]');
    del.bind('click', function (e) {
        var v = textarea.val();
        if (v)
            list_delete(textarea.value;
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

// Example 2: Add List Elements
function list_add(html) {
    var li = '<li>' + html + '</li>';
    $('ul#list').append(li);
}


// Example 4: Delete Elements from List
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